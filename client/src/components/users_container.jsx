import React from "react";
import { Space } from "@mantine/core";
import Banner from "./user/banner";
import UserDetails from "./user/user_details";
import UserProfile from "./user/user_profile";
import { IonButton, IonFab, IonIcon } from "@ionic/react";
import { chatbox, chatbubbleOutline } from "ionicons/icons";
import useRequests from "../api/use_requests";
import useUsers from "../api/use_users";
import { useParams } from "react-router";
import useConversations from "../api/use_conversations";

const UsersTile = ({ user }) => {
  const { me } = useUsers();
  const { conversation } = useConversations(parseInt(user.profileId));
  const { create, request } = useRequests(parseInt(user.profileId));
  if (request.isLoading) return null;

  const handleChatRequest = () => {
    create.mutateAsync({ fromId: me.data.profileId, toId: user.profileId });
  };

  return (
    <div className="color-background">
      <div className="color-secondary">
        <Banner user={user} />
        {request.data?.toId == me.data.profileId && !request.data.accepted && (
          <div className="text-center mb-2">
            <p>This user has sent you a chat request!</p>
          </div>
        )}
        {request.data?.fromId == me.data.profileId &&
          !request.data.accepted && (
            <div className="text-center mb-2">
              <p>Your chat request is pending</p>
            </div>
          )}
        {request.data?.accepted && (
          <div className="text-center mb-2">
            <p>You are currently friends!</p>
          </div>
        )}
        <UserDetails user={user} friends={true} />
        <Space h="lg" />
      </div>
      <div className="color-secondary">
        <UserProfile user={user} />
        {!request.data && !conversation.data && (
          <IonFab class="fixed bottom-2 right-2">
            <IonButton color={"tertiary"} onClick={handleChatRequest}>
              <IonIcon icon={chatbubbleOutline} size="large" />
            </IonButton>
          </IonFab>
        )}
      </div>
    </div>
  );
};

export default UsersTile;
