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
} from "@ionic/react";
import { useDispatch } from "react-redux";
import { turnOnNavbar } from "../../store/navbar_slice";

const Header = ({ title, back = false, children, icon, onClick }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="w-full relative p-0 m-0">
          {icon && (
            <IonButtons className="float-start" onClick={onClick}>
              <IonButton>{icon}</IonButton>
            </IonButtons>
          )}
          {back && (
            <IonButtons className="float-start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
          )}
          <IonTitle className="w-fit absolute left-1/2 -translate-x-1/2 inset-y-0">
            {title}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default Header;
