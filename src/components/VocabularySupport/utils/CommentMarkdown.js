import { Marked } from 'marked';
import DOMPurify from 'dompurify';


const commentMarked = new Marked({
    async: false,
    breaks: true
});

export function renderCommentMarkdown(markdown) {
    return DOMPurify.sanitize(commentMarked.parse(markdown ?? ''));
}

export function isLinkUrl(text) {
    try {
        return ['http:', 'https:', 'mailto:'].includes(new URL(text).protocol);
    } catch {
        return false;
    }
}

const WRAP_FORMATS = {
    bold: { marker: '**', placeholder: 'bold text' },
    italic: { marker: '_', placeholder: 'italic text' }
};

const LIST_FORMATS = {
    bulletList: { pattern: /^\s*[-*+]\s+/, prefix: () => '- ' },
    numberedList: { pattern: /^\s*\d+[.)]\s+/, prefix: index => `${index + 1}. ` }
};

const ANY_LIST_PREFIX = /^\s*(?:[-*+]|\d+[.)])\s+/;

const LINK_PLACEHOLDER_TEXT = 'link text';
const LINK_PLACEHOLDER_URL = 'https://';

export const COMMENT_FORMATS = ['bold', 'italic', 'link', 'bulletList', 'numberedList'];

function trimSelection(text, start, end) {
    let s = start;
    let e = end;
    while (s < e && /\s/.test(text[s])) {
        s++;
    }
    while (e > s && /\s/.test(text[e - 1])) {
        e--;
    }
    return [s, e];
}

function toggleWrap(text, start, end, { marker, placeholder }) {
    const [s, e] = trimSelection(text, start, end);
    const len = marker.length;
    const selected = text.slice(s, e);

    if (s >= len && text.slice(s - len, s) === marker && text.slice(e, e + len) === marker) {
        return {
            text: text.slice(0, s - len) + selected + text.slice(e + len),
            selectionStart: s - len,
            selectionEnd: e - len
        };
    }

    if (selected.length >= len * 2 && selected.startsWith(marker) && selected.endsWith(marker)) {
        const inner = selected.slice(len, selected.length - len);
        return {
            text: text.slice(0, s) + inner + text.slice(e),
            selectionStart: s,
            selectionEnd: s + inner.length
        };
    }

    const inner = selected || placeholder;
    return {
        text: text.slice(0, s) + marker + inner + marker + text.slice(e),
        selectionStart: s + len,
        selectionEnd: s + len + inner.length
    };
}

function insertLink(text, start, end) {
    const [s, e] = trimSelection(text, start, end);
    const selected = text.slice(s, e);

    if (isLinkUrl(selected)) {
        const snippet = `[${LINK_PLACEHOLDER_TEXT}](${selected})`;
        return {
            text: text.slice(0, s) + snippet + text.slice(e),
            selectionStart: s + 1,
            selectionEnd: s + 1 + LINK_PLACEHOLDER_TEXT.length
        };
    }

    const label = selected || LINK_PLACEHOLDER_TEXT;
    const snippet = `[${label}](${LINK_PLACEHOLDER_URL})`;

    const selectionStart = selected ? s + label.length + 3 : s + 1;
    const selectionEnd = selected ? selectionStart + LINK_PLACEHOLDER_URL.length : s + 1 + label.length;

    return {
        text: text.slice(0, s) + snippet + text.slice(e),
        selectionStart,
        selectionEnd
    };
}

function toggleList(text, start, end, { pattern, prefix }) {
    const effectiveEnd = end > start && text[end - 1] === '\n' ? end - 1 : end;
    const blockStart = text.lastIndexOf('\n', start - 1) + 1;
    let blockEnd = text.indexOf('\n', effectiveEnd);
    if (blockEnd === -1) {
        blockEnd = text.length;
    }

    const lines = text.slice(blockStart, blockEnd).split('\n');
    const contentLines = lines.filter(line => line.trim() !== '');
    const removing = contentLines.length > 0 && contentLines.every(line => pattern.test(line));

    let index = 0;
    const newLines = lines.map(line => {
        if (removing) {
            return line.replace(pattern, '');
        }
        if (line.trim() === '' && contentLines.length > 0) {
            return line;
        }
        return prefix(index++) + line.replace(ANY_LIST_PREFIX, '');
    });

    const block = newLines.join('\n');
    const blockEndAfter = blockStart + block.length;

    return {
        text: text.slice(0, blockStart) + block + text.slice(blockEnd),
        selectionStart: start === end ? blockEndAfter : blockStart,
        selectionEnd: blockEndAfter
    };
}

/**
 * Applies a toolbar format to the given text/selection.
 * @param {string} text current textarea value
 * @param {number} selectionStart
 * @param {number} selectionEnd
 * @param {'bold'|'italic'|'link'|'bulletList'|'numberedList'} format
 * @returns {{text: string, selectionStart: number, selectionEnd: number}}
 */
export function applyCommentFormat(text, selectionStart, selectionEnd, format) {
    const start = Math.min(selectionStart, selectionEnd);
    const end = Math.max(selectionStart, selectionEnd);

    if (WRAP_FORMATS[format]) {
        return toggleWrap(text, start, end, WRAP_FORMATS[format]);
    }
    if (LIST_FORMATS[format]) {
        return toggleList(text, start, end, LIST_FORMATS[format]);
    }
    if (format === 'link') {
        return insertLink(text, start, end);
    }
    return { text, selectionStart, selectionEnd };
}
