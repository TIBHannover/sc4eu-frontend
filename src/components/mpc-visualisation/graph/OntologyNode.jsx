import { memo } from 'react';
import { Handle, Position, MarkerType } from 'reactflow';
import { Typography } from '@mui/material';
import { useThemePalette, graphAccents, shadows } from '../config/theme';

// ─── Ontology role constants ──────────────────────────────────────────────────

const ONTOLOGY_ROLE = {
    abstract: 'abstract',
    tier: 'tier',
    class: 'class',
    sub: 'sub',
    sub_clickable: 'sub_clickable',
    instance: 'instance'
};

// ─── Role palette factory ─────────────────────────────────────────────────────
// Returns the full role→colours map for the given resolved colorStyled object.
// Called inside components so it always reflects the current theme mode.

function makeRolePalette(c) {
    return {
        [ONTOLOGY_ROLE.abstract]: {
            fill: c.surfaceContainerLow,
            stroke: c.outline,
            text: c.onSurface
        },
        [ONTOLOGY_ROLE.tier]: {
            fill: c.primaryContainer,
            stroke: c.primary,
            text: c.onPrimaryContainer
        },
        [ONTOLOGY_ROLE.class]: {
            fill: c.secondaryContainer,
            stroke: c.secondary,
            text: c.onSecondaryContainer
        },
        [ONTOLOGY_ROLE.sub]: {
            fill: c.tertiaryContainer,
            stroke: c.tertiary,
            text: c.onTertiaryContainer
        },
        [ONTOLOGY_ROLE.sub_clickable]: {
            fill: c.secondary,
            stroke: c.secondary,
            text: c.onSecondary
        },
        [ONTOLOGY_ROLE.instance]: {
            fill: c.surfaceContainerHigh,
            stroke: c.outline,
            text: c.onSurfaceVariant
        }
    };
}

function makeFallbackPalette(c) {
    return { fill: c.surfaceContainerLow, stroke: c.outline, text: c.onSurface };
}

// ─── resolveNodePalette ───────────────────────────────────────────────────────
// Must be called inside a component (receives colorStyled from useThemePalette).
// Exported for legend/minimap callers that already have colorStyled in scope.

export function resolveNodePalette({ role }, colorStyled) {
    const palette = makeRolePalette(colorStyled);
    return palette[role] ?? makeFallbackPalette(colorStyled);
}

// ─── Node geometry constants ──────────────────────────────────────────────────

const CIRCLE_SIZE = 100;
const DEFAULT_NODE_HEIGHT = 50;
const SUB_NODE_HEIGHT = 40;
const SELECTABLE_NODE_HEIGHT = 36;
const MIN_LABEL_WIDTH = 140;
const LABEL_WIDTH_PER_CHAR = 8;
const LABEL_WIDTH_PADDING = 40;
const HANDLE_SIZE = 7;
const HANDLE_BORDER_WIDTH = 2;
const GLOW_RING_INSET = -3;
const GLOW_RING_OPACITY = 0.35;
const CIRCLE_BORDER_RADIUS = '50%';
const PILL_BORDER_RADIUS = '50px';
const RECT_BORDER_RADIUS = 10;
const GLOW_RING_RECT_RADIUS = 14;

function isCircleRole(role) {
    return role === ONTOLOGY_ROLE.abstract;
}

function resolveNodeDimensions({ role, label, groupKey, overrideWidth, overrideHeight }) {
    if (isCircleRole(role)) {
        return { width: CIRCLE_SIZE, height: CIRCLE_SIZE };
    }
    const labelWidth = Math.max(MIN_LABEL_WIDTH, label.length * LABEL_WIDTH_PER_CHAR + LABEL_WIDTH_PADDING);
    // Only sub_clickable nodes get the compact pill height.
    // Class-role nodes with a groupKey keep standard class height.
    let defaultHeight = DEFAULT_NODE_HEIGHT;
    if (role === ONTOLOGY_ROLE.sub_clickable) {
        defaultHeight = SELECTABLE_NODE_HEIGHT;
    }
    if (role === ONTOLOGY_ROLE.sub) {
        defaultHeight = SUB_NODE_HEIGHT;
    }
    return {
        width: overrideWidth ?? labelWidth,
        height: overrideHeight ?? defaultHeight
    };
}

function resolveActiveNodeStyle(palette, c) {
    // Full inversion: stroke becomes background. Used for sub_clickable nodes.
    return {
        backgroundColor: palette.stroke,
        textColor: c.onPrimary,
        borderColor: c.primary
    };
}

function resolveDefaultNodeStyle(palette) {
    return {
        backgroundColor: palette.fill,
        textColor: palette.text,
        borderColor: palette.stroke
    };
}

// ─── OntologyNode ─────────────────────────────────────────────────────────────

export const OntologyNode = memo(function OntologyNode({ data }) {
    const { colorStyled } = useThemePalette();

    const palette = resolveNodePalette({ role: data.role }, colorStyled);
    const isCircle = isCircleRole(data.role);
    const isDashed = data.role === ONTOLOGY_ROLE.instance;
    const isSub = data.role === ONTOLOGY_ROLE.sub || data.role === ONTOLOGY_ROLE.sub_clickable;
    const isPill = data.role === ONTOLOGY_ROLE.sub_clickable; // shape only for sub_clickable
    const isSelectable = Boolean(data.groupKey); // interactivity for any groupKey
    const isSelected = isSelectable && data.active;
    const isClassSelected = isSelected && !isPill; // class-role node selected

    const { width, height } = resolveNodeDimensions({
        role: data.role,
        label: data.label,
        groupKey: data.groupKey,
        overrideWidth: data.w,
        overrideHeight: data.h
    });

    // Style resolution:
    //  - sub_clickable selected → full inversion (pill, strong contrast)
    //  - class-role selected    → tinted border highlight (keeps class fill)
    //  - default                → normal palette
    const { backgroundColor, textColor, borderColor } =
        isSelected && isPill ? resolveActiveNodeStyle(palette, colorStyled) : resolveDefaultNodeStyle(palette);

    // Class-role selected nodes get a thicker, more prominent border
    // using the selection highlight colour rather than full inversion.
    const effectiveBorderColor = isClassSelected ? colorStyled.primary : borderColor;

    const borderRadius = isCircle ? CIRCLE_BORDER_RADIUS : isPill ? PILL_BORDER_RADIUS : RECT_BORDER_RADIUS;
    const borderStyle = isDashed ? 'dashed' : 'solid';
    const glowRingRadius = isCircle ? CIRCLE_BORDER_RADIUS : isPill ? PILL_BORDER_RADIUS : GLOW_RING_RECT_RADIUS;
    const borderWidth = isSelected ? '2.5px' : '2px';

    let boxShadow = shadows.nodeDefault;
    if (isSelected && isPill) {
        boxShadow = shadows.nodeSelected(palette.stroke);
    } else if (isClassSelected) {
        boxShadow = shadows.nodeSelected(colorStyled.primary);
    } else if (isSelectable) {
        boxShadow = shadows.nodeSelectable(palette.stroke);
    }

    const handleStyle = {
        background: palette.stroke,
        width: HANDLE_SIZE,
        height: HANDLE_SIZE,
        border: `${HANDLE_BORDER_WIDTH}px solid ${colorStyled.surfaceContainerLowest}`
    };

    return (
        <div
            style={{
                width,
                height,
                borderRadius,
                background: backgroundColor,
                border: `${borderWidth} ${borderStyle} ${effectiveBorderColor}`,
                boxShadow,
                color: textColor,
                cursor: isSelectable ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: isPill ? '4px 16px' : '6px 10px',
                userSelect: 'none',
                position: 'relative',
                transition: 'all 0.2s ease'
            }}
        >
            <Handle type="target" position={Position.Top} style={handleStyle} />

            <Typography style={{ color: textColor }} sx={{ fontSize: 8, fontWeight: 600, opacity: 0.6, letterSpacing: 0.6, lineHeight: 1 }}>
                {data.stereotype}
            </Typography>

            <Typography
                style={{ color: textColor }}
                sx={{
                    fontSize: isSub || isSelectable ? 16 : 18,
                    fontWeight: () => {
                        if (isSelected) {
                            return 800;
                        } else if (isSub || isSelectable) {
                            return 600;
                        } else {
                            return 700;
                        }
                    },
                    lineHeight: 1.25,
                    mt: '2px'
                }}
            >
                {data.label}
            </Typography>

            {(data.active || isSelected) && <GlowRing borderRadius={glowRingRadius} color={isClassSelected ? colorStyled.primary : palette.stroke} />}

            <Handle type="source" position={Position.Bottom} style={handleStyle} />
        </div>
    );
});

function GlowRing({ borderRadius, color }) {
    return (
        <div
            style={{
                position: 'absolute',
                inset: GLOW_RING_INSET,
                borderRadius,
                border: `1px solid ${color}`,
                opacity: GLOW_RING_OPACITY,
                pointerEvents: 'none'
            }}
        />
    );
}

// ─── buildGraphNodes ──────────────────────────────────────────────────────────

export function buildGraphNodes(schema, selectedGroup) {
    return schema.nodes.map(schemaNode => {
        const { width, height } = resolveNodeDimensions({
            role: schemaNode.role,
            label: schemaNode.label
        });

        const isGroupSelected = selectedGroup && schemaNode.groupKey === selectedGroup;

        return {
            id: schemaNode.id,
            type: 'ontologyNode',
            position: { x: 0, y: 0 },
            data: {
                ...schemaNode,
                colorKey: schemaNode.ck,
                groupKey: schemaNode.groupKey ?? null,
                active: schemaNode.active ?? isGroupSelected ?? false
            },
            width,
            height
        };
    });
}

// ─── buildGraphEdges ──────────────────────────────────────────────────────────
// edgeColors is passed in by the caller (resolved from useThemePalette in the
// component) so that edge colours respond to dark/light mode switching.

export function buildGraphEdges(schema, edgeColors) {
    return schema.edges.map((schemaEdge, index) => {
        const isSubclassEdge = schemaEdge.style === 'sub';
        const isInstanceEdge = schemaEdge.style === 'inst';

        const edgeStrokeColor = isSubclassEdge ? edgeColors.subclass : graphAccents[schemaEdge.ck]?.stroke ?? edgeColors.property;

        const arrowMarkerType = isSubclassEdge ? MarkerType.Arrow : MarkerType.ArrowClosed;
        const strokeDashPattern = isInstanceEdge ? '5,5' : '0';

        const source = isSubclassEdge ? schemaEdge.t : schemaEdge.s;
        const target = isSubclassEdge ? schemaEdge.s : schemaEdge.t;

        return {
            id: `edge-${index}`,
            source,
            target,
            label: schemaEdge.label,
            type: 'default',
            style: {
                stroke: edgeStrokeColor,
                strokeWidth: isSubclassEdge ? 2 : 1.5,
                strokeDasharray: strokeDashPattern
            },
            labelBgStyle: {
                fill: edgeColors.labelBg,
                fillOpacity: 0.9
            },
            labelBgPadding: [6, 3],
            labelStyle: {
                fontSize: 9,
                fill: edgeColors.labelText,
                fontWeight: 500
            },
            markerEnd: {
                type: arrowMarkerType,
                color: edgeStrokeColor
            }
        };
    });
}
