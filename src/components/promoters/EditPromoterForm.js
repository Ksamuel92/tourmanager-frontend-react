import { useState, Fragment } from "react";
import { useEditPromoterMutation } from "../../features/promoters/promoter-endpoints";
import { TextField, Button, Alert, Grid } from "@mui/material";

const EditPromoterForm = (props) => {
  const { name, email, id } = props.promoter;

  const [editPromoterFormState, setEditPromoterFormState] = useState({
    name,
    email,
    id,
  });

  const [
    editPromoter,
    {
      isSuccess: editPromoterSuccess,
      isError: editPromoterHasError,
      error: editPromoterError,
    },
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
    editPromoter(payload);
    props.handleClose();
  };

  return (
    <Fragment>
      {editPromoterSuccess && (
        <Alert severity="success" onClose={() => {}}>
          {" "}
          Promoter successfully edited.{" "}
        </Alert>
      )}
      {editPromoterHasError && (
        <Alert severity="error" onClose={() => {}}>
          {" "}
          {editPromoterError}{" "}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container>
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
