import { menuController } from "@ionic/core/components";
import { IonButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import ProfileContainer from "../../components/profile_container";
import Header from "../../components/ui/header";
import useLogout from "../../hooks/use_logout";
import useUsers from "../../api/use_users";
import { Redirect } from "react-router";
import useNavbar from "../../hooks/use_navbar";

const Profile = () => {
  useNavbar();
  const { me } = useUsers();
  const { logout } = useLogout();

  if (me.isLoading) return null;

  if (!me.data) return <Redirect to="/login" />;

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
      <Header title="Profile" icon={icon} theme={"secondary"}>
        <div className="color-secondary">
          <div className="max m-auto pt-4">
            <ProfileContainer user={me.data} />
          </div>
        </div>
      </Header>
    </>
  );
};

export default Profile;
