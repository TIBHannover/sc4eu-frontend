import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateDiscussion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newDiscussion) => {
            return newDiscussion;
        },
        onMutate: async newDiscussion => {
            queryClient.setQueryData(['discussions'], prevDiscussion => [
                ...(prevDiscussion || []),
                {
                    ...newDiscussion
                }
            ]);
        },
        onSettled: async () => {
            //queryClient.invalidateQueries({ queryKey: ['terms'] });
            return queryClient.getQueryData(['discussions']);
        }
    });
}
