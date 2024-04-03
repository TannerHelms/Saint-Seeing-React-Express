import { Avatar, Button, Divider } from "@mantine/core";
import React from "react";
import useRequests from "../../api.js/use_requests";
import useConversations from "../../api.js/use_conversations";
const RequestTile = ({ request, sent }) => {
  const { cancel, accept } = useRequests();
  // const { create } = useConversations();

  const handleRequest = async () => {
    if (sent === true) cancel.mutateAsync(request.id);
    if (sent === false) {
      await accept.mutateAsync(request.id);
      // create.mutateAsync(request.fromId);
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
