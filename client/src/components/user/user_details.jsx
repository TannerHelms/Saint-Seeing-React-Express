import { IonIcon } from "@ionic/react";
import React from "react";
import { people } from "ionicons/icons";
const UserDetails = ({ user, friends = false }) => {
  return (
    <div className="space-y-4">
      <div className="flex-between">
        <p>
          {user.firstName} {user.lastName}
        </p>
        {friends && <IonIcon icon={people} size="large" />}
        {!friends && <p>Location</p>}
      </div>
      <div className="flex-between">
        <p>{user.city}</p>
        <p>{user.host ? "Host" : "Traveler"}</p>
      </div>
    </div>
  );
};

export default UserDetails;
