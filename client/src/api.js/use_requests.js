import { useMutation, useQuery } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import { flattenObject } from "../utils/flatten";
import timeAgo from "../utils/time_ago";

const useRequests = () => {
    const api = useApi();
    const get = async () => {
        let { sent, received } = await api.get("/requests");

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

        return {
            sent,
            received
        }
    }

    const requests = useQuery({
        queryKey: ["requests"],
        queryFn: get,
    });

    const cancel = (id) => api.del(`/requests/${id}`)


    const accept = (id) => api.del(`/requests/accept/${id}`)


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

    return { requests, accept: acceptMutation, cancel: cancelMutation };

}

export default useRequests;