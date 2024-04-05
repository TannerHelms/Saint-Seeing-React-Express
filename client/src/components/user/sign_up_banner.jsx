import { IonButton, IonIcon } from "@ionic/react";
import { Space } from "@mantine/core";
import { camera } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
const SignUpBanner = ({ background, profile }) => {
  const backgroundInput = useRef(null);
  const profileInput = useRef(null);
  const [bg, setBg] = useState(null);
  const [pro, setPro] = useState(null);

  const handleBackground = (e) => {
    background(e.target.files[0]);
    setBg(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfile = (e) => {
    profile(e.target.files[0]);
    setPro(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        onChange={handleBackground}
        name="background"
        ref={backgroundInput}
      />
      <input
        className="hidden"
        type="file"
        onChange={handleProfile}
        name="profile"
        ref={profileInput}
      />
      <div className="relative">
        {/* Background Image */}
        <div className="w-full min-w-full rounded-lg overflow-hidden">
          <img
            src={
              bg ||
              "https://craftsnippets.com/articles_images/placeholder/placeholder.jpg"
            }
            alt="profileImage"
            className="w-full h-full aspect-square object-cover"
          />
          <div className="absolute top-3 right-3">
            <div
              className="absolute top-3 right-3 color-secondary rounded-full p-2 cursor-pointer"
              onClick={() => backgroundInput.current.click()}
            >
              <FaCamera size="30px" />
            </div>
          </div>
        </div>
        <Space h={"xl"} />

        {/* Profile Image */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <div
            className="absolute top-3 right-3 color-secondary rounded-full p-2 cursor-pointer"
            onClick={() => profileInput.current.click()}
          >
            <FaCamera size="20px" />
          </div>
          <img
            src={
              pro ||
              "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
            }
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
