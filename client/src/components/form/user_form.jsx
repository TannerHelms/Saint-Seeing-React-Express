import { ActionIcon, PasswordInput, TextInput, Textarea } from "@mantine/core";
import AsyncCity from "../ui/async_city";
import { IonButton, IonIcon } from "@ionic/react";
import { addCircleSharp } from "ionicons/icons";
import SignUpBanner from "../user/sign_up_banner";

const UserForm = ({
  form,
  submit,
  error,
  setBackgroundImage,
  setProfileImage,
  handleSubmit,
  button,
  backgroundImage,
  profileImage,
}) => {
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
    <>
      <form onSubmit={form.onSubmit(handleSubmit)} className="col w-full">
        <SignUpBanner
          background={setBackgroundImage}
          profile={setProfileImage}
          backgroundImage={backgroundImage}
          profileImage={profileImage}
        />
        {error && <p className="text-red-600">{error}</p>}
        <p className="text-center text-red-600">
          {submit?.error && submit.error?.response?.data?.error}
        </p>
        <TextInput
          className="w-full br"
          placeholder="Your Email"
          required
          {...form.getInputProps("email")}
        />
        {form.getInputProps("password").value != undefined && (
          <PasswordInput
            className="w-full br"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
            classNames={{
              input: "rounded-lg",
            }}
          />
        )}
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
          {button}
        </IonButton>
      </form>
    </>
  );
};

export default UserForm;
