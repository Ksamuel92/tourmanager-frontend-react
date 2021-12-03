import { TextField } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { useState } from "react";

const NewShowForm = () => {
  const [showFormState, setShowFormState] = useState({});

  const handleChange = (e) => {
    const [name, value] = e.target;
    setShowFormState({
      ...showFormState,
      [name]: value,
    });
  };

  return (
    <form>
      <div>
        <TextField id="venue" name="venue" label="Venue" required />
        <DatePicker
          name="date"
          label="Date"
          value={showFormState.date}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </form>
  );
};

export default NewShowForm;

//   const { venue, date, loadin, guarantee, merch, green_room, wifi }
