import React from "react";
import Banner from "./ui/banner";
import UserDetails from "./ui/user_details";
import { Space } from "@mantine/core";
import UserProfile from "./ui/user_profile";
const UsersTile = ({ user, friends }) => {
  return (
    <div className="middle">
      <Banner user={user} />
      <UserDetails user={user} friends={true} />
      <Space h="lg" />
      <UserProfile user={user} />
    </div>
  );
};

export default UsersTile;
