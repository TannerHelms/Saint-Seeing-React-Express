import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { turnOnNavbar } from "../store/navbar_slice";

const Home = () => {
  const dispatch = useDispatch();
  dispatch(turnOnNavbar());
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
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
