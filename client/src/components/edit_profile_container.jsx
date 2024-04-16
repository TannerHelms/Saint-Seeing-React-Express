import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import UserForm from "./form/user_form";
import { useState } from "react";
import useUsers from "../api/use_users";
import SignUpBanner from "./user/sign_up_banner";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
  firstName: z.string().min(2, "Must be at least 2 characters"),
  lastName: z.string().min(2, "Must be at least 2 characters"),
  bio: z.string().min(2, "Must be at least 2 characters"),
  rules: z.array(z.string().min(2, "Must be at least 2 characters")),
});

const EditProfileContainer = () => {
  const { me, updateSelf } = useUsers();
  const [error, setError] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(
    me.data.backgroundImage
  );
  const [profileImage, setProfileImage] = useState(me.data.profileImage);
  const form = useForm({
    initialValues: {
      email: me.data.email,
      password: "",
      firstName: me.data.firstName,
      lastName: me.data.lastName,
      city: me.data.city,
      bio: me.data.bio,
      rules: me.data.rules,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (e) => {
    updateSelf.mutate({
      id: me.data.id,
      ...e,
      background: backgroundImage,
      profile: profileImage,
    });
  };

  return (
    <div className="p-3 w-full">
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
  );
};

export default EditProfileContainer;
