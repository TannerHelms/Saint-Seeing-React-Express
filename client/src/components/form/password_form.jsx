import { Button, PasswordInput } from "@mantine/core";
import useUsers from "../../api/use_users";
import { IonButton } from "@ionic/react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import useApi from "../../hooks/use_api";
import { useHistory } from "react-router";

const schema = z.object({
  current: z.string().min(1, "Must be at least 1 character"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const PasswordForm = () => {
  const navigate = useHistory();
  const api = useApi();
  const { me } = useUsers();
  const form = useForm({
    initialValues: {
      password: "",
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async (e) => {
    await api.put("/users/password", e);
    navigate.replace("/profile");
  };

  if (me.isLoading) return null;
  if (me.isError) return <Redirect to="/login" />;
  if (!me.data) return <p>There was an error</p>;

  return (
    <div>
      <form
        className="flex flex-col gap-3 p-3 pt-5"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <PasswordInput
          className="w-full br"
          placeholder="Current Password"
          required
          {...form.getInputProps("current")}
        />
        <PasswordInput
          className="w-full br"
          placeholder="New Password"
          required
          {...form.getInputProps("password")}
        />
        <IonButton type="submit">Update</IonButton>
      </form>
    </div>
  );
};
export default PasswordForm;
