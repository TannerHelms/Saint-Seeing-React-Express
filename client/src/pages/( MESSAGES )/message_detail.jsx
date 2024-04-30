import { Redirect, useParams } from "react-router";
import useConversations from "../../api/use_conversations";
import MessageDetailContainer from "../../components/message_detail_container";
import Header from "../../components/ui/header";
import SendMessage from "../../components/ui/send_message";
import useNavBar from "../../hooks/use_navbar";
import { Loader } from "@mantine/core";
const MessageDetail = () => {
  useNavBar(false);
  const id = useParams().id;
  const { conversation } = useConversations(parseInt(id));

  if (conversation.isLoading) return <p>Loading</p>;

  if (conversation.error) return <Redirect to="/login" />;

  return (
    <Header
      title={`${conversation.data.firstName} ${conversation.data.lastName}`}
      back={true}
      footer={<SendMessage conversation={conversation} />}
      href={"/messages"}
    >
      <MessageDetailContainer conversation={conversation.data} />
    </Header>
  );
};

export default MessageDetail;
