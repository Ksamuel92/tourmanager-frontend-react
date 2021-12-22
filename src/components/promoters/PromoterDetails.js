import { useState } from "react";
import PromoterFormModal from "./PromoterFormModal";
import {
  CardHeader,
  CardContent,
  CardActions,
  Card,
  Divider,
} from "@mui/material";
import { Typography, Button } from "@material-ui/core";

const PromoterDetails = (props) => {
  const { name, email, shows } = props.promoter;
  const [open, setOpen] = useState(false);
  // debugger;

  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };

  const promoterShows = shows.map((show, i) => (
    <Typography key={i} variant="body2" color="textPrimary">
      {show.venue} - {show.city}
    </Typography>
  ));
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <CardHeader variant="h5" title={name} subheader={email} />
        <Divider />
        <Typography sx={{ fontSize: 14 }} color="textPrimary" gutterBottom>
          Upcoming Shows With This Promoter
        </Typography>

        {promoterShows}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>
          Edit
        </Button>
      </CardActions>
      <PromoterFormModal
        promoter={props.promoter}
        open={open}
        handleClose={handleClose}
      />
    </Card>
  );
};

export default PromoterDetails;
