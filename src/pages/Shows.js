import { useGetShowsQuery } from "../features/shows/show-slice";

const Shows = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery();
  return (
    <div>
      This is the shows page
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess &&
        data &&
        data.map((show) => <h2 key={show.id}>{show.venue}</h2>)}
    </div>
  );
};

export default Shows;
