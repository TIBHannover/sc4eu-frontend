import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateDiscussion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newDiscussion) => {
            return Promise.resolve(newDiscussion);
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
            console.log('onSuccess: New discussion created');
            //queryClient.invalidateQueries({ queryKey: ['terms'] });
            return Promise.resolve(queryClient.getQueryData(['discussions']));
        }
    });
}
