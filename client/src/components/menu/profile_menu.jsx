import {
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import { exit, person } from "ionicons/icons";
import useLogout from "../../hooks/use_logout";
import MenuTile from "../ui/menu_tile";
import { menuController } from "@ionic/core/components";

const ProfileMenu = () => {
  const navigate = useIonRouter();
  const { logout } = useLogout();
  const menuContent = [
    {
      title: "Edit Profile",
      path: "/profile/edit",
      icon: <IonIcon icon={person} size="large" />,
    },
    {
      title: "Logout",
      path: "/logout",
      icon: <IonIcon icon={exit} size="large" />,
    },
  ];

  return (
    <>
      <IonMenu
        menuId="profile-menu"
        contentId="main-content"
        swipeGesture={false}
      >
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
                onClick={
                  item.path === "/logout"
                    ? logout
                    : () => {
                        menuController.close("profile-menu");
                        navigate.push(item.path);
                      }
                }
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
