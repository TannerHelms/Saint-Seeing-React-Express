import useUsers from "../api.js/use_users";
import Header from "../components/ui/header";
import UsersTile from "../components/users_container";
const Users = ({ match }) => {
  const id = match.params.id;
  const { user } = useUsers(id);

  if (!user?.data?.id) return null;

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
