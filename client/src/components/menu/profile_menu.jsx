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

import {
  chatbox,
  chatboxEllipsesSharp,
  exit,
  lockClosed,
  lockOpen,
  logOut,
  people,
  person,
} from "ionicons/icons";
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
      title: "Edit Password",
      path: "/profile/password",
      icon: <IonIcon icon={lockClosed} size="large" />,
    },
    {
      title: "Friends",
      path: "/profile/friends",
      icon: <IonIcon icon={people} size="large" />,
    },
    {
      title: "Received Requests",
      path: "/requests_received",
      icon: <IonIcon icon={chatbox} size="large" />,
    },
    {
      title: "Outgoing Requests",
      path: "/requests_sent",
      icon: <IonIcon icon={chatboxEllipsesSharp} size="large" />,
    },
    {
      title: "Logout",
      path: "/logout",
      icon: <IonIcon icon={logOut} size="large" />,
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
