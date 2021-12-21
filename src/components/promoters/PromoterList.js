import { useGetPromotersQuery } from "../../features/promoters/promoter-endpoints";
import PromoterDetails from "./PromoterDetails";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { filterArrayDuplicatesById as filterPromoters } from "../../helper/filterArrayDuplicates";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const PromoterList = () => {
  const { id } = useSelector((store) => store.authReducer.user);
  const [filteredPromotersData, setFilteredPromotersData] = useState();
  const { data, error, isLoading, isSuccess, isError } = useGetPromotersQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      const filteredPromoters = filterPromoters(data);
      setFilteredPromotersData(filteredPromoters);
    }
  }, [data, isSuccess]);

  return (
    <Fragment>
      <Typography variant="h3" color="white" align="center">
        Promoter List
      </Typography>
      <Grid container row="true" spacing={1} mt="15px">
        {isLoading && "Loading..."}
        {isError && error.message}
        {isSuccess &&
          filteredPromotersData &&
          filteredPromotersData.map((promoter) => (
            <Grid item key={promoter.id} md={3}>
              <PromoterDetails promoter={promoter} />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default PromoterList;
