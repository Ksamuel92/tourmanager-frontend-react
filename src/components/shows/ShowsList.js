import { useGetShowsQuery } from "../../features/shows/show-slice";
import ShowDetails from "../shows/ShowDetails";
import { useSelector } from "react-redux";

const ShowsList = () => {
  const { id } = useSelector((store) => store.authReducer.user);
  const { data, error, isLoading, isSuccess, isError } = useGetShowsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
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
