import EditShowForm from "./EditShowForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const EditShowFormModal = (props) => {
  // debugger;
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Edit Show</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <EditShowForm
          show={props.show}
          open={props.open}
          handleClose={props.handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditShowFormModal;
