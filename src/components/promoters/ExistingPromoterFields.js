import { useState } from "react";
import { useGetPromotersQuery } from "../../features/promoters/promoter-endpoints";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const ExistingPromoterFields = (props) => {
  const {
    data: promoterData,
    error,
    isSuccess,
    isError,
  } = useGetPromotersQuery();

  const [existingPromoter, setExistingPromoter] = useState("");

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setExistingPromoter({
      ...existingPromoter,
      [name]: value,
    });
    props.onChange(existingPromoter);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="existing-promoter">Promoter</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Promoter"
        name="promoter_id"
        value={existingPromoter.id}
        onChange={handleSelectChange}
      >
        {isError && error.message}
        {isSuccess &&
          promoterData &&
          promoterData.map((promoter) => (
            <MenuItem key={promoter.id} value={promoter.id}>
              {" "}
              {promoter.name}{" "}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default ExistingPromoterFields;
