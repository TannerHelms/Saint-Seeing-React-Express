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
        mutationFn: send,
        onMutate: async (data) => {
            await queryClient.cancelQueries(["conversation", conversation.id]);
            const previousData = queryClient.getQueryData(["conversation", conversation.id]);
            queryClient.setQueryData(["conversation", conversation.id], (old) => {
                return {
                    ...old,
                    messages: [
                        ...old.messages,
                        {
                            ...data,
                            senderId: conversation.profile1Id,
                            createdAt: "0 seconds ago",
                        }
                    ]
                }
            })
            return { previousData }
        },
        onError: (err, data, context) => {
            queryClient.setQueryData(["conversation", conversation.id], context.previousData)
        },
        onSettled: (data) => {
            queryClient.invalidateQueries(["conversation", conversation.id]);
        },
        enabled: !!conversation.id
    })

    return { send: sendMutate }

}

export default useMessage;