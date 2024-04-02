import { useEffect } from "react";

const MessageTile = ({ m, conversation, setLoad }) => {
  useEffect(() => {
    setLoad((prev) => prev - 1);
  }, []);
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
export default MessageTile;
