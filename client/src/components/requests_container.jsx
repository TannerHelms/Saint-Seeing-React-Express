const RequestsContainer = ({ requests }) => {
  return (
    <div className="flex flex-col gap-5">
      <p>Sent Requests</p>
      <div>
        {requests.sent.map((request, idx) => (
          <div key={idx}>
            <p>
              {request.firstName} {request.lastName}
            </p>
          </div>
        ))}
      </div>

      <div>
        <p>Received Requests</p>
        {requests.received.map((request, idx) => (
          <div key={idx}>
            <p>
              {request.firstName} {request.lastName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RequestsContainer;
