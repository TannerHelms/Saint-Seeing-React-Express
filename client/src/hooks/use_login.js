import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import { setToken } from "../store/token_slice";
import useInit from "./use_init";
import { turnOnNavbar } from "../store/navbar_slice";


const useLogin = () => {
    const { api, dispatch } = useInit();
    const queryClient = useQueryClient();
    const navigate = useHistory();
    const login = ({ email, password }) => {
        return api.post("/sessions", { email, password })
    };

    const { mutateAsync: loginMutation, error } = useMutation({
        queryKey: ["user"],
        mutationFn: login,
        onSuccess: ({ user, token }) => {
            navigate.replace("/home");
            queryClient.setQueryData("user", user);
            dispatch(setToken({ token }))
            dispatch(turnOnNavbar());
        },
    });

    return { login: loginMutation, error };
}

export default useLogin;