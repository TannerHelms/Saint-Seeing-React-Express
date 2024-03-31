import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useAuth from "../hooks/use_auth";
import Header from "../components/ui/header";
import { people } from "ionicons/icons";
import useRequests from "../api.js/use_requests";
import RequestsContainer from "../components/requests_container";

const requestsIcon = <IonIcon icon={people} size="large" />;

const Messages = () => {
  const { user } = useAuth();
  const { requests } = useRequests(user?.data?.id);

  if (!requests?.data) return null;

  return (
    <Header title="Messages" back={false} icon={requestsIcon}>
      <RequestsContainer requests={requests.data} />
    </Header>
  );
};

export default Messages;
