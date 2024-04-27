import RequestTile from "./ui/request_tile";

const RequestsSentContainer = ({ requests }) => {
  return (
    <div className="flex flex-col gap-7 p-4 overflow-y-auto max m-auto mt-5">
      {requests.sent.map((request, idx) => (
        <RequestTile key={idx} request={request} sent={true} />
      ))}
      {requests.sent && requests.sent.length === 0 && (
        <p className="text-center text-sm ">
          You currently dont have any pending chat requests
        </p>
      )}
    </div>
  );
};
export default RequestsSentContainer;
