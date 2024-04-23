import React from "react";
import { Space } from "@mantine/core";
import UserDetails from "./user/user_details";
import UserProfile from "./user/user_profile";
import Banner from "./user/banner";
const ProfileContainer = ({ user }) => {
  return (
    <div className="color-background">
      <div className="color-secondary">
        <Banner user={user} />
        <UserDetails user={user} friends={true} />
        <Space h="lg" />
      </div>
      <div className="color-secondary">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default ProfileContainer;
