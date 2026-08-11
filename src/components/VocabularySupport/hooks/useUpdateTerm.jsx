import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useUpdateTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {},
        onMutate: newTerm => {
            queryClient.setQueryData(['terms'], prevTerms =>
                prevTerms?.map(prevTerm => (prevTerm.identifier === newTerm.identifier ? newTerm : prevTerm))
            );
        },
        onSettled: () => {
            //queryClient.invalidateQueries({ queryKey: ['terms'] }) //refetch terms after mutation, disabled for demo
        }
    });
}
