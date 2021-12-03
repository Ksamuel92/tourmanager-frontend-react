import { useGetShowsQuery } from "../features/shows/show-slice";
import ShowDetails from "../components/shows/ShowDetails";
import NewShowForm from "../components/shows/NewShowForm";
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
      <NewShowForm />
    </div>
  );
};

export default Shows;
