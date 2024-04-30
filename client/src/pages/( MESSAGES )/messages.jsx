import Header from "../../components/ui/header";

import { Redirect } from "react-router";
import useConversations from "../../api/use_conversations";
import ConversationsTile from "../../components/conversations_container";
import useNavbar from "../../hooks/use_navbar";
import { Loader } from "@mantine/core";

const Messages = () => {
  useNavbar();

  return (
    <>
      <Header title="Messages" back={false}>
        <ConversationsTile />
      </Header>
    </>
  );
};

export default Messages;
