import { Redirect, useParams } from "react-router";
import useUsers from "../../api.js/use_users";
import Header from "../../components/ui/header";
import UsersTile from "../../components/users_container";
const Users = () => {
  const id = useParams().id;
  const { user } = useUsers(parseInt(id));

  if (user.isLoading) return null;

  if (!user.data) return <Redirect to="/login" />;

  return (
    <Header title="User" back={true}>
      <div className="col items-center pt-4 color-secondary height-media">
        <div className="overflow-y-auto flex flex-col items-center w-full">
          <UsersTile user={user.data} />
        </div>
      </div>
    </Header>
  );
};

export default Users;
