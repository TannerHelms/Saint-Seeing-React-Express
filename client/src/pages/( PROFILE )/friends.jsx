import useRequests from "../../api/use_requests";
import FriendTile from "../../components/ui/friend_tile";
import Header from "../../components/ui/header";

const Friends = () => {
  const { requests } = useRequests();
  if (requests.isLoading) return <p>loading</p>;
  if (!requests.data) return <p>There was an error loading your friends</p>;

  return (
    <Header title={"Friends"} back={true}>
      <div className="flex flex-col gap-7 p-4 overflow-y-auto max m-auto mt-6">
        {requests.data.accepted.map((request, idx) => (
          <FriendTile key={idx} friend={request} />
        ))}
        {requests.data.accepted.length === 0 && (
          <p className="text-center text-sm ">
            You currently dont have any friends
          </p>
        )}
      </div>
    </Header>
  );
};

export default Friends;
