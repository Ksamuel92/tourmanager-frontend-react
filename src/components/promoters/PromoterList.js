import { useGetPromotersQuery } from "../../features/promoters/promoter-slice";
import PromoterDetails from "./PromoterDetails";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const PromoterList = () => {
  const { id } = useSelector((store) => store.authReducer.user);
  const { data, error, isLoading, isSuccess, isError } = useGetPromotersQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const filteredPromoters = data.filter(
    (promoter, index, self) =>
      self.findIndex((p) => p.id === promoter.id) === index
  );

  debugger;

  return (
    <Fragment>
      <Typography variant="h3" color="white" align="center">
        Promoter List
      </Typography>
      <Grid container row="true" spacing={1} mt="15px">
        {isLoading && "Loading..."}
        {isError && error.message}
        {isSuccess &&
          data &&
          filteredPromoters.map((promoter) => (
            <Grid item key={promoter.id} md={3}>
              <PromoterDetails promoter={promoter} />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default PromoterList;
