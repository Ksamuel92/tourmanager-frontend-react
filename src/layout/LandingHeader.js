import { Box } from "@material-ui/core";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
const LandingHeader = () => {
  return (
    <Fragment>
      <Box>
        <Typography variant="h1">TourManager</Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom component="div">
          Lorem ipsum dolor sit amet, consecteturasdfsdfasdfsadfsadfasdf
        </Typography>
      </Box>
    </Fragment>
  );
};

export default LandingHeader;
