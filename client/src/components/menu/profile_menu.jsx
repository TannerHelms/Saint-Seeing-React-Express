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

import { exit, navigate, person } from "ionicons/icons";
import MenuTile from "../ui/menu_tile";

const menuContent = [
  {
    title: "Profile",
    path: "/profile",
    icon: <IonIcon icon={person} size="large" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IonIcon icon={person} size="large" />,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <IonIcon icon={exit} size="large" />,
  },
];

const ProfileMenu = () => {
  const navigate = useIonRouter();

  return (
    <>
      <IonMenu menuId="profile-menu" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Profile Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="flex flex-col gap-3">
            {menuContent.map((item, idx) => (
              <MenuTile
                key={idx}
                icon={item.icon}
                text={item.title}
                onClick={() => navigate.push(item.path)}
              />
            ))}
          </div>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content"></IonPage>
    </>
  );
};

export default ProfileMenu;
