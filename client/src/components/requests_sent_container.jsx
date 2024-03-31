import { IonItemDivider } from "@ionic/react";
import { Avatar, Button, Divider } from "@mantine/core";

const RequestsSentContainer = ({ requests }) => {
  console.log(requests);

  return (
    <div className="flex flex-col gap-7 p-4 overflow-y-auto max m-auto">
      {requests.sent.map((request, idx) => (
        <>
          <div key={idx} className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-4">
              <Avatar size="lg" src={request.profileImage} />
              <div className="flex flex-col">
                <p>
                  {request.firstName} {request.lastName}
                </p>
                <p>{request.createdAt.split("T")[0]}</p>
              </div>
            </div>
            <Button color="red">Cancel</Button>
          </div>
          <Divider />
        </>
      ))}
    </div>
  );
};
export default RequestsSentContainer;
