import { Box } from "@material-ui/core";
import { Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Fade from "@mui/material/Fade";

const LandingHeader = (props) => {
  return (
    <Fragment>
      <Fade in={props.fade}>
        <Typography
          mt={2}
          color="white"
          align="center"
          variant="h2"
          component="h1"
          gutterBottom
        >
          TourManager
        </Typography>
      </Fade>
    </Fragment>
  );
};

export default LandingHeader;
