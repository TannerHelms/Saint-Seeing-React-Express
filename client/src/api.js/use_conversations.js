import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import { flattenObject } from "../utils/flatten";
import timeAgo from "../utils/time_ago";

const useConversations = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();

    const all = async () => {
        const { conversations } = await api.get("/conversations");
        const convos = conversations.map((c) => {
            const flatten = flattenObject(c);
            const date = new Date(c.lastMessageAt)
            return {
                ...flatten,
                lastMessageAt: timeAgo(date),
            };
        });

        convos.forEach(c => {
            const messages = c.messages.map(m => {
                const date = new Date(m.createdAt);
                return {
                    ...m,
                    createdAt: timeAgo(date),
                };
            });
            queryClient.setQueryData(["conversation", c.id], {
                ...c,
                messages,
            });
        });

        return convos;
    };

    const get = async () => {
        const { conversation } = await api.get(`/conversations/${id}`);
        const flatten = flattenObject(conversation);
        const date = new Date(conversation.lastMessageAt);
        return {
            ...flatten,
            lastMessageAt: timeAgo(date),
        };
    }

    const create = ({ profile1Id, profile2Id }) => api.post("/conversations", { profile1Id, profile2Id });

    const count = async () => (await api.get(`/conversations/count/${id}`)).count;

    const createMutation = useMutation({
        queryKey: ["conversations"],
        mutationFn: create,
        onSettled: () => {
            queryClient.invalidateQueries("conversations");
        },
    });

    const conversations = useQuery({
        queryKey: ["conversations"],
        queryFn: all,
    });

    const conversation = useQuery({
        queryKey: ["conversation", id],
        queryFn: get,
        enabled: !!id,
    })

    const countQuery = useQuery({
        queryKey: ["count", id],
        queryFn: count,
        enabled: !!id,
    })

    return { count: countQuery, conversation, conversations, create: createMutation }
}

export default useConversations;