import { IonIcon, useIonRouter } from "@ionic/react";
import React from "react";
import { people } from "ionicons/icons";
import useConversations from "../../api.js/use_conversations";
import { useLocation, useParams } from "react-router";
const UserDetails = ({ user, friends = false }) => {
  const path = useIonRouter().routeInfo.pathname.split("/")[1];
  const { count } = useConversations(user.id);

  if (count.isLoading) return null;

  return (
    <div className="space-y-4">
      <div className="flex-between">
        <p>
          {user.firstName} {user.lastName}
        </p>
        <div className="flex items-center gap-2">
          {friends && (
            <>
              <IonIcon icon={people} size="large" />
              <p>{count.data || "0"}</p>
            </>
          )}
        </div>
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
