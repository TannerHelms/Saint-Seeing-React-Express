import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useLogout from "../hooks/use_logout";
import useAuth from "../hooks/use_auth";

const Profile = () => {
  const { user } = useAuth();
  const { logout } = useLogout();
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
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton onClick={logout}>Sign out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
