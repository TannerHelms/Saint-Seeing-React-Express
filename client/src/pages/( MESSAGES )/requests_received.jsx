import useRequests from "../../api.js/use_requests";
import RequestsSentContainer from "../../components/requests_sent_container";
import Header from "../../components/ui/header";
import { turnOffNavbar } from "../../store/navbar_slice";
import useAuth from "../../hooks/use_auth";
import RequestsReceivedContainer from "../../components/requests_received_container";

const RequestsReceived = () => {
  useAuth(false);
  const { requests } = useRequests();

  if (!requests?.data) return null;

  return (
    <Header title="Requests Received" back={true}>
      <RequestsReceivedContainer requests={requests.data} />
    </Header>
  );
};

export default RequestsReceived;
