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
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { useAddShowMutation } from "../../features/shows/show-slice";
import { useGetPromotersQuery } from "../../features/promoters/promoter-slice";
// import ExistingPromoterFields from "../promoters/ExistingPromoterFields";

const NewShowForm = () => {
  const [showFormState, setShowFormState] = useState({});
  const [promoterFormState, setPromoterFormState] = useState({});
  const [timeAndDate, setTimeAndDate] = useState({
    date: new Date(),
    loadin: new Date(),
  });
  const [existingPromoter, setExistingPromoter] = useState("");
  const [createNewPromoter, setCreateNewPromoter] = useState(false);

  const {
    data: promoterData,
    error,
    isSuccess,
    isError,
  } = useGetPromotersQuery();
  const [submitShow, { isSuccess: showSubmitted }] = useAddShowMutation();

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
      date: e.toISOString(),
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
    if (createNewPromoter) {
      const payload = {
        ...showFormState,
        ...timeAndDate,
        user_id: 1, //TODO  set to current-user
        promoter_attributes: {
          ...promoterFormState,
        },
      };
      try {
        const response = await submitShow(payload).unwrap();

        console.log(response);

        // navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      const payload = {
        ...showFormState,
        ...timeAndDate,
        ...existingPromoter,
        user_id: 1, //TODO set to current-user
      };
      try {
        const response = await submitShow(payload).unwrap();

        console.log(response);

        // navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  // console.log(promoterData);

  return (
    <form onSubmit={handleSubmit}>
      <Grid spacing={3}>
        <TextField
          id="venue"
          name="venue"
          label="Venue"
          onChange={handleChange}
          required
        />
        <DatePicker
          name="date"
          className="date"
          label="Date"
          value={showFormState.date}
          onChange={handleMomentDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          name="loadin"
          className="loadin"
          label="Load In"
          value={showFormState.loadin}
          onChange={handleMomentTime}
          renderInput={(params) => <TextField {...params} />}
        />
        <FormControl>
          <InputLabel htmlFor="guarantee">Guarantee</InputLabel>
          <OutlinedInput
            id="guarantee"
            name="guarantee"
            value={showFormState.guarantee}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Guarantee"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="merch">Merch</InputLabel>
          <OutlinedInput
            id="merch"
            value={showFormState.merch}
            name="merch"
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Merch"
          />
        </FormControl>
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
        <FormControlLabel
          name="green_room"
          checked={showFormState.green_room || false}
          onChange={handleCheck}
          control={<Checkbox />}
          label="Green Room"
          labelPlacement="start"
        />
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
                promoterData &&
                promoterData.map((promoter) => (
                  <MenuItem key={promoter.id} value={promoter.id}>
                    {" "}
                    {promoter.name}{" "}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        {createNewPromoter && (
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
              label="Promoter email"
              onChange={handleChange}
            />
          </FormGroup>
        )}

        <Button type="submit">Submit </Button>
        {showSubmitted && <p>Show successfully created!</p>}
      </Grid>
    </form>
  );
};

export default NewShowForm;

//   const { venue, date, loadin, guarantee, merch, green_room, wifi }
