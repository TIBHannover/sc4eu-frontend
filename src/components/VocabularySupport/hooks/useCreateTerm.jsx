import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateTerm() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            try {
                await Promise.resolve();
            } catch (e) {
                console.error('Error in mutationFn' + e);
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
            //queryClient.invalidateQueries({ queryKey: ['terms'] });
        }
    });
}
