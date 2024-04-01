import RequestTile from "./ui/request_tile";

const RequestsReceivedContainer = ({ requests }) => {
  return (
    <div className="flex flex-col gap-7 p-4 overflow-y-auto max m-auto">
      {requests.received.map((request, idx) => (
        <RequestTile key={idx} request={request} sent={false} />
      ))}
    </div>
  );
};
export default RequestsReceivedContainer;
