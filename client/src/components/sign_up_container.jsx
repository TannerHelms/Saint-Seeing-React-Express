import { IonButton, IonIcon, IonTabButton } from "@ionic/react";
import {
  ActionIcon,
  PasswordInput,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import useSignUp from "../hooks/use_sign_up";
import { Redirect } from "react-router";
import SignUpBanner from "./user/sign_up_banner";
import { useEffect, useState } from "react";
import AsyncCity from "./ui/async_city";
import { addCircleOutline, addCircleSharp } from "ionicons/icons";
import { useSetState } from "@mantine/hooks";

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

  const handleAddRule = () => {
    const clone = structuredClone(form.values.rules);
    clone.push("");
    form.setFieldValue("rules", clone);
  };

  const handleChange = (index, v) => {
    const clone = structuredClone(form.values.rules);
    clone[index] = v;
    form.setFieldValue("rules", clone);
  };

  return (
    <div {...props}>
      <div className="col w-full pt-4 pb-8">
        <Title>Sign Up</Title>
        <SignUpBanner
          background={setBackgroundImage}
          profile={setProfileImage}
        />
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={form.onSubmit(handleSubmit)} className="col w-full">
          <p className="text-center text-red-600">
            {signup?.error && signup.error?.response?.data?.error}
          </p>
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
          <TextInput
            className="w-full br"
            placeholder="Your First Name"
            required
            {...form.getInputProps("firstName")}
          />
          <TextInput
            className="w-full br"
            placeholder="Your Last Name"
            required
            {...form.getInputProps("lastName")}
          />
          <AsyncCity form={form} />
          <Textarea
            className="w-full br"
            placeholder="Your Bio"
            required
            rows={3}
            {...form.getInputProps("bio")}
            classNames={{
              input: "text-lg",
            }}
          />
          <div className="flex justify-between w-full">
            <p>House Rules</p>
            <ActionIcon variant="transparent" onClick={handleAddRule}>
              <IonIcon icon={addCircleSharp} size="large" color="primary" />
            </ActionIcon>
          </div>

          {form.values.rules.map((rule, index) => (
            <div key={index} className="w-full">
              <TextInput
                value={rule}
                placeholder="Rule"
                required
                onChange={(val) => handleChange(index, val.target.value)}
              />
            </div>
          ))}
          <IonButton className="w-full" type="submit">
            Sign Up
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
