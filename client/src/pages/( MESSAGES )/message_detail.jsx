import { useParams } from "react-router";

const MessageDetail = () => {
  const id = useParams().id;
  return (
    <div>
      <p>Details for messages {id}</p>
    </div>
  );
};

export default MessageDetail;
