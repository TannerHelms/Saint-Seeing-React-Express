import { IonIcon, IonMenuToggle } from "@ionic/react";
import { menu } from "ionicons/icons";
import useRequests from "../api.js/use_requests";
import RequestsContainer from "../components/requests_sent_container";
import ChatMenu from "../components/ui/chat_menu";
import Header from "../components/ui/header";
import useAuth from "../hooks/use_auth";

import { menuController } from "@ionic/core/components";

const Messages = () => {
  const { user } = useAuth();
  const { requests } = useRequests(user?.data?.id);

  if (!requests?.data) return null;

  const icon = (
    <IonMenuToggle>
      <IonIcon icon={menu} size="large" />
    </IonMenuToggle>
  );

  return (
    <>
      <ChatMenu />
      <Header
        title="Messages"
        back={false}
        icon={icon}
        onClick={async () => await menuController.open("chats")}
      ></Header>
    </>
  );
};

export default Messages;
