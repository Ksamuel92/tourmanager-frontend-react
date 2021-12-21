import { Typography, Button } from "@material-ui/core";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import ShowFormModal from "./ShowFormModal";
import ConfirmationDialog from "../../layout/ConfirmationDialog";
import Moment from "react-moment";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WeekendIcon from "@mui/icons-material/Weekend";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WifiIcon from "@mui/icons-material/Wifi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import { useState } from "react";
import { useDeleteShowMutation } from "../../features/shows/show-endpoints";

const ShowDetails = (props) => {
  const { venue, date, loadin, guarantee, merch, green_room, wifi, city, id } =
    props.show;
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [checked, setChecked] = useState(false);

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

  const handleClick = () => {
    setChecked((prev) => !prev);
  };
  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
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
      </CardActionArea>
      <CardActionArea onClick={handleClick}>
        <Typography variant="h6" align="center">
          {venue} - {city} - <Moment format="MM/DD/YYYY">{date}</Moment>
        </Typography>
        <br></br>
      </CardActionArea>
      <Collapse in={checked}>
        <CardContent>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <AirportShuttleIcon />
              </ListItemIcon>
              <ListItemText>
                Load In: <Moment format="hh:mm A">{loadin}</Moment>
              </ListItemText>
            </ListItem>
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
                <ListItemText primary="No Green Room">
                  No Green Room!
                </ListItemText>
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
                  <ListItemText>Guarantee: ${guarantee}</ListItemText>
                </ListItem>
              )}
              {merch ? (
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PointOfSaleIcon />
                  </ListItemIcon>
                  <ListItemText> Merch: ${merch}</ListItemText>
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <ListItemIcon>
                    <PointOfSaleIcon />
                  </ListItemIcon>
                  <ListItemText> Merch: ${merch}</ListItemText>
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
      </Collapse>
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
