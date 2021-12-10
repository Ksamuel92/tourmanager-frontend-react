import { Typography, Button } from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import ShowFormModal from "./ShowFormModal";
import ConfirmationDialog from "../../layout/ConfirmationDialog";
import { useState } from "react";
import { useDeleteShowMutation } from "../../features/shows/show-slice";

const ShowDetails = (props) => {
  const { venue, date, loadin, guarantee, merch, green_room, wifi, id } =
    props.show;
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteShow, { isSuccess, isError }] = useDeleteShowMutation();

  const handleDelete = async (e) => {
    const response = deleteShow(id);
    console.log(response);
  };
  const handleDeleteDialog = (e) => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = (e) => {
    setOpenDeleteDialog(false);
  };

  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        width="140"
        image={
          process.env.PUBLIC_URL +
          "/assets/magnus-lunay-B1CWLBWEHHI-unsplash.jpg"
        }
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography variant="h6">
          {venue} - {date} - {loadin}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {green_room
            ? "There is a green room available"
            : "Looks like we're chilling in the van"}
          {wifi ? wifi : "No wifi available"}
          {guarantee ? guarantee : "Check with promoter for guarantee"}
          We made ${merch} in merch.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>
          Edit
        </Button>
        <Button size="small" onClick={handleDeleteDialog}>
          Delete
        </Button>
      </CardActions>
      <ShowFormModal show={props.show} open={open} handleClose={handleClose} />
      <ConfirmationDialog
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        resource="Show"
        action="Delete"
        actionHandler={handleDelete}
      />
    </Card>
  );
};

export default ShowDetails;
