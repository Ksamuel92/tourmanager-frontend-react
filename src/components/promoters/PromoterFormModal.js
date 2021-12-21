import EditPromoterForm from "./EditPromoterForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

const PromoterFormModal = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Edit Promoter</DialogTitle>
      <DialogContent>
        <DialogContentText>Make changes to this promoter.</DialogContentText>
        <EditPromoterForm
          promoter={props.promoter}
          open={props.open}
          handleClose={props.handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PromoterFormModal;
