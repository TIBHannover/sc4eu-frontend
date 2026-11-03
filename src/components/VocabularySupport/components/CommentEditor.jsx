import React, { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Box, Divider, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { renderCommentMarkdown } from '../utils/CommentMarkdown';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
const MOD_KEY = isMac ? '⌘' : 'Ctrl';

const TOOLBAR_ACTIONS = [
    { format: 'bold', label: `Bold (${MOD_KEY}+B)`, Icon: FormatBoldIcon },
    { format: 'italic', label: `Italic (${MOD_KEY}+I)`, Icon: FormatItalicIcon },
    { format: 'link', label: `Link (${MOD_KEY}+K)`, Icon: InsertLinkIcon },
    { format: 'bulletList', label: 'Bulleted list', Icon: FormatListBulletedIcon },
    { format: 'numberedList', label: 'Numbered list', Icon: FormatListNumberedIcon }
];

const KEYBOARD_SHORTCUTS = { b: 'bold', i: 'italic', k: 'link' };

/**
 * Maps Ctrl/Cmd+B/I/K to a format name, or returns null.
 * @param {KeyboardEvent} e
 */
export function getShortcutFormat(e) {
    if (!(e.ctrlKey || e.metaKey) || e.altKey || e.shiftKey) {
        return null;
    }
    return KEYBOARD_SHORTCUTS[e.key?.toLowerCase()] ?? null;
}

const contentSx = {
    fontSize: '1.05rem',
    wordBreak: 'break-word',
    '& p': { m: 0, mb: 0.5 },
    '& > :last-child': { mb: 0 },
    '& ul, & ol': { pl: 3, my: 0.5 },
    '& li > p': { mb: 0 },
    '& a': { color: 'primary.main', textDecoration: 'underline' },
    '& code': {
        fontFamily: 'monospace',
        fontSize: '0.9em',
        px: 0.5,
        borderRadius: 0.5,
        backgroundColor: 'action.hover',
        color: 'inherit'
    },
    '& pre': { p: 1, borderRadius: 1, overflowX: 'auto', backgroundColor: 'action.hover', mb: 0.5 },
    '& pre code': { p: 0, backgroundColor: 'transparent' },
    '& blockquote': { m: 0, mb: 0.5, pl: 1.5, borderLeft: '3px solid', borderColor: 'divider', color: 'text.secondary' },
    '& h1, & h2, & h3, & h4, & h5, & h6': { fontSize: '1.1rem', fontWeight: 'bold', m: 0, mb: 0.5 }
};

// body1 line-height; used to turn `maxLines` into a height (em = the content's own font size)
const CONTENT_LINE_HEIGHT = 1.5;

/**
 * Renders a (Markdown) comment body. The generated HTML is sanitized with DOMPurify
 *
 * `maxLines` clips long comments to roughly that many lines (formatting stays intact)
 * and fades out the last line when something was cut off.
 */
export function CommentContent({ content, gutterBottom, maxLines }) {
    const html = useMemo(() => renderCommentMarkdown(content), [content]);
    const ref = useRef(null);
    const [isClipped, setIsClipped] = useState(false);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!maxLines || !element) {
            setIsClipped(false);
            return undefined;
        }
        const check = () => setIsClipped(element.scrollHeight > element.clientHeight + 1);
        check();
        if (typeof ResizeObserver === 'undefined') {
            return undefined;
        }
        const observer = new ResizeObserver(check);
        observer.observe(element);
        return () => observer.disconnect();
    }, [html, maxLines]);

    const fade = 'linear-gradient(to bottom, #000 60%, transparent)';
    const sx = {
        ...contentSx,
        lineHeight: CONTENT_LINE_HEIGHT,
        ...(maxLines && { maxHeight: `${maxLines * CONTENT_LINE_HEIGHT}em`, overflow: 'hidden' }),
        ...(isClipped && { maskImage: fade, WebkitMaskImage: fade })
    };

    return (
        <Typography ref={ref} component="div" variant="body1" gutterBottom={gutterBottom} sx={sx} dangerouslySetInnerHTML={{ __html: html }} />
    );
}

CommentContent.propTypes = {
    content: PropTypes.string,
    gutterBottom: PropTypes.bool,
    maxLines: PropTypes.number
};

function ToolbarButton({ label, onClick, disabled, active, children }) {
    return (
        <Tooltip title={label} describeChild>
            <span>
                <IconButton
                    size="small"
                    aria-label={label}
                    aria-pressed={active}
                    disabled={disabled}
                    onMouseDown={e => e.preventDefault()}
                    onClick={onClick}
                    sx={{ p: 0.5, borderRadius: 1, backgroundColor: active ? 'action.selected' : 'transparent' }}
                >
                    {children}
                </IconButton>
            </span>
        </Tooltip>
    );
}

ToolbarButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    children: PropTypes.node.isRequired
};

/**
 * DOM node the enlarged editor is rendered into (via a portal). Provide it from the
 * surrounding view (e.g. ExpandedRow) — the node must be `position: relative`.
 * Without a provider the "Enlarge editor" button is not shown.
 */
export const CommentEditorOverlayContext = createContext(null);

// textarea fills the remaining height of the overlay instead of using a fixed row count
const expandedFieldSx = {
    display: 'flex',
    flex: '1 1 auto',
    minHeight: 0,
    '& .MuiInputBase-root': { flex: '1 1 auto', alignItems: 'stretch', minHeight: 0 },
    '& textarea': { height: '100% !important', overflow: 'auto !important' }
};

/**
 * Markdown comment editor: formatting toolbar + textarea + preview toggle + enlarge toggle.
 * Text state, selection handling, @mention support and the expanded flag are owned by the
 * caller (see useMentionInput in CommentsSection); this component is presentational.
 *
 * When expanded, the editor (including `actions`, e.g. the submit button) is shown as an
 * overlay covering the element provided through CommentEditorOverlayContext.
 */
function CommentEditor({
    value,
    onChange,
    onKeyDown,
    onFormat,
    inputRef,
    hidden,
    placeholder,
    title,
    textFieldProps,
    actions,
    actionsInside,
    expanded,
    onExpandedChange
}) {
    const overlayContainer = useContext(CommentEditorOverlayContext);
    const [preview, setPreview] = useState(false);
    const pendingSelectionRef = useRef(null);

    const canExpand = Boolean(overlayContainer) && Boolean(onExpandedChange);
    const isExpanded = canExpand && expanded && !hidden;

    useEffect(() => {
        if (!value) {
            setPreview(false);
        }
    }, [value]);

    const setExpanded = next => {
        const field = inputRef?.current;
        if (field) {
            pendingSelectionRef.current = [field.selectionStart, field.selectionEnd];
        }
        onExpandedChange(next);
    };

    useEffect(() => {
        const field = inputRef?.current;
        const selection = pendingSelectionRef.current;
        if (field && selection) {
            pendingSelectionRef.current = null;
            field.focus();
            field.setSelectionRange(selection[0], selection[1]);
        }
    }, [isExpanded, inputRef]);

    const shrinkRef = useRef(null);
    shrinkRef.current = () => setExpanded(false);

    useEffect(() => {
        if (!isExpanded) {
            return undefined;
        }
        const handleKeyDown = e => {
            if (e.key !== 'Escape' || e.isComposing) {
                return;
            }
            e.stopPropagation();
            shrinkRef.current();
        };
        document.addEventListener('keydown', handleKeyDown, true);
        return () => document.removeEventListener('keydown', handleKeyDown, true);
    }, [isExpanded]);

    const isSmall = textFieldProps?.size === 'small';
    const hasRichPlaceholder = placeholder != null && typeof placeholder !== 'string';

    const toolbar = (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mb: 0.5 }}>
            {TOOLBAR_ACTIONS.map(({ format, label, Icon }) => (
                <ToolbarButton key={format} label={label} disabled={preview} onClick={() => onFormat(format)}>
                    <Icon fontSize="small" />
                </ToolbarButton>
            ))}
            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
            <ToolbarButton label={preview ? 'Back to editing' : 'Preview'} active={preview} onClick={() => setPreview(p => !p)}>
                {preview ? <EditOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
            </ToolbarButton>
            {canExpand && (
                <Box sx={{ ml: 'auto' }}>
                    <ToolbarButton
                        label={isExpanded ? 'Shrink editor (Esc)' : 'Enlarge editor'}
                        active={isExpanded}
                        onClick={() => setExpanded(!isExpanded)}
                    >
                        {isExpanded ? <CloseFullscreenIcon fontSize="small" /> : <OpenInFullIcon fontSize="small" />}
                    </ToolbarButton>
                </Box>
            )}
        </Box>
    );

    const body = (
        <>
            {toolbar}
            <Box sx={{ position: 'relative', ...(isExpanded && { flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }) }}>
                <TextField
                    inputRef={inputRef}
                    multiline
                    fullWidth
                    placeholder={hasRichPlaceholder ? undefined : placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    {...(hasRichPlaceholder && title && { inputProps: { 'aria-label': title } })}
                    {...textFieldProps}
                    {...(isExpanded && { rows: 1, minRows: undefined, maxRows: undefined })}
                    sx={{ ...(isExpanded && expandedFieldSx), ...(preview && { display: 'none' }) }}
                />

                {hasRichPlaceholder && !value && !preview && (
                    <Box
                        aria-hidden
                        sx={theme => ({
                            ...theme.typography.body1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            p: isSmall ? '8.5px 14px' : '16.5px 14px',
                            lineHeight: '1.4375em',
                            color: 'text.primary',
                            opacity: theme.palette.mode === 'light' ? 0.42 : 0.5,
                            pointerEvents: 'none',
                            overflow: 'hidden'
                        })}
                    >
                        {placeholder}
                    </Box>
                )}

                {preview && (
                    <Box
                        sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            px: 1.75,
                            py: 1,
                            overflowY: 'auto',
                            ...(isExpanded ? { flex: '1 1 auto', minHeight: 0 } : { minHeight: isSmall ? 64 : 125, maxHeight: 300 })
                        }}
                    >
                        {value.trim() ? (
                            <CommentContent content={value} />
                        ) : (
                            <Typography variant="body2" color="text.disabled">
                                Nothing to preview
                            </Typography>
                        )}
                    </Box>
                )}

                {actions && actionsInside && <Box sx={{ position: 'absolute', right: 5, bottom: 5 }}>{actions}</Box>}
            </Box>
            {actions && !actionsInside && <Box sx={{ mt: 0.75 }}>{actions}</Box>}
        </>
    );

    if (isExpanded) {
        return createPortal(
            <Box
                role="dialog"
                aria-label={title || 'Comment editor'}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 10,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    borderRadius: 'inherit',
                    backgroundColor: 'background.paper'
                }}
            >
                {title && (
                    <Typography variant="subtitle1" fontWeight={700} color="text.primary" noWrap sx={{ mb: 1 }}>
                        {title}
                    </Typography>
                )}
                {body}
            </Box>,
            overlayContainer
        );
    }

    return (
        <Box hidden={hidden} sx={{ width: '100%' }}>
            {body}
        </Box>
    );
}

CommentEditor.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onFormat: PropTypes.func.isRequired,
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
    hidden: PropTypes.bool,
    placeholder: PropTypes.node,
    title: PropTypes.string,
    textFieldProps: PropTypes.object,
    actions: PropTypes.node,
    actionsInside: PropTypes.bool,
    expanded: PropTypes.bool,
    onExpandedChange: PropTypes.func
};

export default CommentEditor;
