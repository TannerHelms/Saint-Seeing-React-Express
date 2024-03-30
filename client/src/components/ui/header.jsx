import { useParams } from "react-router-dom";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Header = ({ title, back = false, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="w-full relative p-0 m-0">
          {back && (
            <IonButtons class="float-start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
          )}
          <IonTitle class="w-fit absolute left-1/2 -translate-x-1/2 inset-y-0">
            {title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default Header;
