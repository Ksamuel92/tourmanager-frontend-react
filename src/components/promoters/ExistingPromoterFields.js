import { useGetPromotersQuery } from "../../features/promoters/promoter-slice";
import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
const ExistingPromoterFields = () => {
  const {
    data: promoterData,
    error,
    isLoading,
    isError,
  } = useGetPromotersQuery();
  console.log(promoterData);
  console.log(error);
  console.log(isLoading);
  console.log(isError);
  const [existingPromoter, setExistingPromoter] = useState({});
  // debugger;
  // const existingPromoters = promoterData.map((promoter) => (
  //   <MenuItem key={promoter.id} value={promoter.id} />
  // ));
  return (
    <FormControl fullWidth>
      <InputLabel id="existing-promoter">Promoter</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={existingPromoter}
        label="Promoter"
        // onChange={handleChange}
      >
        {/* {existingPromoters} */}
      </Select>
    </FormControl>
  );
};

export default ExistingPromoterFields;
