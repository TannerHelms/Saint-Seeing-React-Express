import { IonIcon } from "@ionic/react";
import ConversationTile from "./ui/conversation_tile";
import { createOutline } from "ionicons/icons";
import { useDisclosure } from "@mantine/hooks";
import { Loader, Modal } from "@mantine/core";
import CreateMessageModal from "./modals/create_message_modal";
import useConversations from "../api/use_conversations";
import { Redirect } from "react-router";

const ConversationsTile = () => {
  const { conversations } = useConversations();
  const [opened, { open, close }] = useDisclosure(false);

  if (conversations.isLoading)
    return <Loader size={30} className="absolute left-1/2 top-1/2" />;

  if (!conversations.data) return <Redirect to="/login" />;

  return (
    <>
      <CreateMessageModal opened={opened} close={close} />
      <div className="max justify-center flex flex-col m-auto pt-5">
        <div className="flex items-center justify-between pb-5">
          <p>Below are your chats</p>
          <IonIcon
            icon={createOutline}
            size="large"
            onClick={open}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          {conversations.data.map((conversation, idx) => (
            <ConversationTile key={idx} conversation={conversation} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ConversationsTile;
