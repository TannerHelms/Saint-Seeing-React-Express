import { IonIcon, IonMenuToggle } from "@ionic/react";
import { menu } from "ionicons/icons";
import ProfileContainer from "../components/profile_container";
import Header from "../components/ui/header";
import useAuth from "../hooks/use_auth";
import useLogout from "../hooks/use_logout";
import ProfileMenu from "../components/ui/profile_menu";
import { menuController } from "@ionic/core/components";

const Profile = () => {
  const me = useAuth();
  const { logout } = useLogout();

  if (!me?.data) return null;

  const icon = (
    <IonMenuToggle>
      <IonIcon icon={menu} size="large" />
    </IonMenuToggle>
  );

  return (
    <>
      <ProfileMenu />
      <Header
        title="Profile"
        icon={icon}
        onClick={async () => await menuController.open("profile")}
      >
        <div className="col items-center pt-4 color-secondary height-media">
          <div className="overflow-y-auto flex flex-col items-center w-full">
            <ProfileContainer user={me.data} />
          </div>
        </div>
      </Header>
    </>
  );
};

export default Profile;
