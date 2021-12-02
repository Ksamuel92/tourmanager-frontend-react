import { useGetPromotersQuery } from "../features/promoters/promoter-slice";

const Promoters = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetPromotersQuery();
  return (
    <div>
      This is the Promoters page
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess &&
        data &&
        data.map((promoter) => <h2 key={promoter.id}>{promoter.slug}</h2>)}
    </div>
  );
};

export default Promoters;
