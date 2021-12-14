import { useGetShowsQuery } from "../../features/shows/show-slice";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDetails from "../shows/ShowDetails";
import { useSelector } from "react-redux";
import { Link as MUILinkWrapper, Box } from "@material-ui/core";
import { Fragment } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const ShowsList = (props) => {
  const { id, name } = useSelector((store) => store.authReducer.user);

  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  debugger;
  return (
    <div>
      <Fragment>
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h4" align="center">
            {" "}
            Welcome {name}!
          </Typography>
        </Box>
        <Box align="center">
          <MUILinkWrapper
            variant="h6"
            align="center"
            component={ReactRouterLink}
            underline="none"
            color="white"
            to="/shows/new"
          >
            Create New Show
          </MUILinkWrapper>
        </Box>
      </Fragment>
      <Fragment>
        {data && data.length > 0 && (
          <Typography variant="h3" color="white" align="center">
            Show List
          </Typography>
        )}
        <Grid container row="true" spacing={1} mt="15px">
          {isLoading && <Typography align="center">Loading</Typography>}
          {isError && error.message}
          {isSuccess &&
            data &&
            data.map((show) => (
              <Grid item key={show.id} md={2}>
                <ShowDetails show={show} />
              </Grid>
            ))}
        </Grid>
      </Fragment>
    </div>
  );
};

export default ShowsList;
