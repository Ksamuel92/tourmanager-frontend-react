import { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { default as MUILink } from "@mui/material/Link";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ShowLandingPage = () => {
  const { name } = useSelector((store) => store.authReducer.user);
  return (
    <Fragment>
      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h4" align="center">
          {" "}
          Welcome {name}!
        </Typography>
      </Box>
      <Box align="center">
        <MUILink
          variant="h6"
          align="center"
          component={Link}
          underline="none"
          color="white"
          to="new"
        >
          Create New Show
        </MUILink>
        <br></br>
        <MUILink
          variant="h6"
          align="center"
          component={Link}
          underline="none"
          color="white"
          to="list"
        >
          View Existing Shows
        </MUILink>
      </Box>
    </Fragment>
  );
};

export default ShowLandingPage;
