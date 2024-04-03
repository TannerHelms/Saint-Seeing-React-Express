import { useParams } from "react-router-dom";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

const Header = ({
  title,
  back = false,
  children,
  icon,
  onClick,
  footer,
  href,
}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          {back && (
            <IonButtons className="float-start">
              <IonBackButton defaultHref={href || "/home"}></IonBackButton>
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
      {footer && <IonFooter>{footer}</IonFooter>}
    </IonPage>
  );
};

export default Header;
