import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  Container,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import TimePicker from "@mui/lab/TimePicker";

import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useAddShowMutation } from "../../features/shows/show-slice";
import { useGetPromotersQuery } from "../../features/promoters/promoter-slice";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Fragment } from "react";
import { filterArrayDuplicatesById as filterPromoters } from "../../helper/filterArrayDuplicates";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
// import ExistingPromoterFields from "../promoters/ExistingPromoterFields";

const NewShowForm = () => {
  const navigate = useNavigate();
  const [showFormState, setShowFormState] = useState({});
  const [filteredPromoterData, setFilteredPromoterData] = useState([]);
  const [promoterFormState, setPromoterFormState] = useState({});
  const [timeAndDate, setTimeAndDate] = useState({
    date: new Date(),
    loadin: new Date(),
  });
  const [existingPromoter, setExistingPromoter] = useState("");
  const [createNewPromoter, setCreateNewPromoter] = useState(false);
  const user = useSelector((store) => store.authReducer.user);

  const {
    data: promoterData,
    error,
    isSuccess,
    isError,
  } = useGetPromotersQuery();

  useEffect(() => {
    if (isSuccess) {
      const filteredPromoters = filterPromoters(promoterData);
      debugger;
      setFilteredPromoterData(filteredPromoters);
    }
  }, [isSuccess, promoterData]);

  const [
    submitShow,
    { isSuccess: showSubmitted, isError: addShowHasError, error: addShowError },
  ] = useAddShowMutation();

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    const promoterFieldCheck = id.split("-")[0];
    if (name !== "promoter_id" && promoterFieldCheck === "promoter") {
      setPromoterFormState({
        ...promoterFormState,
        [name]: value,
      });
      return;
    }
    if (name)
      setShowFormState({
        ...showFormState,
        [name]: value,
      });
  };

  const handleExistingPromoter = (e) => {
    const { name, value } = e.target;
    setExistingPromoter({
      ...existingPromoter,
      [name]: value,
    });
  };
  const handleCheck = (e) => {
    // debugger;
    const { name, checked } = e.target;
    if (name === "new_promoter") {
      setCreateNewPromoter(checked);
      return;
    }
    setShowFormState({
      ...showFormState,
      [name]: checked,
    });
  };

  //TODO: REFACTOR MOMENTDATE And TIME
  const handleMomentDate = (e) => {
    if (e === null) {
      return;
    }
    setTimeAndDate({
      ...timeAndDate,
      date: e.format("MM/DD/YYYY"),
    });
  };

  const handleMomentTime = (e) => {
    if (e === null) {
      return;
    }
    setTimeAndDate({
      ...timeAndDate,
      loadin: e.toISOString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload;
    if (createNewPromoter) {
      payload = {
        ...showFormState,
        ...timeAndDate,
        user_id: user.id,
        promoter_attributes: {
          ...promoterFormState,
        },
      };
    } else {
      payload = {
        ...showFormState,
        ...timeAndDate,
        ...existingPromoter,
        user_id: user.id,
      };
    }
    submitShow(payload);
    navigate("/shows", { state: showSubmitted });
  };

  return (
    <Fragment>
      {addShowHasError && (
        <Alert severity="error" onClose={() => {}}>
          {" "}
          {"promoter" in addShowError.data.error
            ? "You must provide a promoter or create one"
            : "Something went wrong. Try again."}
        </Alert>
      )}
      <Typography variant="h5" align="center" sx={{ marginTop: "30px" }}>
        Create New Show
      </Typography>
      <form onSubmit={handleSubmit}>
        <Container sx={{ marginTop: "30px" }}>
          <Grid
            spacing={1}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <FormGroup row>
                <TextField
                  id="venue"
                  name="venue"
                  label="Venue"
                  value={showFormState.venue || ""}
                  onChange={handleChange}
                  required
                />{" "}
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  value={showFormState.city || ""}
                  onChange={handleChange}
                  required
                />{" "}
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <FormGroup row>
                <DatePicker
                  name="date"
                  className="date"
                  type="date"
                  label="Date"
                  disableOpenPicker="true"
                  inputFormat="MM/DD/YYYY"
                  value={showFormState.date}
                  onChange={handleMomentDate}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  name="loadin"
                  className="loadin"
                  type="time"
                  label="Load In"
                  disableOpenPicker="true"
                  value={showFormState.loadin}
                  onChange={handleMomentTime}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup row>
                <FormControl>
                  <InputLabel htmlFor="guarantee">Guarantee</InputLabel>
                  <OutlinedInput
                    id="guarantee"
                    name="guarantee"
                    type="number"
                    value={showFormState.guarantee || ""}
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Guarantee"
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="merch">Merch</InputLabel>
                  <OutlinedInput
                    id="merch"
                    value={showFormState.merch || ""}
                    name="merch"
                    type="number"
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Merch"
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <TextField
                  id="wifi_network"
                  name="wifi_network"
                  label="Wifi Network"
                  onChange={handleChange}
                  required
                />
                <TextField
                  id="wifi_password"
                  name="wifi_password"
                  label="Wifi Password"
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Grid>

            <FormControlLabel
              name="green_room"
              checked={showFormState.green_room || false}
              onChange={handleCheck}
              control={<Checkbox />}
              label="Green Room"
              labelPlacement="start"
            />

            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={createNewPromoter}
                      onChange={handleCheck}
                      name="new_promoter"
                    />
                  }
                  label="Create New Promoter?"
                />
              </FormGroup>
            </Grid>
            {!createNewPromoter && (
              <FormControl fullWidth>
                <InputLabel id="existing-promoter">Promoter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Promoter"
                  name="promoter_id"
                  value={existingPromoter.promoter_id || ""}
                  onChange={handleExistingPromoter}
                >
                  {isError && error.message}
                  {isSuccess &&
                    filteredPromoterData &&
                    filteredPromoterData.map((promoter) => (
                      <MenuItem key={promoter.id} value={promoter.id}>
                        {" "}
                        {promoter.name} -{promoter.email}{" "}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            {createNewPromoter && (
              <Grid item xs={12}>
                <FormGroup row>
                  <TextField
                    id="promoter-name"
                    name="name"
                    label="Promoter Name"
                    onChange={handleChange}
                  />
                  <TextField
                    id="promoter-email"
                    name="email"
                    label="Promoter Email"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Grid>
            )}

            <Button type="submit">Submit </Button>
          </Grid>
        </Container>
      </form>
    </Fragment>
  );
};

export default NewShowForm;

//   const { venue, date, loadin, guarantee, merch, green_room, wifi }
