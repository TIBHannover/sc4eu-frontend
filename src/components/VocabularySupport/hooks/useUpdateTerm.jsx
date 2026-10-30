import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useUpdateTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {},
        onMutate: async newTerm => {
            await queryClient.setQueryData(['terms'], prevTerms => {
                const prev = prevTerms || [];
                return prev.map(prevTerm => (prevTerm.identifier === newTerm.identifier ? newTerm : prevTerm));
            });
        },
        onSettled: () => {
            return Promise.resolve(queryClient.getQueryData(['terms']));
        }
    });
}
