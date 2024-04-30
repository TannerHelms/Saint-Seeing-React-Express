import { Button, Divider } from "@mantine/core";
import useUsers from "../../api/use_users";
import useConversations from "../../api/use_conversations";
import useInit from "../../hooks/use_init";
const NewChatTile = ({ friend, close }) => {
  const { me } = useUsers();
  const { create } = useConversations();
  const { navigate } = useInit();
  const handleClick = () => {
    create.mutateAsync({ profile1Id: me.data.id, profile2Id: friend.id });
    close();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <img
            src={friend.profileImage}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <p>
            {friend.firstName} {friend.lastName}
          </p>
        </div>
        <Button className="bg-blue-500 w-fit" onClick={handleClick}>
          Create
        </Button>
      </div>
    </>
  );
};
export default NewChatTile;
