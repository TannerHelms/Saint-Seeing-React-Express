import { IonIcon, useIonRouter } from "@ionic/react";
import { Avatar, Divider } from "@mantine/core";
import { arrowForward } from "ionicons/icons";
import React from "react";
const ConversationTile = ({ conversation }) => {
  const navigate = useIonRouter();
  return (
    <>
      <div
        className="flex flex-row gap-3 w-full justify-between items-center cursor-pointer"
        onClick={() => navigate.push(`/details/${conversation.id}`)}
      >
        <div className="flex flex-row gap-3 items-center">
          <Avatar size="lg" src={conversation.profileImage} />
          <div className="flex flex-col justify-between">
            <p className="truncate">
              {conversation.firstName} {conversation.lastName}
            </p>
            <p className="label truncate max-w-52">
              {conversation.lastMessage}
            </p>
            <p className="label truncate">{conversation.lastMessageAt}</p>
          </div>
        </div>
        <div>
          <IonIcon icon={arrowForward} size="large" />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ConversationTile;
