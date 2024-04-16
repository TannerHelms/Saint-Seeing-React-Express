import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../hooks/use_api";
import { token as tokenFn } from "../store/token_slice";
import { flattenObject } from "../utils/flatten";
import RadarApi from "./radarApi";


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
        if (!self) return null;
        const users = (await api.get('/users')).users;
        return await Promise.all(users.map(async (user) => {
            const flat = flattenObject(user);
            queryClient.setQueryData(["user", user.id], flat);
            return flat;
        }));
    };

    const get = async () => {
        const user = await api.get(`/users/${id}`)
        return flattenObject(user)
    };

    const update = async (data) => {
        console.log(data)
        const fd = new FormData();
        for (const key in data) {
            if (key == "backgroundImage" || key == "profileImage") {
                if (typeof data[key] != "string") {
                    fd.append(key, data[key], data[key].name);
                } else {
                    fd.append(key, data[key]);
                }
            }
            else if (key == "rules") {
                data[key].forEach((rule, index) => {
                    fd.append(key, rule);
                });
            } else if (key == "city") {
                const { addresses: place } = await RadarApi.autoComplete(data[key], {
                    longitude: -111.8338,
                    latitude: 41.73698,
                })
                const latitude = place[0].latitude;
                const longitude = place[0].longitude;
                fd.append("city", data[key]);
                fd.append("latitude", latitude);
                fd.append("longitude", longitude);
            } else {
                fd.append(key, data[key]);
            }
        }
        console.log(fd)
        return await api.put(`/users/${data.id}`, fd)
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

    const updateSelf = useMutation({
        queryKey: ["me"],
        mutationFn: update,
        onMutate: async (data) => {
            await queryClient.cancelQueries(["me"]);
            const previous = queryClient.getQueryData(["me"]);
            queryClient.setQueryData(["me"], (old) => ({
                ...old,
                ...data,
            }));
            return { previous, data };
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["me"], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["me"]);
        },
    });

    return { me, user, users, updateSelf }
}


export default useUsers