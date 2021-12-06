import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { useState } from "react";
import Grid from "@mui/material/Grid";

const NewShowForm = () => {
  const [showFormState, setShowFormState] = useState({});
  const [promoterFormState, setPromoterFormState] = useState({});
  const [timeAndDate, setTimeAndDate] = useState({
    date: new Date(),
    loadin: new Date(),
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    const promoterFieldCheck = id.split("-")[0];
    if (promoterFieldCheck === "promoter") {
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

  const handleCheck = (e) => {
    const { name, checked } = e.target;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...showFormState,
      ...timeAndDate,
      promoter: {
        ...promoterFormState,
      },
    };
    console.log(payload);
  };

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
        <TextField
          id="promoter-name"
          name="promoter-name"
          label="Promoter Name"
          onChange={handleChange}
        />
        <TextField
          id="promoter-email"
          name="promoter-email"
          label="Promoter email"
          onChange={handleChange}
        />

        <Button type="submit">Submit </Button>
      </Grid>
    </form>
  );
};

export default NewShowForm;

//   const { venue, date, loadin, guarantee, merch, green_room, wifi }
