import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import LoginScreen from "../../components/login_container";
import { menuController } from "@ionic/core/components";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    menuController.enable(false, "profile-menu");
    menuController.enable(false, "chat-menu");
  }, []);
 
  return (
    <IonPage>
      <IonContent fullscreen>
        <LoginScreen className="pos-center middle" />
      </IonContent>
    </IonPage>
  );
};

export default Login;
