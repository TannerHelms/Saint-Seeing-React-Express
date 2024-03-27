import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setToken } from "../store/token_slice";
import useInit from "./use_init";


const useLogin = () => {
    const { api, dispatch } = useInit();
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    const login = ({ email, password }) => {
        return api.post("/sessions", { email, password })
    };

    const { mutateAsync: loginMutation, error } = useMutation({
        queryKey: ["user"],
        mutationFn: login,
        onSuccess: ({ user, token }) => {
            // navigate("/");
            queryClient.setQueryData("user", user);
            dispatch(setToken({ token }))
        },
    });

    return { login: loginMutation, error };
}

export default useLogin;