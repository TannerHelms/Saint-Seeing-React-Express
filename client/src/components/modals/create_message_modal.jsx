import { Modal } from "@mantine/core";
import useConversations from "../../api/use_conversations";
import useRequests from "../../api/use_requests";
import NewChatTile from "../ui/new_chat_tile";

const CreateMessageModal = ({ opened, close}) => {
  const { requests } = useRequests();

  if (requests.isLoading) return null;
  return (
    <Modal opened={opened} onClose={close}>
      <div className="py-5 w-full">
        {requests.data.accepted.filter((request) => !request.chat).length ==
          0 && <p className="text-center">Add a new friend to start a chat</p>}
        {requests.data.accepted.map((request, idx) => {
          if (!request.chat) {
            return (
              <div className="py-2" key={idx}>
                <NewChatTile friend={request} close={close} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </Modal>
  );
};

export default CreateMessageModal;
