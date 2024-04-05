import { useMutation } from "@tanstack/react-query";
import useInit from "./use_init";
import axios from "axios";

const useSignUp = () => {
    const { api, dispatch } = useInit();

    const signup = (data) => {
        const fd = new FormData();
        fd.append('background', data.backgroundImage, data.backgroundImage.name);
        for (const key in data) {
            fd.append(key, data[key]);
        }
        return axios.post("http://localhost:3000/users", fd, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    }

    const signupMutation = useMutation({
        queryKey: ["user"],
        mutationFn: signup,
    });

    return { signup: signupMutation };
}

export default useSignUp;