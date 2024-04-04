import { Text } from "@mantine/core";
import React from "react";
import Rules from "./rules";
const UserProfile = ({ user }) => {
  return (
    <div className="space-y-4 color-background rounded-t-xl p-4 pb-8">
      <Text size="lg" fw={"bold"}>
        Bio
      </Text>
      <p>{user.bio}</p>
      <Text size="lg" fw={"bold"}>
        House Rules
      </Text>
      <Rules user={user} className="h-full" />
    </div>
  );
};
export default UserProfile;
