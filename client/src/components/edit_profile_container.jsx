import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { useHistory } from "react-router";
import { z } from "zod";
import useUsers from "../api/use_users";
import UserForm from "./form/user_form";
import { useDisclosure } from "@mantine/hooks";
import { Box, LoadingOverlay, Space } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "Must be at least 2 characters"),
  lastName: z.string().min(2, "Must be at least 2 characters"),
  bio: z.string().min(2, "Must be at least 2 characters"),
  rules: z.array(z.string().min(2, "Must be at least 2 characters")),
});

const EditProfileContainer = () => {
  const queryClient = useQueryClient();
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useHistory();
  const { me, updateSelf } = useUsers();
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    me.data.backgroundImage
  );
  const [profileImage, setProfileImage] = useState(me.data.profileImage);
  const form = useForm({
    initialValues: {
      email: me.data.email,
      firstName: me.data.firstName,
      lastName: me.data.lastName,
      city: me.data.city,
      bio: me.data.bio,
      rules: me.data.rules,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (e) => {
    toggle();
    await updateSelf.mutateAsync({
      id: me.data.id,
      ...e,
      background: backgroundImage,
      profile: profileImage,
    });
    queryClient.invalidateQueries({ queryKey: ["me"] });
    navigate.replace("/profile");
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      {/* ...other content */}
      <Space h="lg" />
      <div className="w-full max m-auto">
        <UserForm
          form={form}
          error={error}
          setBackgroundImage={setBackgroundImage}
          setProfileImage={setProfileImage}
          handleSubmit={handleSubmit}
          button={"Update Profile"}
          backgroundImage={backgroundImage}
          profileImage={profileImage}
        />
      </div>
      <Space h="lg" />
    </Box>
  );
};

export default EditProfileContainer;
