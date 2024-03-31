import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import {
  chatbox,
  chatboxEllipses,
  chatboxEllipsesSharp,
  exit,
  navigate,
  person,
} from "ionicons/icons";
import MenuTile from "./menu_tile";
import { menuController } from "@ionic/core/components";

const menuContent = [
  {
    title: "Messages",
    path: "/messages",
    icon: <IonIcon icon={chatbox} size="large" />,
  },
  {
    title: "Requests",
    path: "/messages",
    icon: <IonIcon icon={chatboxEllipses} size="large" />,
  },
  {
    title: "Sent Requests",
    path: "/requests_sent",
    icon: <IonIcon icon={chatboxEllipsesSharp} size="large" />,
  },
];

const ChatMenu = () => {
  const navigate = useIonRouter();

  return (
    <>
      <IonMenu contentId="main-content" menuId="chats">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Chats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="flex flex-col gap-3">
            {menuContent.map((item, idx) => (
              <MenuTile
                key={idx}
                icon={item.icon}
                text={item.title}
                onClick={() => {
                  menuController.close("chats");
                  navigate.push(item.path);
                }}
              />
            ))}
          </div>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content"></IonPage>
    </>
  );
};

export default ChatMenu;
