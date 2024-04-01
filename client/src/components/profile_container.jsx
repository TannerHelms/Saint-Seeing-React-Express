import React from "react";
import { Space } from "@mantine/core";
import UserDetails from "./user/user_details";
import UserProfile from "./user/user_profile";
import Banner from "./user/banner";
const ProfileContainer = ({ user }) => {
  return (
    <div className="middle">
      <Banner user={user} />
      <UserDetails user={user} />
      <Space h="lg" />
      <UserProfile user={user} />
    </div>
  );
};

export default ProfileContainer;
