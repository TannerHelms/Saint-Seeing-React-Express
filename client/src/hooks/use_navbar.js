import { useLocation, useParams } from "react-router";
import useUsers from "../api.js/use_users";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { turnOffNavbar, turnOnNavbar } from "../store/navbar_slice";
import { chat, off, profile } from "../store/menu_slice";

const noNavbar = ["users", "requests_sent", "requests_received", "details"];

const useNavbar = () => {
    const { me } = useUsers();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const dispatch = useDispatch();
    useEffect(() => {
        if (me.data) {
            noNavbar.includes(path) ? dispatch(turnOffNavbar()) : dispatch(turnOnNavbar())
        } else {
            dispatch(turnOffNavbar());
        }
    }, [me])

    useEffect(() => {
        if (path === "messages") {
            dispatch(chat())
        } else if (path === "profile") {
            dispatch(profile())
        } else {
            dispatch(off())
        }
    }, [location])
}

export default useNavbar;