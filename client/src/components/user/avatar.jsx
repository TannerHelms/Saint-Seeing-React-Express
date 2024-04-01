import { IonAvatar } from "@ionic/react";

function Avatar({ src, size = "64px", alt, props }) {
  return (
    <IonAvatar style={{ width: size, height: size }} {...props}>
      <img src={src} alt={alt} style={{ width: size, height: size }} />
    </IonAvatar>
  );
}

export default Avatar;
