import { useLocation, useParams } from "react-router";
import useUsers from "../api.js/use_users";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { turnOffNavbar, turnOnNavbar } from "../store/navbar_slice";
import { chat, off, profile } from "../store/menu_slice";

const noNavbar = ["/requests_sent", "/requests_received"];

const useNavbar = () => {
    const { me } = useUsers();
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (me.data) {
            noNavbar.includes(location.pathname) ? dispatch(turnOffNavbar()) : dispatch(turnOnNavbar())
        } else {
            dispatch(turnOffNavbar());
        }
    }, [me])

    useEffect(() => {
        if (location.pathname === "/messages") {
            dispatch(chat())
        } else if (location.pathname === "/profile") {
            dispatch(profile())
        } else {
            dispatch(off())
        }
    }, [location])
}

export default useNavbar;