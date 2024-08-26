import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useUpdateDiscussion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newDiscussion) => {
            return newDiscussion;
        },
        onMutate: async newDiscussion => {
            await queryClient.setQueryData(['discussions'], prevDiscussion =>
                prevDiscussion?.map(discussion =>
                    discussion.resourceId === newDiscussion.resourceId ? newDiscussion : discussion
                )
            );
        },
        onSettled: () => {
            return Promise.resolve(queryClient.getQueryData(['discussions']));
        }
    });
}
