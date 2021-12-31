import { useState, Fragment } from "react";
import EditShowFormModal from "./EditShowFormModal";
import ConfirmationDialog from "../../layout/ConfirmationDialog";
import { useDeleteShowMutation } from "../../features/shows/show-endpoints";
import Moment from "react-moment";
import { Typography, Button } from "@material-ui/core";
import {
  Alert,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Divider,
  List,
  ListItem,
  Collapse,
  Stack,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  AirportShuttle,
  Weekend,
  SentimentVeryDissatisfied,
  Wifi,
  AttachMoney,
  PointOfSale,
} from "@mui/icons-material";

const ShowDetails = (props) => {
  const { venue, date, loadin, guarantee, merch, green_room, wifi, city, id } =
    props.show;
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [checked, setChecked] = useState(false);

  const [
    deleteShow,
    {
      isSuccess: deleteShowSuccess,
      isError: deleteShowHasError,
      error: deleteShowError,
    },
  ] = useDeleteShowMutation();

  const handleDelete = async (e) => {
    deleteShow(id);
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
  const handleEditClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <Fragment>
      {deleteShowSuccess && (
        <Alert severity="success" onClose={() => {}}>
          {" "}
          Show was successfully deleted.{" "}
        </Alert>
      )}
      {deleteShowHasError && (
        <Alert severity="error" onClose={() => {}}>
          {" "}
          {deleteShowError}{" "}
        </Alert>
      )}
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
            title="Venue with people"
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
                  <AirportShuttle />
                </ListItemIcon>
                <ListItemText>
                  Load In: <Moment format="hh:mm A">{loadin}</Moment>
                </ListItemText>
              </ListItem>
              {green_room ? (
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Weekend />
                  </ListItemIcon>
                  <ListItemText primary="Green Room"></ListItemText>
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <ListItemIcon>
                    <SentimentVeryDissatisfied />
                  </ListItemIcon>
                  <ListItemText primary="No Green Room">
                    No Green Room!
                  </ListItemText>
                </ListItem>
              )}
              {wifi && (
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Wifi />
                  </ListItemIcon>
                  <ListItemText>{wifi}</ListItemText>
                </ListItem>
              )}
              <Stack row="true">
                {guarantee && (
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <AttachMoney />
                    </ListItemIcon>
                    <ListItemText>Guarantee: ${guarantee}</ListItemText>
                  </ListItem>
                )}
                {merch ? (
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <PointOfSale />
                    </ListItemIcon>
                    <ListItemText> Merch: ${merch}</ListItemText>
                  </ListItem>
                ) : (
                  <ListItem disablePadding>
                    <ListItemIcon>
                      <PointOfSale />
                    </ListItemIcon>
                    <ListItemText> Merch: ${merch}</ListItemText>
                  </ListItem>
                )}
              </Stack>
            </List>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleEditClickOpen}>
              Edit
            </Button>
            <Button size="small" onClick={handleDeleteDialog}>
              Delete
            </Button>
          </CardActions>
        </Collapse>
        <EditShowFormModal
          show={props.show}
          open={open}
          handleClose={handleClose}
        />
        <ConfirmationDialog
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          resource="Show"
          action="Delete"
          actionHandler={handleDelete}
        />
      </Card>
    </Fragment>
  );
};

export default ShowDetails;
