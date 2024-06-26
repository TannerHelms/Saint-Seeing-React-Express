import { IonTabButton } from "@ionic/react";
import { Box, LoadingOverlay, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { z } from "zod";
import useSignUp from "../hooks/use_sign_up";
import UserForm from "./form/user_form";
import { useDisclosure } from "@mantine/hooks";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
  firstName: z.string().min(2, "Must be at least 2 characters"),
  lastName: z.string().min(2, "Must be at least 2 characters"),
  bio: z.string().min(2, "Must be at least 2 characters"),
  rules: z.array(z.string().min(2, "Must be at least 2 characters")),
});

const SignUpContainer = (props) => {
  const [visible, { open, close, toggle }] = useDisclosure(false);
  const { signup } = useSignUp();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      city: "",
      bio: "",
      rules: [],
    },
    validate: zodResolver(schema),
  });

  if (signup.isSuccess) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
    open();
    setError(null);
    if (form.values.city === "") {
      setError("Please select a city from the auto complete search");
      return;
    }
    if (!backgroundImage) {
      setError("Please select a background image");
      return;
    }
    if (!profileImage) {
      setError("Please select a profile image");
      return;
    }
    if (form.values.rules.length === 0) {
      setError("Please add at least one house rule");
      return;
    }
    await signup.mutateAsync({ data: e, backgroundImage, profileImage });
  };

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <div {...props}>
          <div className="col w-full pt-4 pb-8">
            <Title>Sign Up</Title>
            <UserForm
              form={form}
              submit={signup}
              error={error}
              setBackgroundImage={setBackgroundImage}
              setProfileImage={setProfileImage}
              handleSubmit={handleSubmit}
              button={"Sign Up"}
              close={close}
            />
            <div className="flex gap-2 items-center">
              <p>Already have an account?</p>
              <IonTabButton className="text-blue-600 text-lg" href="/login">
                Log In
              </IonTabButton>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
export default SignUpContainer;
