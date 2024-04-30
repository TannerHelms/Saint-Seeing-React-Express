import { IonIcon } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { people } from "ionicons/icons";
import { useQueryClient } from "@tanstack/react-query";
import useApi from "../../hooks/use_api";
const UserDetails = ({ user, friends = false, count = false }) => {
  const api = useApi();
  const [ct, setCt] = useState(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (count) {
      const data = queryClient.getQueryData(["friends", user.id]);
      if (data) {
        setCt(data);
      } else {
        api.get("/requests/count/" + user.id).then((data) => {
          queryClient.setQueryData(["friends", user.id], data.count);
          setCt(data.count);
        });
      }
    }
  }, []);

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
              {ct && <p>{ct}</p>}
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
