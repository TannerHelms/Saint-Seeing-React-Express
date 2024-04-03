import React from "react";
import { Space } from "@mantine/core";
import Banner from "./user/banner";
import UserDetails from "./user/user_details";
import UserProfile from "./user/user_profile";
import { IonButton, IonFab, IonIcon } from "@ionic/react";
import { chatbox, chatbubbleOutline } from "ionicons/icons";
import useRequests from "../api.js/use_requests";
import useUsers from "../api.js/use_users";
import { useParams } from "react-router";
import useConversations from "../api.js/use_conversations";

const UsersTile = ({ user }) => {
  const id = useParams().id;
  const { me } = useUsers();
  const { conversation } = useConversations(parseInt(id));
  const { create, request } = useRequests(parseInt(id));

  console.log(request);

  if (request.isLoading) return null;

  const handleChatRequest = () => {
    create.mutateAsync({ fromId: me.data.id, toId: user.id });
  };

  return (
    <div className="middle">
      <Banner user={user} />
      <div className="text-center mb-2">
        {request.data?.fromId == me.data.id && (
          <p>Your chat request is pending</p>
        )}
      </div>
      <div className="text-center mb-2">
        {conversation.data && <p>You are currently friends!</p>}
      </div>
      <UserDetails user={user} friends={true} />
      <Space h="lg" />
      <UserProfile user={user} />
      {!request.data && !conversation.data && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonButton color={"tertiary"} onClick={handleChatRequest}>
            <IonIcon icon={chatbubbleOutline} size="large" />
          </IonButton>
        </IonFab>
      )}
    </div>
  );
};

export default UsersTile;
