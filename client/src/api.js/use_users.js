import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import axios from "axios";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";
import { flattenObject } from "../utils/flatten";

const baseUrl = "http://10.100.1.41:3001";

const useUsers = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();
    const token = useSelector(tokenFn)

    // GET ME
    const getMe = async () => {
        const me = (await api.get("/users/me")).user
        return flattenObject(me)
    };

    const me = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: !!token.value,
    })

    // CRUD FUNCATIONALITY
    const all = async () => {
        const users = await axios.get(`${baseUrl}/users`).then((res) => res.data);
        users.map((user) => {
            queryClient.setQueryData(["user", user.id], user);
        });
        return users;
    };

    const get = async () => {
        const user = await axios.get(`${baseUrl}/users/${id}`)
        return flattenObject(user)
    };


    // ALL USERS
    const users = useQuery({
        queryKey: ["users"],
        queryFn: all,
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