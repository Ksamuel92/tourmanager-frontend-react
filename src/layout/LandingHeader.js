import { Box } from "@material-ui/core";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
const LandingHeader = () => {
  return (
    <Fragment>
      <Box
        mt={5}
        sx={{
          height: 150,
        }}
      >
        <Typography variant="h1">TourManager</Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom component="div">
          Lorem ipsum dolor sit amet, consecteturasdfsdfasdfsadfsadfasdf
        </Typography>
      </Box>
    </Fragment>
  );
};

export default LandingHeader;
