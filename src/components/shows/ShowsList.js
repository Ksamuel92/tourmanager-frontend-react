import { useGetShowsQuery } from "../../features/shows/show-slice";
import ShowDetails from "../shows/ShowDetails";

const ShowsList = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery();
  return (
    <div>
      {isLoading && "Loading..."}
      {isError && error.message}
      {isSuccess &&
        data &&
        data.map((show) => <ShowDetails key={show.id} show={show} />)}
    </div>
  );
};

export default ShowsList;
