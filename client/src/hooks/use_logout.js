import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { turnOffNavbar } from "../store/navbar_slice";
import { clearToken } from "../store/token_slice";
import { useIonRouter } from "@ionic/react";

const useLogout = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const logout = () => {
        dispatch(turnOffNavbar());
        dispatch(clearToken());
        queryClient.removeQueries();
    }
    return { logout }
}

export default useLogout;