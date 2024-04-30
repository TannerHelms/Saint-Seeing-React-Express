import { IonIcon } from "@ionic/react";
import ConversationTile from "./ui/conversation_tile";
import { createOutline } from "ionicons/icons";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import CreateMessageModal from "./modals/create_message_modal";

const ConversationsTile = ({ conversations }) => {
  const [opened, { open, close }] = useDisclosure(false);

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
          {conversations.map((conversation, idx) => (
            <ConversationTile key={idx} conversation={conversation} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ConversationsTile;
