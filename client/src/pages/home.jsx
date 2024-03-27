import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/use_auth";
import generateUsers from "../faker/home";

const Home = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const users = generateUsers(10);
  console.log(users);
  // dispatch(turnOnNavbar());
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* content */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
