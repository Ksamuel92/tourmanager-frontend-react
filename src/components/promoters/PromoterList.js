import { useGetPromotersQuery } from "../../features/promoters/promoter-slice";
import PromoterDetails from "./PromoterDetails";

const PromoterList = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetPromotersQuery();
  return (
    <div>
      This is the Promoters page
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess &&
        data &&
        data.map((promoter) => (
          <PromoterDetails key={promoter.id} promoter={promoter} />
        ))}
    </div>
  );
};

export default PromoterList;
