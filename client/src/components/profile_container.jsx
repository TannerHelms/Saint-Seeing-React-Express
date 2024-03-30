import React from "react";
import Banner from "./ui/banner";
import UserDetails from "./ui/user_details";
import { Space } from "@mantine/core";
import UserProfile from "./ui/user_profile";
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
