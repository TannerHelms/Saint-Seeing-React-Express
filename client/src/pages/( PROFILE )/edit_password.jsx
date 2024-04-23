import { Redirect } from "react-router";
import useUsers from "../../api/use_users";
import PasswordForm from "../../components/form/password_form";
import Header from "../../components/ui/header";

const EditPassword = () => {
  const { me } = useUsers();
  if (me.isLoading) return null;
  if (!me.data) return <Redirect to="/login" />;
  return (
    <Header title="Edit Password" back={true} href={"/profile"}>
      <PasswordForm />
    </Header>
  );
};
export default EditPassword;
