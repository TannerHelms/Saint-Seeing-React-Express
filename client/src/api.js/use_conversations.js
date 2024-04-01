import { useQuery } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import { flattenObject } from "../utils/flatten";
import timeAgo from "../utils/time_ago";

const useConversations = () => {
    const api = useApi();

    const get = async () => {
        const { conversations } = await api.get("/conversations");
        return conversations.map((c) => {
            const flatten = flattenObject(c);
            const date = new Date(c.lastMessageAt)
            return {
                ...flatten,
                lastMessageAt: timeAgo(date),
            };
        });
    };

    const conversations = useQuery({
        queryKey: ["conversations"],
        queryFn: get,
    });

    return { conversations }
}

export default useConversations;