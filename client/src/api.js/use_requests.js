import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api"
import { flattenObject } from "../utils/flatten";
import sortRequests from "../utils/sort_requests";
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

    return { requests };

}

export default useRequests;