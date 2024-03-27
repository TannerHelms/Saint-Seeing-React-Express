import { Input, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Avatar from "./avatar";
import { IonButton } from "@ionic/react";
import classes from "../css/login.module.css";
import useLogin from "../hooks/use_login";

const LoginScreen = (props) => {
  const { login } = useLogin();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div {...props}>
      <div className="flex flex-col gap-4 items-center w-full">
        <Avatar
          src="https://firebasestorage.googleapis.com/v0/b/saint-seeing-5d426.appspot.com/o/saint_seeing_logo.png?alt=media&token=655134ad-bc31-4232-b02b-dfb82019584d"
          alt="logo"
          size="120px"
        />
        <Title>Sign In</Title>
        <Input
          className="w-full"
          label="Email"
          placeholder="Email"
          required
          // {...form.getFieldProps("email")}
        />
        <Input
          className="w-full"
          label="Password"
          placeholder="Password"
          type="password"
          required
          // {...form.getFieldProps("email")}
        />
        <IonButton className="w-full">Login</IonButton>
      </div>
    </div>
  );
};
export default LoginScreen;
