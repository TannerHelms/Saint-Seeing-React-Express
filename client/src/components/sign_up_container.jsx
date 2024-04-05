import { IonButton, IonTabButton } from "@ionic/react";
import { PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import useSignUp from "../hooks/use_sign_up";
import { Redirect } from "react-router";
import SignUpBanner from "./user/sign_up_banner";
import { useState } from "react";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
  firstName: z.string().min(2, "Must be at least 2 characters"),
  lastName: z.string().min(2, "Must be at least 2 characters"),
  bio: z.string().min(2, "Must be at least 2 characters"),
});

const SignUpContainer = (props) => {
  const { signup } = useSignUp();
  const [backgroundImage, setBackgroundImage] = useState(null);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      bio: "",
      rules: [],
    },
    validate: zodResolver(schema),
  });

  if (signup.isSuccess) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
    signup.mutateAsync({
      ...e,
      backgroundImage: backgroundImage,
    });
  };
  const handleFile = (file) => {
    setBackgroundImage(file);
  };

  return (
    <div {...props}>
      <div className="col w-full">
        <Title>Sign Up</Title>
        <SignUpBanner file={handleFile} />
        <form onSubmit={form.onSubmit(handleSubmit)} className="col w-full">
          <p className="text-center text-red-600">
            {signup?.error && signup.error?.response?.data?.error}
          </p>
          <TextInput
            className="w-full br"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            className="w-full br"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
          />
          <TextInput
            className="w-full br"
            placeholder="jon"
            required
            {...form.getInputProps("firstName")}
          />
          <TextInput
            className="w-full br"
            placeholder="doe"
            required
            {...form.getInputProps("lastName")}
          />
          <TextInput
            className="w-full br"
            placeholder="Your Bio"
            required
            {...form.getInputProps("bio")}
          />
          <IonButton className="w-full" type="submit">
            Login
          </IonButton>
        </form>
        <div className="flex gap-2 items-center">
          <p>Already have an account?</p>
          <IonTabButton className="text-blue-600 text-lg" href="/login">
            Log In
          </IonTabButton>
        </div>
      </div>
    </div>
  );
};
export default SignUpContainer;
