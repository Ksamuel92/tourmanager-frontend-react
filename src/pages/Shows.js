import { useGetShowsQuery } from "../services/api";

const Shows = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery();
  debugger;
  return (
    <div>
      This is the shows page
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess && data && data.map((show) => <h1 key={show.id}>{show}</h1>)}
    </div>
  );
};

export default Shows;
