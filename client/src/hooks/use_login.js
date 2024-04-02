import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setToken } from "../store/token_slice";
import useInit from "./use_init";


const useLogin = () => {
    const { api, dispatch } = useInit();
    const queryClient = useQueryClient();

    const login = ({ email, password }) => {
        return api.post("/sessions", { email, password })
    };

    const { mutateAsync: loginMutation, error } = useMutation({
        queryKey: ["user"],
        mutationFn: login,
        onSettled: async ({ token }) => {
            await dispatch(setToken({ token }))
            queryClient.invalidateQueries(["me"]);
        },
    });

    return { login: loginMutation, error };
}

export default useLogin;