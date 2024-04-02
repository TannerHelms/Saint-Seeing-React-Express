import { useParams } from "react-router-dom";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

const Header = ({ title, back = false, children, icon, onClick }) => {
  const navigate = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          {back && (
            <IonButtons className="float-start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
          )}

          {icon && (
            <IonButtons slot="start" onClick={onClick}>
              <IonButton>{icon}</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default Header;
