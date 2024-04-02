import { Redirect, Route } from "react-router";
import useUsers from "../../api.js/use_users";
import useNavbar from "../../hooks/use_navbar";

const ProtectedRoute = ({ component: Componet, path }) => {
  useNavbar();
  const { me } = useUsers();

  if (me.isLoading) return null;

  return (
    <Route
      path={path}
      render={() => (me?.data ? <Componet /> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
