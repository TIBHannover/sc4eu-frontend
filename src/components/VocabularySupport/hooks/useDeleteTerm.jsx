import { useMutation, useQueryClient } from '@tanstack/react-query';
export function useDeleteTerm() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: termId => {
            console.log(' in the onMutate: ', termId);
            queryClient.setQueryData(['terms'], prevTerms => prevTerms?.filter(term => term.identifier !== termId));
        },
        onSettled: async () => {
            console.log('useDeleteTerm: In the onSettled');
            //queryClient.invalidateQueries({ queryKey: ['terms'] });
        }
    });
}
