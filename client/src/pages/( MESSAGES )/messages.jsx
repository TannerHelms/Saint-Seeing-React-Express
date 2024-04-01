import { IonButton, IonIcon, IonMenuToggle } from "@ionic/react";
import { menu } from "ionicons/icons";
import useRequests from "../../api.js/use_requests";
import RequestsContainer from "../../components/requests_sent_container";
import ChatMenu from "../../components/menu/chat_menu";
import Header from "../../components/ui/header";
import useAuth from "../../hooks/use_auth";

import { menuController } from "@ionic/core/components";
import useConversations from "../../api.js/use_conversations";
import ConversationsTile from "../../components/conversations_container";

const Messages = () => {
  useAuth();
  const { conversations } = useConversations();

  if (!conversations?.data) return null;

  const handleShowMenu = () => {
    menuController.open("chat-menu");
  };

  const icon = (
    <IonButton onClick={handleShowMenu}>
      <IonIcon icon={menu} size="large" />
    </IonButton>
  );

  return (
    <>
      <Header title="Messages" back={false} icon={icon}>
        <ConversationsTile conversations={conversations.data} />
      </Header>
    </>
  );
};

export default Messages;
