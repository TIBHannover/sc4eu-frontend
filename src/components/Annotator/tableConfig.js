import { Link } from '@mui/material';
import { generateLink } from './utils';

/* eslint-disable react/prop-types */
export const createColumns = groupByAncestor => {
    const linkCell = (text, iri, ontologyId) => (
        <Link
            href={generateLink(iri, ontologyId)}
            target="_blank"
            rel="noopener noreferrer"
        >
            {text}
        </Link>
    );

    if (groupByAncestor) {
        return [
            {
                id: 'ancestor_term',
                header: 'Ancestor Term',
                accessorKey: 'ancestor_term',
                Cell: ({ row }) => linkCell(row?.original?.ancestor_term, row?.original?.ancestor_iri, row?.original?.ontologyId),
            },
            {
                id: 'labels',
                header: 'Matched Terms',
                accessorKey: 'labels',
                Cell: ({ row }) => (
                    <div>
                        {row?.original?.labels.map((term, idx) => (
                            <div key={idx}>{term}</div>
                        ))}
                    </div>
                ),
            },
            {
                id: 'ancestor_iri',
                header: 'IRI',
                accessorKey: 'ancestor_iri',
                Cell: ({ row }) => (
                    <Link
                        href={row.original.ancestor_iri}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {row?.original?.ancestor_iri}
                    </Link>
                ),
            },
            {
                id: 'ancestor_synonyms',
                header: 'Synonyms',
                accessorKey: 'ancestor_synonyms',
                Cell: ({ row }) => (
                    <div>
                        {(row?.original?.ancestor_synonyms || []).map((s, i) => (
                            <div key={i}>{s}</div>
                        ))}
                    </div>
                ),
            },
        ];
    }

    return [
        {
            id: 'label',
            header: 'Matched Term',
            accessorKey: 'label',
            Cell: ({ row }) => linkCell(
                row?.original?.label,
                row?.original?.iri,
                row?.original?.ontologyId
            ),
        },
        {
            id: 'ancestor_term',
            header: 'Ancestor Term',
            accessorKey: 'ancestor_term',
        },
        {
            id: 'iri',
            header: 'IRI',
            accessorKey: 'iri',
            Cell: ({ row }) => (
                <Link href={row?.original?.iri} target="_blank" rel="noopener noreferrer">
                    {row.original.iri}
                </Link>
            ),
        },
        {
            id: 'synonyms',
            header: 'Synonyms',
            accessorKey: 'synonyms',
            Cell: ({ row }) => (
                <div>
                    {(row?.original?.synonyms || []).map((s, i) => (
                        <div key={i}>{s}</div>
                    ))}
                </div>
            ),
        },
    ];
};
