import { Redirect, Route } from "react-router";
import useUsers from "../../api/use_users";

const LoginRoute = ({ component: Componet, path }) => {
  const { me } = useUsers();
  if (me.isLoading) return null;

  return (
    <Route
      path={path}
      render={() => (me?.data ? <Redirect to="/home" /> : <Componet />)}
    />
  );
};

export default LoginRoute;
