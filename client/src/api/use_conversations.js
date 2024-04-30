import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import { flattenObject } from "../utils/flatten";
import timeAgo from "../utils/time_ago";
import { token } from "../store/token_slice";
import { useSelector } from "react-redux";
const useConversations = (id) => {
    const api = useApi();
    const tk = useSelector(token);
    const allRequests = async () => {
        let { sent, received, accepted } = await api.get("/requests");

        sent = sent.map((req) => {
            const flatten = flattenObject(req);
            return {
                ...flatten,
                createdAt: timeAgo(new Date(req.createdAt)),
            };
        });

        received = received.map((req) => {
            const flatten = flattenObject(req);
            return {
                ...flatten,
                createdAt: timeAgo(new Date(req.createdAt)),
            };
        });
        accepted = accepted.map((req) => {
            const flatten = flattenObject(req);
            return {
                ...flatten,
                createdAt: timeAgo(new Date(req.createdAt)),
            };
        });

        return {
            sent,
            received,
            accepted,
        }
    }
    const all = async () => {
        const conversations = (await api.get("/conversations")).conversations;
        return conversations.map((convo) => {
            convo.lastMessageAt = timeAgo(new Date(convo.lastMessageAt));
            return flattenObject(convo);
        });
    };

    const get = async () => {
        const { conversation } = await api.get(`/conversations/${id}`);
        conversation.lastMessageAt = timeAgo(new Date(conversation.lastMessageAt));
        conversation.messages.map((message) => {
            message.createdAt = timeAgo(new Date(message.createdAt));
            return message;
        });
        return flattenObject(conversation);
    }

    const create = ({ profile1Id, profile2Id }) => api.post("/conversations", { profile1Id, profile2Id });

    const requests = useQuery({
        queryKey: ["requests"],
        queryFn: allRequests,
    });

    const createMutation = useMutation({
        mutationFn: create,
        onSettled: () => {
            conversations.refetch();
            requests.refetch();
        },
    });

    const conversations = useQuery({
        queryKey: ["conversations"],
        queryFn: all,
        enabled: !!tk.value,
    });

    const conversation = useQuery({
        queryKey: ["conversation", id],
        queryFn: get,
        enabled: !!id,
    })

    return { conversation, conversations, create: createMutation }
}

export default useConversations;