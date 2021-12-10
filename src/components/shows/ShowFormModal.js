import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import EditShowForm from "./EditShowForm";

const ShowFormModal = (props) => {
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

export default ShowFormModal;
