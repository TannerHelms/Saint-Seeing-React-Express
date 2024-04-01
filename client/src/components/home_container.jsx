import { IonButton, useIonRouter } from "@ionic/react";
import Banner from "./user/banner";
import UserDetails from "./user/user_details";

const HomeTile = ({ user }) => {
  const navigate = useIonRouter();

  const handleViewProfile = () => {
    navigate.push(`/users/${user.id}`);
  };

  return (
    <div className="bg-red p-5 color-secondary rounded-lg w-full">
      {/* IMAGES */}
      <Banner user={user} />
      {/* USER DETAILS */}
      <div className="space-y-4">
        <UserDetails user={user} />
        <IonButton expand="full" shape="round" onClick={handleViewProfile}>
          View Profile
        </IonButton>
      </div>
    </div>
  );
};

export default HomeTile;
