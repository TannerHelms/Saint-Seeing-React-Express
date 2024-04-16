import { IonButton, IonIcon, IonTabButton } from "@ionic/react";
import {
  ActionIcon,
  PasswordInput,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { addCircleSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { z } from "zod";
import useSignUp from "../hooks/use_sign_up";
import AsyncCity from "./ui/async_city";
import SignUpBanner from "./user/sign_up_banner";
import UserForm from "./form/user_form";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Must be at least 6 characters"),
  firstName: z.string().min(2, "Must be at least 2 characters"),
  lastName: z.string().min(2, "Must be at least 2 characters"),
  bio: z.string().min(2, "Must be at least 2 characters"),
  rules: z.array(z.string().min(2, "Must be at least 2 characters")),
});

const SignUpContainer = (props) => {
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

  useEffect(() => {
    // console.log(form.values);
  }, [form]);

  if (signup.isSuccess) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = async (e) => {
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
    signup.mutateAsync({ data: e, backgroundImage, profileImage });
  };

  return (
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
        />
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
