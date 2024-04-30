import { Space } from "@mantine/core";
import React from "react";
const Banner = ({ user }) => {
  return (
    <>
      <div className="relative">
        <div className="w-full min-w-full rounded-lg overflow-hidden">
          <img
            src={user.backgroundImage}
            alt="profileImage"
            className="w-full h-full aspect-square object-cover"
            loading="lazy"
          />
        </div>
        <Space h={"xl"} />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
          <img
            src={user.profileImage}
            alt="profileImage"
            className="size-36 sm:size-40 rounded-full object-cover"
            loading="lazy"
            
          />
        </div>
      </div>
      <Space h={"xl"} />
    </>
  );
};

export default Banner;
