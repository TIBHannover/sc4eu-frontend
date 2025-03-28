import { Link } from '@mui/material';
import { generateLink, getContext } from './utils';

export const createColumns = inputText => [
    {
        header: 'Term',
        accessorKey: 'matched_term',
        Cell: ({ row }) => (
            <Link href={generateLink(row?.original?.iri, row?.original?.ontologyId)} target="_blank" rel="noopener noreferrer">
                {row?.original?.matched_term}
            </Link>
        )
    },
    {
        header: 'Context',
        accessorKey: 'context',
        Cell: ({ row }) => {
            const { before, term, after } = getContext(inputText, row?.original?.start, row?.original?.end);
            return (
                <span>
                    <span style={{ color: 'grey' }}>{before} </span>
                    <strong>{term}</strong>
                    <span style={{ color: 'grey' }}> {after}</span>
                </span>
            );
        }
    },
    {
        header: 'IRI',
        accessorKey: 'iri',
        Cell: ({ row }) => (
            <Link href={row?.original?.iri} target="_blank" rel="noopener noreferrer">
                {row?.original?.iri}
            </Link>
        )
    },
    {
        header: 'Synonyms',
        accessorKey: 'synonyms',
        size: 120,
        Cell: ({ row }) => (
            <div>
                {row?.original?.synonyms.map((synonym, index) => (
                    <div key={index}>{synonym}</div>
                ))}
            </div>
        )
    }
];
