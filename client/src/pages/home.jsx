import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/use_auth";
import useUsers from "../api.js/use_users";
import HomeTile from "../components/home_tile";
import Spinner from "../components/ui/spinner";
import Header from "../components/ui/header";

const Home = () => {
  useAuth();
  const dispatch = useDispatch();
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
