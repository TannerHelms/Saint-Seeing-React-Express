import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../hooks/use_api";
import { token as tokenFn } from "../store/token_slice";
import { flattenObject } from "../utils/flatten";

const useUsers = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();
    const token = useSelector(tokenFn)

    // GET ME
    const getMe = async () => {
        if (!token.value) throw new Error("No token")
        const me = (await api.get("/users/me")).user
        return flattenObject(me)
    };

    const me = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    })

    // CRUD FUNCATIONALITY
    const all = async () => {
        const users = (await api.get('/users')).users;
        return users.map((user) => {
            const flat = flattenObject(user);
            queryClient.setQueryData(["user", user.id], flat);
            return flat;
        });
    };

    const get = async () => {
        const user = await api.get(`/users/${id}`)
        return flattenObject(user)
    };


    // ALL USERS
    const users = useQuery({
        queryKey: ["users"],
        queryFn: all,
        enabled: !!token.value,
    });

    // SINGLE USER
    const user = useQuery({
        queryKey: ["user", id],
        queryFn: get,
        enabled: !!id,
    });


    return { me, user, users }
}

export default useUsers