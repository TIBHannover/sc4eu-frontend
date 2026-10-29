// MOCK: term versions are generated locally until the server endpoint (git log --grep <uuid> + git show <sha>:<file>) exists.
// Expected server response shape (newest first):
// [{ sha, number, author, date, header, changedFields, term: { label, altLabel, description, seeAlso, status, ... } }]

const DAY_MS = 24 * 60 * 60 * 1000;
const MOCK_AUTHORS = ['jdoe', 'asmith', 'mmueller', 'kwagner', 'lschmidt'];

export const VERSIONED_FIELDS = [
    { key: 'label', name: 'Label' },
    { key: 'altLabel', name: 'Alternative labels' },
    { key: 'description', name: 'Description' },
    { key: 'seeAlso', name: 'See also' },
    { key: 'status', name: 'Status' }
];

export const STATUS_CHIP_VARIANTS = { reject: 'rejected', draft: 'draft', accept: 'accepted' };

export const normalizeFieldValue = (key, value) => {
    if (key === 'altLabel') {
        return (value || '')
            .split(',')
            .map(label => label.trim())
            .filter(label => label !== '')
            .join(', ');
    }
    return value || '';
};

const getChangedFields = (before, after) =>
    VERSIONED_FIELDS.filter(({ key }) => normalizeFieldValue(key, before?.[key]) !== normalizeFieldValue(key, after[key])).map(({ key }) => key);

const fakeSha = seed => {
    let hash = 0;
    for (const char of seed) {
        hash = (hash * 31 + char.codePointAt(0)) >>> 0;
    }
    let sha = '';
    while (sha.length < 40) {
        hash = (hash * 1103515245 + 12345) >>> 0;
        sha += hash.toString(16).padStart(8, '0');
    }
    return sha.slice(0, 40);
};

const shortenText = text => {
    const words = (text || '').split(' ').filter(Boolean);
    return words.length > 3 ? words.slice(0, Math.ceil(words.length / 2)).join(' ') : `${text || ''} (initial wording)`.trim();
};

const dropLastAltLabel = altLabel => {
    const labels = (altLabel || '').split(',').filter(label => label.trim() !== '');
    return labels.length ? labels.slice(0, -1).join(',') : 'Temporary synonym';
};

const renameLabel = label => {
    const renamed = (label || '').toLowerCase().replace(/\s+/g, '_');
    return renamed === label ? `${label}_old` : renamed;
};

const toValidDate = (value, fallback) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? fallback : date;
};

/**
 * Generates a fake, deterministic history for a term. The latest version always equals the given term.
 * Older versions are derived by reverting one field per step, consecutive identical snapshots are dropped.
 */
export const mockTermVersions = term => {
    const latest = { ...term };
    const previousStatus = latest.status === 'draft' ? { seeAlso: latest.seeAlso ? '' : 'url:https://example.org' } : { status: 'draft' };
    const v4 = { ...latest, ...previousStatus };
    const v3 = { ...v4, description: shortenText(v4.description) };
    const v2 = { ...v3, altLabel: dropLastAltLabel(v3.altLabel) };
    const v1 = { ...v2, label: renameLabel(v2.label) };

    const snapshots = [v1, v2, v3, v4, latest].filter((snapshot, index, all) => index === 0 || getChangedFields(all[index - 1], snapshot).length > 0);

    const lastDate = toValidDate(latest.modified, new Date());
    const firstDate = toValidDate(latest.created, new Date(lastDate.getTime() - 90 * DAY_MS));
    const span = Math.max(lastDate.getTime() - firstDate.getTime(), snapshots.length * DAY_MS);
    const dateAt = index =>
        index === snapshots.length - 1
            ? lastDate.toISOString()
            : new Date(lastDate.getTime() - span + (span * index) / (snapshots.length - 1)).toISOString();

    return snapshots
        .map((snapshot, index) => {
            const date = dateAt(index);
            return {
                sha: fakeSha(`${term.identifier}-${index}`),
                number: index + 1,
                author: MOCK_AUTHORS[index % MOCK_AUTHORS.length],
                date,
                header: `${index === 0 ? 'Create' : 'Update'} term ${term.identifier}`,
                changedFields: index === 0 ? [] : getChangedFields(snapshots[index - 1], snapshot),
                term: { ...snapshot, modified: date }
            };
        })
        .reverse();
};

/** Field-by-field comparison of two term snapshots. */
export const diffTermVersions = (fromTerm, toTerm) =>
    VERSIONED_FIELDS.map(({ key, name }) => {
        const from = normalizeFieldValue(key, fromTerm[key]);
        const to = normalizeFieldValue(key, toTerm[key]);
        return { key, name, from, to, changed: from !== to };
    });

export const formatVersionDate = isoDate => {
    const date = new Date(isoDate);
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};
