import { Avatar, Button, Divider } from "@mantine/core";
import useRequests from "../../api/use_requests";
const RequestTile = ({ request, sent }) => {
  const { cancel, accept } = useRequests();

  const handleRequest = async () => {
    if (sent === true) cancel.mutateAsync(request.id);
    if (sent === false) {
      accept.mutateAsync(request.fromId);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-4">
          <Avatar size="lg" src={request.profileImage} />
          <div className="flex flex-col">
            <p>
              {request.firstName} {request.lastName}
            </p>
            <p>{request.createdAt}</p>
          </div>
        </div>
        <Button
          className={sent ? "bg-red-500" : "bg-green-500"}
          onClick={handleRequest}
        >
          {sent ? "Cancel" : "Accept"}
        </Button>
      </div>
      <Divider />
    </>
  );
};

export default RequestTile;
