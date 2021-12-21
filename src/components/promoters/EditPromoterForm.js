import { TextField, Button, Alert } from "@mui/material";
import { useState, Fragment } from "react";
import { useEditPromoterMutation } from "../../features/promoters/promoter-endpoints";
import Grid from "@mui/material/Grid";

const EditPromoterForm = (props) => {
  const { name, email, id } = props.promoter;

  const [editPromoterFormState, setEditPromoterFormState] = useState({
    name,
    email,
    id,
  });

  const [
    editPromoter,
    { isError: editPromoterHasError, error: editPromoterError },
  ] = useEditPromoterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPromoterFormState({
      ...editPromoterFormState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...editPromoterFormState,
    };
    try {
      const response = await editPromoter(payload).unwrap();
      debugger;
      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {editPromoterHasError && (
        <Alert severity="error" onClose={() => {}}>
          {" "}
          {editPromoterError}{" "}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid spacing={4}>
          <TextField
            id="name"
            name="name"
            label="Name"
            onChange={handleChange}
            value={editPromoterFormState.name}
            required
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            value={editPromoterFormState.email || ""}
            onChange={handleChange}
            required
          />
          <Button type="submit">Edit</Button>
        </Grid>
      </form>
    </Fragment>
  );
};

export default EditPromoterForm;
