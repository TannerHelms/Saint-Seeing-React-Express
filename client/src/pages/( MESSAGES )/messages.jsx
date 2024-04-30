import Header from "../../components/ui/header";

import { Redirect } from "react-router";
import useConversations from "../../api/use_conversations";
import ConversationsTile from "../../components/conversations_container";
import useNavbar from "../../hooks/use_navbar";

const Messages = () => {
  useNavbar();
  const { conversations } = useConversations();

  if (conversations.isLoading) return null;

  if (!conversations.data) return <Redirect to="/login" />;

  return (
    <>
      <Header title="Messages" back={false}>
        <ConversationsTile conversations={conversations.data} />
      </Header>
    </>
  );
};

export default Messages;
