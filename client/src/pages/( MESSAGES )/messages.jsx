import { IonButton, IonIcon } from "@ionic/react";
import { menu } from "ionicons/icons";
import Header from "../../components/ui/header";

import { menuController } from "@ionic/core/components";
import useConversations from "../../api.js/use_conversations";
import ConversationsTile from "../../components/conversations_container";
import { Redirect } from "react-router";
import useNavbar from "../../hooks/use_navbar";

const Messages = () => {
  useNavbar();
  const { conversations } = useConversations();

  if (conversations.isLoading) return null;

  if (!conversations.data) return <Redirect to="/login" />;

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
