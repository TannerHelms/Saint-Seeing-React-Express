import ConversationTile from "./ui/conversation_tile";

const ConversationsTile = ({ conversations }) => {
  return (
    <div className="max justify-center flex flex-col m-auto pt-5">
      <p className="pb-5">Below are your chats</p>
      <div className="flex flex-col gap-2">
        {conversations.map((conversation, idx) => (
          <ConversationTile key={idx} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};

export default ConversationsTile;
