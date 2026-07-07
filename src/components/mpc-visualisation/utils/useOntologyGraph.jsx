import { useEffect, useMemo, useState } from 'react';
import { parseTtlText, extractSurveyDomains, filterSchemaByDomain } from '../data/parseTtl';
import { AUTOMATED_KNOWLEDGE_GRAPH_TTL } from '../data/automatedKnowledgeGraph';

export function useOntologyGraph() {
    const [rawSchema, setRawSchema] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        parseTtlText(AUTOMATED_KNOWLEDGE_GRAPH_TTL)
            .then(setRawSchema)
            .catch(err => console.error('Failed to parse ontology:', err));
    }, []);


    return useMemo(() => {
        if (!rawSchema) {
            return { overviewSchema: null, tierSchema: {}, surveys: [], loading, error };
        }

        const domains = extractSurveyDomains(rawSchema);
        const domainById = new Map(domains.map((d) => [d.id, d]));

        // One filtered schema per tier, keyed by domain id (e.g. "OEM_Survey").
        const tierSchema = {};
        domains.forEach((domain) => {
            tierSchema[domain.id] = filterSchemaByDomain(rawSchema, domain.memberNodeIds);
        });

        // Tag tier-role nodes in the overview with the domain key they open,
        // so OntologyReactFlow's handleNodeClick can call onTierChange(tierKey).
        const overviewNodes = rawSchema.nodes.map((node) => {
            if (node.role !== 'tier') return node;

            const tierKey = domainById.has(node.id)
                ? node.id
                : domains.find((d) => d.memberNodeIds.has(node.id))?.id ?? null;

            return tierKey ? { ...node, tierKey } : node;
        });

        return {
            overviewSchema: { nodes: overviewNodes, edges: rawSchema.edges },
            tierSchema,
            surveys: domains.map((d) => ({ key: d.id, label: d.label })),
            loading,
            error,
        };
    }, [rawSchema, loading, error]);
}