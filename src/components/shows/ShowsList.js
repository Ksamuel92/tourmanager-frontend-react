import { Fragment } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetShowsQuery } from "../../features/shows/show-endpoints";
import ShowDetails from "../shows/ShowDetails";
import { Grid, Typography } from "@mui/material";
import { Link as MUILinkWrapper, Box } from "@material-ui/core";

const ShowsList = () => {
  const { id, name } = useSelector((store) => store.authReducer.user);

  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div>
      <Fragment>
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h4" color="common.white" align="center">
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
            color="secondary"
            to="/shows/new"
          >
            Create New Show
          </MUILinkWrapper>
        </Box>
      </Fragment>
      <Fragment>
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
