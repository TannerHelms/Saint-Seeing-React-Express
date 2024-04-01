import React from "react";
import { Space } from "@mantine/core";
import Banner from "./user/banner";
import UserDetails from "./user/user_details";
import UserProfile from "./user/user_profile";

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
