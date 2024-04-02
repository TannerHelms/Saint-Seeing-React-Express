import { Redirect, Route } from "react-router";
import useUsers from "../../api.js/use_users";
import useNavbar from "../../hooks/use_navbar";

const ProtectedRoute = ({ component: Componet, path }) => {
  useNavbar();
  const { me } = useUsers();

  // if (me.isLoading) return null;

  if (me?.data) return <Route path={path} render={() => <Componet />} />;

  if (me.error) return <Redirect to="/login" />;
};

export default ProtectedRoute;
