import useUsers from "../../api.js/use_users";
import HomeTile from "../../components/home_container";
import Header from "../../components/ui/header";
import Spinner from "../../components/ui/spinner";

const Home = () => {
  const { users } = useUsers();

  return (
    <Header title="Home">
      <div className="flex flex-col gap-8 items-center max m-auto pt-4">
        <Spinner state={users.isLoading} />
        {users?.data?.map((user) => (
          <HomeTile key={user.id} user={user} />
        ))}
      </div>
    </Header>
  );
};

export default Home;
