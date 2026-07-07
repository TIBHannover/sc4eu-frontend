import { memo } from 'react';
import {
    Box, Typography, Popover, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { useThemePalette } from '../config/theme';

// ─── GraphHelpPopover ─────────────────────────────────────────────────────────
// Reusable help popover used by both the ReactFlow hierarchy graph and the D3
// force-tree graph.  Pass a title and an array of item descriptors; the shell
// (Popover, List structure, footer) is shared.
//
// Item shape:
//   { icon: ReactNode, primary: string, secondary: string, highlight?: bool }
//
// highlight: true → left accent border + tinted background (use for the
// most important / non-obvious interaction).

export const GraphHelpPopover = memo(function GraphHelpPopover({
    anchor,
    onClose,
    title,
    items,
}) {
    const { colorStyled: c } = useThemePalette();
    const open = Boolean(anchor);

    return (
        <Popover
            open={open}
            anchorEl={anchor}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    mt:           1,
                    width:        300,
                    bgcolor:      c.surfaceContainerLow,
                    border:       `1px solid ${c.outlineVariant}`,
                    borderRadius: 2,
                    boxShadow:    '0 4px 20px rgba(0,0,0,0.12)',
                },
            }}
        >
            <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
                <Typography sx={{
                    fontSize: 11, fontWeight: 700, color: c.onSurface,
                    letterSpacing: 0.5, textTransform: 'uppercase',
                }}>
                    {title}
                </Typography>
            </Box>

            <List dense disablePadding>
                {items.map((item, i) => (
                    <ListItem
                        key={i}
                        alignItems="flex-start"
                        sx={{
                            px: 2,
                            py: 0.75,
                            bgcolor:    item.highlight ? `${c.primary}18` : 'transparent',
                            borderLeft: item.highlight
                                ? `3px solid ${c.primary}`
                                : '3px solid transparent',
                        }}
                    >
                        <ListItemIcon sx={{
                            minWidth: 32,
                            mt:       0.25,
                            color:    item.highlight ? c.primary : c.onSurfaceVariant,
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{
                                    fontSize:   11,
                                    fontWeight: 700,
                                    color:      item.highlight ? c.primary : c.onSurface,
                                }}>
                                    {item.primary}
                                </Typography>
                            }
                            secondary={
                                <Typography sx={{
                                    fontSize: 10,
                                    color:    c.onSurfaceVariant,
                                    mt:       0.25,
                                }}>
                                    {item.secondary}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Box sx={{ px: 2, py: 1 }}>
                <Typography sx={{ fontSize: 9, color: c.outline }}>
                    Click anywhere outside to close
                </Typography>
            </Box>
        </Popover>
    );
});
