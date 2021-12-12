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
          data.map((promoter, index) => (
            <Grid item key={index} md={3}>
              <PromoterDetails key={promoter.id} promoter={promoter} />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default PromoterList;
