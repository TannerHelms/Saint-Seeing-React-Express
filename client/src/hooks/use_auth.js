import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { turnOnNavbar } from "../store/navbar_slice";
import useInit from "./use_init";
import { useSelector } from "react-redux";
import { token as tokenFn } from "../store/token_slice";

const useAuth = () => {
    const { api, navigate, dispatch } = useInit();
    const token = useSelector(tokenFn)

    const getMe = () => api.get("/users/me");

    const query = {
        queryKey: ["user"],
        queryFn: getMe,
        enabled: !!token.value,
    }

    const { data: user, isLoading, error } = useQuery(query);

    useEffect(() => {
        if (error) navigate.replace("/login");
        if (user) dispatch(turnOnNavbar())
    }, [user, error])

    return { user: user?.id ? user : user?.user, isLoading };
}

export default useAuth;
