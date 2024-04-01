import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTerm() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            try {
                return Promise.resolve();
            } catch (e) {
                console.log('Error in mutationFn' + e);
            }
        },
        onMutate: async newTerm => {
            queryClient.setQueryData(['terms'], prevTerms => [
                ...prevTerms,
                {
                    ...newTerm
                }
            ]);
        },
        onSettled: async () => {
            console.log('onSuccess');
            //queryClient.invalidateQueries({ queryKey: ['terms'] });
        }
    });
}
