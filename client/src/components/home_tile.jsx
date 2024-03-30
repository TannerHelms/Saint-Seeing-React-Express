import { IonAvatar, IonButton, IonImg, useIonRouter } from "@ionic/react";
import { Space } from "@mantine/core";
import Banner from "./ui/banner";

const HomeTile = ({ user }) => {
  const navigate = useIonRouter();

  const handleViewProfile = () => {
    navigate.push(`/users/${user.id}`);
  };

  return (
    <div className="bg-red p-7 color-secondary rounded-lg w-full">
      {/* IMAGES */}
      <Banner user={user} />

      {/* USER DETAILS */}
      <div className="space-y-4">
        <div className="flex-between">
          <p>{user.name}</p>
          <p>location here</p>
        </div>
        <div className="flex-between">
          <p>{user.city}</p>
          <p>{user.host ? "Host" : "Traveler"}</p>
        </div>
        <IonButton expand="full" shape="round" onClick={handleViewProfile}>
          View Profile
        </IonButton>
      </div>
    </div>
  );
};

export default HomeTile;
