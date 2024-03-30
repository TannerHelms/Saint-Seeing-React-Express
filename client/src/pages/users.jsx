import { useParams } from "react-router-dom";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../components/ui/header";
import useUsers from "../api.js/use_users";
import Banner from "../components/ui/banner";
import { Space, Title } from "@mantine/core";
const Users = ({ match }) => {
  const id = match.params.id;
  const { user } = useUsers(id);

  if (!user.data) null;

  console.log(user.data);

  return (
    <Header title="User" back={true}>
      <div className="col items-center pt-4 color-secondary h-full">
        <div className="middle">
          <Banner user={user.data} />
          {/* USER DETAILS */}
          <div className="space-y-4">
            <div className="flex-between">
              <p>{user.data.name}</p>
              <p>location here</p>
            </div>
            <div className="flex-between">
              <p>{user.data.city}</p>
              <p>{user.data.host ? "Host" : "Traveler"}</p>
            </div>
          </div>
          <Space h="lg" />
          {/* USER PROFILE */}
          <div className="space-y-4 color-background rounded-t-xl p-2">
            <IonTitle class="p-0">Bio</IonTitle>
            <IonText>{user.data.bio}</IonText>
            <IonTitle class="p-0">House Rules</IonTitle>
            {user.data.rules.map((rule, idx) => (
              <div className="flex pl-4">
                {/* <IonTitle class="p-0">{idx + 1}</IonTitle>
                <IonText key={rule}>{rule}</IonText> */}
                <p class="">{idx + 1}</p>
                <p className="pl-4" key={rule}>
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Users;
