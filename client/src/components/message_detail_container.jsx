const MessageDetailContainer = ({ conversation }) => {
  return (
    <div className="flex flex-col overflow-y-auto">
      {conversation.messages.map((m, idx) => (
        <MessageTile key={idx} m={m} conversation={conversation} />
      ))}
    </div>
  );
};

export default MessageDetailContainer;

const MessageTile = ({ m, conversation }) => {
  const sender = m.senderId != conversation.id;
  const css = sender
    ? "bg-blue-700 text-white rounded-tl-lg"
    : "bg-white rounded-tr-lg";
  return (
    <div
      className={`flex flex-col gap-1 p-3 ${sender && " text-right ml-auto"}`}
    >
      {/* Continer for time */}
      <p className="label">{m.createdAt}</p>
      {/* Container for message */}
      <div className={`w-fit max-w-80 p-3 ${css} rounded-b`}>{m.body}</div>
    </div>
  );
};
