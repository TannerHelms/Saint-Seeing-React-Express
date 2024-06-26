import { Loader } from "@mantine/core";
import { Redirect } from "react-router";
import useUsers from "../../api/use_users";
import HomeTile from "../../components/home_container";
import Header from "../../components/ui/header";
import useNavbar from "../../hooks/use_navbar";

const Home = () => {
  useNavbar();

  const { users } = useUsers();

  if (!users.isLoading && !users.data) return <Redirect to="/login" />;

  return (
    <Header title="Home">
      <div className="flex flex-col gap-8 items-center max m-auto pt-4">
        {users.isLoading && (
          <Loader size={30} className="absolute top-1/2 left-1/2" />
        )}
        {users?.data?.map((user) => (
          <HomeTile key={user.id} user={user} />
        ))}
      </div>
    </Header>
  );
};

export default Home;
