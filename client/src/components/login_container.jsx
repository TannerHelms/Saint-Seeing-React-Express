import { IonButton, IonTabButton } from "@ionic/react";
import { PasswordInput, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import Avatar from "../components/user/avatar";
import useLogin from "../hooks/use_login";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginScreen = (props) => {
  const { login, error } = useLogin();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (e) => {
    login(e);
  };

  return (
    <div {...props}>
      <div className="col w-full">
        <Avatar
          src="https://firebasestorage.googleapis.com/v0/b/saint-seeing-5d426.appspot.com/o/saint_seeing_logo.png?alt=media&token=655134ad-bc31-4232-b02b-dfb82019584d"
          alt="logo"
          size="120px"
        />
        <Title>Sign In</Title>
        <form onSubmit={form.onSubmit(handleSubmit)} className="col w-full">
          <p className="text-center text-red-600">{error && error.message}</p>
          <TextInput
            className="w-full br"
            placeholder="Your Email"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            className="w-full br"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
            classNames={{
              input: "rounded-lg",
            }}
          />
          <IonButton className="w-full" type="submit">
            Login
          </IonButton>
        </form>
        <div className="flex gap-2 items-center">
          <p>Don't have account?</p>
          <IonTabButton className="text-blue-600 text-lg" href="/sign_up">
            Sign Up
          </IonTabButton>
        </div>
      </div>
    </div>
  );
};
export default LoginScreen;
