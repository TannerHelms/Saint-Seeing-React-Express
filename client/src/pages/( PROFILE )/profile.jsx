import { menuController } from "@ionic/core/components";
import { IonButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import ProfileContainer from "../../components/profile_container";
import Header from "../../components/ui/header";
import useLogout from "../../hooks/use_logout";
import useUsers from "../../api.js/use_users";

const Profile = () => {
  const { me } = useUsers();
  const { logout } = useLogout();

  if (!me?.data) return null;

  const handleShowMenu = async () => {
    menuController.enable(true, "profile-menu");
    menuController.open("profile-menu");
  };

  const icon = (
    <IonButton onClick={handleShowMenu}>
      <IonIcon icon={menu} size="large" />
    </IonButton>
  );

  return (
    <>
      <Header title="Profile" icon={icon}>
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
