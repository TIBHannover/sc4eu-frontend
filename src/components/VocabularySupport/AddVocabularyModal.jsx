import React from 'react';
import { useGetTerms } from './hooks/useGetTerms';
import VocabularyMainTable from './components/VocabularyMainTable';

/**
 * `AddVocabulary` is a React component that renders the main table for displaying vocabulary terms.
 * It utilizes the `useGetTerms` custom hook to fetch terms from an external source.
 * The fetched terms, along with loading and error states, are passed as props to the `VocabularyMainTable` component.
 *
 * @returns {JSX.Element} The `VocabularyMainTable` component populated with the fetched terms and states.
 */
export default function AddVocabulary() {
    // Destructuring the object returned by useGetTerms to extract data and states.
    const { data: fetchedTerms = [], refetch, isError: isLoadingTermsError, isFetching: isFetchingTerms, isLoading: isLoadingTerms } = useGetTerms();
    return (
        <VocabularyMainTable
            isLoadingTerms={isLoadingTerms}
            terms={fetchedTerms}
            isLoadingTermsError={isLoadingTermsError}
            refetch={refetch}
            isFetchingTerms={isFetchingTerms}
        />
    );
}
