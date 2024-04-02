import { Redirect } from "react-router";
import useRequests from "../../api.js/use_requests";
import RequestsReceivedContainer from "../../components/requests_received_container";
import Header from "../../components/ui/header";

const RequestsReceived = () => {
  const { requests } = useRequests();

  if (requests.isLoading) return null;

  if (!requests.data) return <Redirect to="/login" />;

  return (
    <Header title="Requests Received" back={true}>
      <RequestsReceivedContainer requests={requests.data} />
    </Header>
  );
};

export default RequestsReceived;
