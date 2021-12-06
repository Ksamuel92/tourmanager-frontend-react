import ShowsList from "../components/shows/ShowsList";
import { Link, Outlet } from "react-router-dom";
const Shows = () => {
  return (
    <div>
      <ShowsList />
      <Outlet />
      <Link to="new"> Create New Show </Link>
    </div>
  );
};

export default Shows;
