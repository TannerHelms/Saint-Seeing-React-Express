import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { addCircleOutline, send } from "ionicons/icons";
import React from "react";
const SendMessage = () => {
  return (
    <div className="shadow-md pt-4 bg-white p-3 flex flex-row items-center gap-2">
      <IonIcon icon={addCircleOutline} size="large" />
      <IonItem color="white" className="w-full" no-lines>
        <IonInput
          name="Message"
          placeholder="Enter Message"
          class="w-full"
          color="white" // onIonInput={(v) => setNewMessage(v.target.value)}
          // value={newMessage}
        />
        <IonButton slot="end" fill="clear">
          <IonIcon icon={send} color="blue" />
        </IonButton>
      </IonItem>
    </div>
  );
};

export default SendMessage;
