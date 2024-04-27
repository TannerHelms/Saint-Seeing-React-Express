import { Button, Divider } from "@mantine/core";
const FriendTile = ({ friend }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <img
            src={friend.profileImage}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <p>
              {friend.firstName} {friend.lastName}
            </p>
            <p>{friend.createdAt}</p>
          </div>
        </div>
        <Button className="bg-red-500 w-fit">Remove</Button>
      </div>
      <Divider />
    </>
  );
};
export default FriendTile;
