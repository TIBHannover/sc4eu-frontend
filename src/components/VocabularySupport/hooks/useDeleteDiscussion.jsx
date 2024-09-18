import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteDiscussion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (resourceId) => {
            // Replace with actual delete logic, e.g., API call
            return Promise.resolve(resourceId);
        },
        onMutate: async (resourceId) => {
            await queryClient.setQueryData(['discussions'], (prevDiscussions) =>
                prevDiscussions?.filter(discussion => discussion.resourceId !== resourceId)
            );
        },
        onSettled: () => {
            return Promise.resolve(queryClient.getQueryData(['discussions']));
        }
    });
}
