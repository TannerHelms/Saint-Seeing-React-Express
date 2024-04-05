import { IonButton, IonIcon } from "@ionic/react";
import { Space } from "@mantine/core";
import { camera } from "ionicons/icons";
import React, { useRef } from "react";
const SignUpBanner = ({ file }) => {
  const fileInput = useRef(null);
  const handleFile = (e) => {
    file(e.target.files[0]);
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        onChange={handleFile}
        name="profile"
        ref={fileInput}
      />
      <div className="relative">
        {/* Background Image */}
        <div className="w-full min-w-full rounded-lg overflow-hidden">
          <img
            src="https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"
            alt="profileImage"
            className="w-full h-full aspect-square object-cover"
          />
          <div className="absolute top-3 right-3">
            <IonButton
              color={"tertiary"}
              onClick={() => fileInput.current.click()}
            >
              <IonIcon icon={camera} size="large" />
            </IonButton>
          </div>
        </div>
        <Space h={"xl"} />

        {/* Profile Image */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
            alt="profileImage"
            className="size-36 sm:size-40 rounded-full object-cover"
          />
        </div>
      </div>
      <Space h={"xl"} />
    </>
  );
};

export default SignUpBanner;
