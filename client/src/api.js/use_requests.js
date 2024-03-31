import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api"
import { flattenObject } from "../utils/flatten";
import sortRequests from "../utils/sort_requests";

const useRequests = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    const get = async () => {
        const { sent, received } = await api.get("/requests");
        return {
            sent: sent.map((req) => flattenObject(req)),
            received: received.map((req) => flattenObject(req)),
        }
    }

    const requests = useQuery({
        queryKey: ["requests"],
        queryFn: get,
    });

    return { requests };

}

export default useRequests;