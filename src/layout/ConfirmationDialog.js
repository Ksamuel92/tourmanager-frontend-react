import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmationDialog = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        {props.action} {props.resource}{" "}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {props.action.toLowerCase()} this{" "}
          {props.resource.toLowerCase()}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>No</Button>
        <Button onClick={props.actionHandler}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
