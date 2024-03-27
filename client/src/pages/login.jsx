import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import LoginScreen from "../components/login_screen";
import { turnOffNavbar } from "../store/navbar_slice";
import classes from "../css/login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  dispatch(turnOffNavbar());
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoginScreen className={classes.container} />
      </IonContent>
    </IonPage>
  );
};

export default Login;
