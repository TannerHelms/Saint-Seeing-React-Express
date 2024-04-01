import RequestTile from "./ui/request_tile";

const RequestsSentContainer = ({ requests }) => {
  return (
    <div className="flex flex-col gap-7 p-4 overflow-y-auto max m-auto">
      {requests.sent.map((request, idx) => (
        <RequestTile key={idx} request={request} sent={true} />
      ))}
    </div>
  );
};
export default RequestsSentContainer;
