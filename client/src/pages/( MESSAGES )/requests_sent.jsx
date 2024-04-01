import { useDispatch } from "react-redux";
import useRequests from "../../api.js/use_requests";
import RequestsSentContainer from "../../components/requests_sent_container";
import Header from "../../components/ui/header";
import { turnOffNavbar } from "../../store/navbar_slice";
import useAuth from "../../hooks/use_auth";

const RequestsSent = () => {
  useAuth(false);
  const { requests } = useRequests();

  if (!requests?.data) return null;

  return (
    <Header title="Requests Sent" back={true}>
      <RequestsSentContainer requests={requests.data} />
    </Header>
  );
};

export default RequestsSent;
