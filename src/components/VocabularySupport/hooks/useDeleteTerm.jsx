import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useDeleteTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {},
        //client side optimistic update
        onMutate: termId => {
            queryClient.setQueryData(['terms'], prevTerms => prevTerms?.filter(term => term.identifier !== termId));
        },
        onSettled: async () => {
            //queryClient.invalidateQueries({ queryKey: ['terms'] });
        }
    });
}
