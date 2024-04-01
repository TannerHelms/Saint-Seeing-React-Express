import { useEffect } from "react";
import useUsers from "../api.js/use_users";
import { turnOffNavbar, turnOnNavbar } from "../store/navbar_slice";
import useInit from "./use_init";
import { useIonRouter } from "@ionic/react";

const noNavbar = [
    "/requests_sent",
    "/requests_received",
]

const useAuth = () => {
    const { navigate, dispatch } = useInit();
    const { me } = useUsers();
    const router = useIonRouter();
    const path = router.routeInfo.pathname;


    useEffect(() => {
        if (!me.data && !me.isLoading) {
            navigate.replace("/login");
        }
        if (me?.error) navigate.replace("/login");
        if (me?.data?.id) {
            noNavbar.includes(path) ? dispatch(turnOffNavbar()) : dispatch(turnOnNavbar());
        }
    }, [me])

    return me;
}

export default useAuth;
