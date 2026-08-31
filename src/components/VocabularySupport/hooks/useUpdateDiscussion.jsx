import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useUpdateDiscussion() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async newDiscussion => {
            return newDiscussion;
        },
        onMutate: async newDiscussion => {
            await queryClient.setQueryData(['discussions'], prevDiscussion => {
                const prev = prevDiscussion || [];
                const exists = prev.some(d => d.resourceId === newDiscussion.resourceId);
                if (!exists) {
                    return [...prev, newDiscussion];
                }
                return prev.map(d => (d.resourceId === newDiscussion.resourceId ? newDiscussion : d));
            });
        },
        onSettled: () => {
            return Promise.resolve(queryClient.getQueryData(['discussions']));
        }
    });
}
