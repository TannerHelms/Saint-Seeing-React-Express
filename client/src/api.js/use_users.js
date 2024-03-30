import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import axios from "axios";

const baseUrl = "http://10.100.1.41:3001";

const useUsers = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();

    const all = async () => {
        const users = await axios.get(`${baseUrl}/users`).then((res) => res.data);
        users.map((user) => {
            queryClient.setQueryData(["user", user.id], user);
        });
        return users;
    };

    const get = async () => (await axios.get(`${baseUrl}/users/${id}`)).user;

    const users = useQuery({
        queryKey: ["users"],
        queryFn: all,
    });

    const user = useQuery({
        queryKey: ["user", id],
        queryFn: get,
        enabled: !!id,
    });


    return { users, user }
}

export default useUsers