import { useGetShowsQuery } from "../../features/shows/show-slice";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShowDetails from "../shows/ShowDetails";
import { useSelector } from "react-redux";
import { Link } from "@material-ui/core";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const ShowsList = (props) => {
  const { id } = useSelector((store) => store.authReducer.user);

  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <Fragment>
      <Typography variant="h3" color="white" align="center">
        Show List
      </Typography>
      <Grid container row="true" spacing={1} mt="15px">
        {isLoading && "Loading..."}
        {isError && error.message}
        {isSuccess &&
          data &&
          data.map((show, index) => (
            <Grid item key={index} md={3}>
              <ShowDetails key={show.id} show={show} />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default ShowsList;
