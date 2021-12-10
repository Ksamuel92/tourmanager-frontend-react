import { useGetShowsQuery } from "../../features/shows/show-slice";
import Grid from "@mui/material/Grid";
import ShowDetails from "../shows/ShowDetails";
import { useSelector } from "react-redux";
import { Link } from "@material-ui/core";
import { Fragment } from "react";

const ShowsList = () => {
  const { id } = useSelector((store) => store.authReducer.user);
  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <Fragment>
      <Grid container row="true">
        {isLoading && "Loading..."}
        {isError && error.message}
        {isSuccess &&
          data &&
          data.map((show, index) => (
            <Grid item key={index}>
              <ShowDetails key={show.id} show={show} />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default ShowsList;
