import { Typography, Button } from "@material-ui/core";

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import PromoterFormModal from "./PromoterFormModal";

import { useState } from "react";
import Divider from "@mui/material/Divider";

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

  const promoterShows = shows.map((show) => (
    <Typography variant="body2" color="common.black">
      {show.venue} - {show.date.toLocaleString()}
    </Typography>
  ));
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardContent>
        <CardHeader variant="h5" title={name} subheader={email} />
        <Divider />
        <Typography sx={{ fontSize: 14 }} color="common.black" gutterBottom>
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
