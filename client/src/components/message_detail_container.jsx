import { useEffect, useRef, useState } from "react";
import MessageTile from "./ui/message_tile";

const MessageDetailContainer = ({ conversation }) => {
  const divRef = useRef(null);
  const [load, setLoad] = useState(conversation?.messages.length);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [divRef, conversation]);

  useEffect(() => {
    if (load == 0) {
      divRef.current.scrollIntoView();
    }
  }, [load]);

  return (
    <div className="flex flex-col overflow-y-auto">
      {conversation.messages.map((m, idx) => (
        <MessageTile
          key={idx}
          m={m}
          conversation={conversation}
          setLoad={setLoad}
        />
      ))}
      <div ref={divRef}></div>
    </div>
  );
};

export default MessageDetailContainer;
