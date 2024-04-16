import useUsers from "../../api/use_users";
import EditProfileContainer from "../../components/edit_profile_container";
import Header from "../../components/ui/header";
import useNavbar from "../../hooks/use_navbar";

const EditProfile = () => {
  const { me } = useUsers();
  if (me.isLoading) return null;
  if (!me.data) return <Redirect to="/login" />;

  return (
    <Header title="Edit Profile" back={true} href={"/profile"}>
      <EditProfileContainer />
    </Header>
  );
};
export default EditProfile;
