import { IonContent, IonPage } from "@ionic/react";
import { useDispatch } from "react-redux";
import LoginScreen from "../../components/login_container";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoginScreen className="pos-center middle" />
      </IonContent>
    </IonPage>
  );
};

export default Login;
