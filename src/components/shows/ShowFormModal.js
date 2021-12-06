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
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <EditShowForm
          show={props.show}
          open={props.open}
          handleClose={props.handleClose}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowFormModal;
