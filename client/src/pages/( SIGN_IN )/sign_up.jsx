import { menuController } from "@ionic/core/components";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";
import SignUpContainer from "../../components/sign_up_container";

const SignUp = () => {
  useEffect(() => {
    menuController.enable(false, "profile-menu");
    menuController.enable(false, "chat-menu");
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <SignUpContainer className="max m-auto" />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
