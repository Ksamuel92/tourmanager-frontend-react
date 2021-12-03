import { TextField } from "@mui/material";

const NewShowForm = () => {
  return (
    <form>
      <div>
        <TextField id="venue" name="venue" label="Venue" required />
      </div>
    </form>
  );
};

export default NewShowForm;

//   const { venue, date, loadin, guarantee, merch, green_room, wifi }
