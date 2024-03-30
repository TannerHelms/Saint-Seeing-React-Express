import { useEffect } from "react";
import useUsers from "../api.js/use_users";
import { turnOnNavbar } from "../store/navbar_slice";
import useInit from "./use_init";

const useAuth = () => {
    const { navigate, dispatch } = useInit();
    const { me } = useUsers();

    useEffect(() => {
        if (me?.error) navigate.replace("/login");
        if (me?.data?.id) dispatch(turnOnNavbar())
    }, [me])

    return me;
}

export default useAuth;
