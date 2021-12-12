import { Typography, Button } from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import ShowFormModal from "./ShowFormModal";
import ConfirmationDialog from "../../layout/ConfirmationDialog";
import Moment from "react-moment";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WeekendIcon from "@mui/icons-material/Weekend";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WifiIcon from "@mui/icons-material/Wifi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { useState } from "react";
import { useDeleteShowMutation } from "../../features/shows/show-slice";

const ShowDetails = (props) => {
  const { venue, date, loadin, guarantee, merch, green_room, wifi, city, id } =
    props.show;
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteShow, { isSuccess, isError }] = useDeleteShowMutation();
  // debugger;

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
          {venue} - {city}
          <Divider />
          <Moment format="MM/DD/YYYY">{date}</Moment>-{" "}
          <Moment format="hh:mm">{loadin}</Moment>
        </Typography>
        <List>
          {green_room ? (
            <ListItem disablePadding>
              <ListItemIcon>
                <WeekendIcon />
              </ListItemIcon>
              <ListItemText primary="Green Room"></ListItemText>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <ListItemIcon>
                <SentimentVeryDissatisfiedIcon />
              </ListItemIcon>
              <ListItemText primary="Green Room">No Green Room!</ListItemText>
            </ListItem>
          )}
          {wifi && (
            <ListItem disablePadding>
              <ListItemIcon>
                <WifiIcon />
              </ListItemIcon>
              <ListItemText>{wifi}</ListItemText>
            </ListItem>
          )}
          <Stack row>
            {guarantee && (
              <ListItem disablePadding>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText>
                  Guarantee: ${parseFloat(guarantee).toFixed(2)}
                </ListItemText>
              </ListItem>
            )}
            {merch && (
              <ListItem disablePadding>
                <ListItemIcon>
                  <PointOfSaleIcon />
                </ListItemIcon>
                <ListItemText>
                  {" "}
                  Merch: ${parseFloat(merch).toFixed(2)}
                </ListItemText>
              </ListItem>
            )}
          </Stack>
        </List>
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
