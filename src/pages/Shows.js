import { useGetShowsQuery } from "../features/shows/show-slice";
import ShowDetails from "../components/shows/ShowDetails";
const Shows = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery();
  return (
    <div>
      This is the shows page
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess &&
        data &&
        data.map((show) => <ShowDetails key={show.id} show={show} />)}
    </div>
  );
};

export default Shows;
