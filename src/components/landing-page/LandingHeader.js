import { Fragment } from "react";
import { Typography, Fade } from "@mui/material";

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
