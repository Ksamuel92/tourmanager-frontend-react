import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPromotersQuery } from "../../features/promoters/promoter-endpoints";
import PromoterDetails from "./PromoterDetails";
import { filterArrayDuplicatesById as filterPromoters } from "../../helper/filterArrayDuplicates";
import { Grid, Typography } from "@mui/material";

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
        Promoters
      </Typography>
      <Grid
        container
        sx={{ justifyContent: "space-evenly" }}
        row="true"
        spacing={1}
        mt="15px"
      >
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
