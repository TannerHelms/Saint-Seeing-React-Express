import useRequests from "../../api.js/use_requests";
import RequestsSentContainer from "../../components/requests_sent_container";
import Header from "../../components/ui/header";

const RequestsSent = () => {

  const { requests } = useRequests();

  if (!requests?.data) return null;

  return (
    <Header title="Requests Sent" back={true}>
      <RequestsSentContainer requests={requests.data} />
    </Header>
  );
};

export default RequestsSent;
