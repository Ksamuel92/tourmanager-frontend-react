import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useState } from "react";
import { useEditShowMutation } from "../../features/shows/show-slice";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { Fragment } from "react";

const EditShowForm = (props) => {
  const {
    id,
    venue,
    date,
    loadin,
    guarantee,
    merch,
    green_room,
    wifi,
    promoter,
  } = props.show;

  const wifi_network = wifi.split(" ")[1];
  const wifi_password = wifi.split(" ")[3];

  const [editShowFormState, setEditShowFormState] = useState({
    id,
    venue,
    guarantee: parseFloat(guarantee).toFixed(2),
    merch: parseFloat(merch).toFixed(2),
    green_room,
    wifi_network,
    wifi_password,
  });

  const [editPromoterState, setEditPromoterState] = useState({
    name: promoter.name,
    email: promoter.email,
    id: promoter.id,
  });
  const [timeAndDate, setTimeAndDate] = useState({
    date,
    loadin,
  });
  const user = useSelector((store) => store.authReducer.user);

  const [
    editShow,
    {
      isSucces: editShowSuccess,
      isError: editShowHasError,
      error: editShowError,
    },
  ] = useEditShowMutation(); //TODO: Extract object with loading

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setEditShowFormState({
        ...editShowFormState,
        [name]: checked,
      });
      return;
    } else {
      setEditShowFormState({
        ...editShowFormState,
        [name]: value,
      });
    }
  };

  const handlePromoterChange = (e) => {
    const { name, value } = e.target;
    setEditPromoterState({
      ...editPromoterState,
      [name]: value,
    });
  };

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
    const showPayload = {
      ...editShowFormState,
      ...timeAndDate,
      promoter: { ...editPromoterState },
      user_id: user.id,
    };
    editShow(showPayload);
    props.handleClose();
  };
  console.log(editShowError);
  console.log(editPromoterState);
  return (
    <Fragment>
      {editShowHasError && <Alert severity="error"></Alert>}
      <form onSubmit={handleSubmit}>
        <Grid spacing={3}>
          <TextField
            id="venue"
            name="venue"
            label="Venue"
            onChange={handleChange}
            value={editShowFormState.venue}
            required
          />
          <DatePicker
            name="date"
            className="date"
            label="Date"
            value={editShowFormState.date}
            onChange={handleMomentDate}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            name="loadin"
            className="loadin"
            label="Load In"
            value={editShowFormState.loadin}
            onChange={handleMomentTime}
            renderInput={(params) => <TextField {...params} />}
          />
          <FormControl>
            <InputLabel htmlFor="guarantee">Guarantee</InputLabel>
            <OutlinedInput
              id="guarantee"
              name="guarantee"
              value={editShowFormState.guarantee || ""}
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
              value={editShowFormState.merch || ""}
              name="merch"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Merch"
            />
          </FormControl>
          <TextField
            id="wifi_network"
            name="wifi_network"
            label="Wifi Network"
            value={editShowFormState.wifi_network || ""}
            onChange={handleChange}
            required
          />
          <TextField
            id="wifi_password"
            name="wifi_password"
            label="Wifi Password"
            value={editShowFormState.wifi_password || ""}
            onChange={handleChange}
            required
          />
          <FormControlLabel
            name="green_room"
            checked={editShowFormState.green_room || false}
            onChange={handleChange}
            control={<Checkbox />}
            label="Green Room"
            labelPlacement="start"
          />
          <FormGroup></FormGroup>
          <FormGroup row>
            <TextField
              id="promoter-name"
              name="name"
              label="Promoter Name"
              onChange={handlePromoterChange}
              value={editPromoterState.name}
            />
            <TextField
              id="promoter-email"
              name="email"
              label="Promoter Email"
              onChange={handlePromoterChange}
              value={editPromoterState.email}
            />
          </FormGroup>

          <Button type="submit">Edit Show </Button>
        </Grid>
      </form>
    </Fragment>
  );
};

export default EditShowForm;
