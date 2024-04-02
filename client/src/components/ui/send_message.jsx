import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { addCircleOutline, send } from "ionicons/icons";
import React, { useState } from "react";
import useMessage from "../../api.js/use_messages";
const SendMessage = ({ conversation }) => {
  const { send } = useMessage(conversation.data);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    send.mutateAsync(message);
  };

  return (
    <div className="shadow-md pt-4 bg-white p-3 flex flex-row items-center gap-2">
      <IonIcon icon={addCircleOutline} size="large" />
      <IonItem color="white" className="w-full" no-lines>
        <IonInput
          name="Message"
          placeholder="Enter Message"
          class="w-full"
          color="white"
          onIonInput={(v) => setMessage(v.target.value)}
          value={message}
        />
        <IonButton slot="end" fill="clear" onClick={handleSendMessage}>
          <IonIcon icon={send} color="blue" />
        </IonButton>
      </IonItem>
    </div>
  );
};

export default SendMessage;
