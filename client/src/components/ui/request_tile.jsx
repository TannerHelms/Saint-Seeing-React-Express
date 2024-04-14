import { Avatar, Button, Divider } from "@mantine/core";
import React from "react";
import useRequests from "../../api/use_requests";
import useConversations from "../../api/use_conversations";
import useUsers from "../../api/use_users";
const RequestTile = ({ request, sent }) => {
  const { me } = useUsers();
  const { cancel, accept } = useRequests();
  const { create } = useConversations();

  const handleRequest = async () => {
    if (sent === true) cancel.mutateAsync(request.id);
    if (sent === false) {
      await accept.mutateAsync(request.id);
      create.mutateAsync({
        profile1Id: me.data.id,
        profile2Id: request.fromId,
      });
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
