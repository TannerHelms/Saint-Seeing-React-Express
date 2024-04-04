import { useMutation } from "@tanstack/react-query";
import useInit from "./use_init";

const useSignUp = () => {
    const { api, dispatch } = useInit();

    const signup = (data) => {
        return api.post("/users", { ...data })
    }

    const signupMutation = useMutation({
        queryKey: ["user"],
        mutationFn: signup,
    });

    return { signup: signupMutation };
}

export default useSignUp;