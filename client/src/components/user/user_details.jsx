import { IonIcon } from "@ionic/react";
import React, { useEffect } from "react";
import { people } from "ionicons/icons";
import useConversations from "../../api/use_conversations";
import { useLocation, useParams } from "react-router";
import useRequests from "../../api/use_requests";
import { useQueryClient } from "@tanstack/react-query";
const UserDetails = ({ user, friends = false }) => {
  const queryClient = useQueryClient();
  const { count } = useRequests(parseInt(user.profileId));

  useEffect(() => {
    queryClient.invalidateQueries("count", user.profileId);
  }, []);

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
        {!friends && <p>{user.distance} mi</p>}
      </div>
      <div className="flex-between">
        <p>{user.city}</p>
        <p>{user.host ? "Host" : "Traveler"}</p>
      </div>
    </div>
  );
};

export default UserDetails;
