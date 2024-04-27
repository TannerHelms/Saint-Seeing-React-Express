import { useMutation, useQuery } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import { flattenObject } from "../utils/flatten";
import timeAgo from "../utils/time_ago";

const useRequests = (id) => {
    const api = useApi();
    const all = async () => {
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

    const requests = useQuery({
        queryKey: ["requests"],
        queryFn: all,
    });

    const cancel = (id) => api.del(`/requests/${id}`)


    const accept = (id) => api.put(`/requests/accept/${id}`)

    const create = ({ fromId, toId }) => api.post("/requests", { fromId, toId })

    const get = async () => (await api.get(`/requests/${id}`)).request

    const request = useQuery({
        queryKey: ["request", id],
        queryFn: get,
        enabled: !!id
    })


    const cancelMutation = useMutation({
        queryKey: ["requests"],
        mutationFn: cancel,
        onSettled: () => {
            requests.refetch()
        }
    })

    const acceptMutation = useMutation({
        queryKey: ["requests"],
        mutationFn: accept,
        onSettled: () => {
            requests.refetch()
        }
    })

    const createMutation = useMutation({
        queryKey: ["requests"],
        mutationFn: create,
        onSettled: () => {
            requests.refetch()
            request.refetch()
        }

    })

    return { requests, accept: acceptMutation, cancel: cancelMutation, create: createMutation, request };

}

export default useRequests;