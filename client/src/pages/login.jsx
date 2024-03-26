import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

const Login = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login Screen</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p className="text-center text-red-600 text-2xl ">this is a test</p>
        <ExploreContainer name="Login Screen" />
      </IonContent>
    </IonPage>
  );
};

export default Login;
