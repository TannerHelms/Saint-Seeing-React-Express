import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { turnOffNavbar } from "../store/navbar_slice";
import { clearToken } from "../store/token_slice";
import { useIonRouter } from "@ionic/react";
import { useHistory } from "react-router";

const useLogout = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const history = useHistory();
    const logout = () => {
        dispatch(turnOffNavbar());
        dispatch(clearToken());
        queryClient.removeQueries();
        history.replace("/login");
    }
    return { logout }
}

export default useLogout;