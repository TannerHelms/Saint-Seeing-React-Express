import { Redirect, useParams } from "react-router";
import useUsers from "../../api/use_users";
import Header from "../../components/ui/header";
import UsersTile from "../../components/users_container";
const Users = () => {
  const id = useParams().id;
  const { user } = useUsers(parseInt(id));

  if (user.isLoading) return null;

  if (!user.data) return <Redirect to="/login" />;

  return (
    <Header title="User" back={true} href={"/home"} theme={"secondary"}>
      <div className="color-secondary">
        <div className="max m-auto pt-4">
          <UsersTile user={user.data} />
        </div>
      </div>
    </Header>
  );
};

export default Users;
