import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";

const useMessage = (conversation) => {
    const api = useApi();
    const queryClient = useQueryClient();
    const send = async (body) => {
        return api.post('/messages', {
            body,
            receiverId: conversation.id,
            profile1Id: conversation.profile1Id,
            profile2Id: conversation.profile2Id
        })
    }
    const sendMutate = useMutation({
        querykey: ["conversation", conversation.id],
        mutationFn: send,
        onSettled: (data) => {
            queryClient.invalidateQueries(["conversation", conversation.id]);
        },
        enabled: !!conversation.id
    })

    return { send: sendMutate }

}

export default useMessage;