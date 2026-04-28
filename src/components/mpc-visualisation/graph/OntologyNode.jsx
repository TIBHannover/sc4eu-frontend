import { memo } from "react";
import { Handle, Position, MarkerType } from "reactflow";
import { Typography } from "@mui/material";
import { colorStyled, graphAccents, edgeColors } from "../config/theme";

// ─── Ontology role constants ──────────────────────────────────────────────────
// Matches the role strings set in the schema definitions.
// Defined as a constant object so that a typo is a reference error,
// not a silent string mismatch.

const ONTOLOGY_ROLE = {
  abstract: "abstract",
  tier:     "tier",
  class:    "class",
  sub:      "sub",
  instance: "instance",
};


// ─── Role palettes ────────────────────────────────────────────────────────────
// Maps each ontology role to a Material token triple { fill, stroke, text }.
// Every role in ONTOLOGY_ROLE has an entry so the lookup is always defined.

const ROLE_PALETTE = {
  [ONTOLOGY_ROLE.abstract]: {
    fill:   colorStyled.surfaceContainerLow,
    stroke: colorStyled.outline,
    text:   colorStyled.onSurface,
  },
  [ONTOLOGY_ROLE.tier]: {
    fill:   colorStyled.primaryContainer,
    stroke: colorStyled.primary,
    text:   colorStyled.onPrimaryContainer,
  },
  [ONTOLOGY_ROLE.class]: {
    fill:   colorStyled.secondaryContainer,
    stroke: colorStyled.secondary,
    text:   colorStyled.onSecondaryContainer,
  },
  [ONTOLOGY_ROLE.sub]: {
    fill:   colorStyled.tertiaryContainer,
    stroke: colorStyled.tertiary,
    text:   colorStyled.onTertiaryContainer,
  },
  [ONTOLOGY_ROLE.instance]: {
    fill:   colorStyled.surfaceContainerHigh,
    stroke: colorStyled.outline,
    text:   colorStyled.onSurfaceVariant,
  },
};

const FALLBACK_PALETTE = {
  fill:   colorStyled.surfaceContainerLow,
  stroke: colorStyled.outline,
  text:   colorStyled.onSurface,
};

// Exported so OntologyGraph can resolve palette without duplicating this logic.
export function resolveNodePalette({ colorKey, role }) {
  return graphAccents[colorKey] ?? ROLE_PALETTE[role] ?? FALLBACK_PALETTE;
}

// ─── Node geometry constants ──────────────────────────────────────────────────

const CIRCLE_SIZE             = 100;
const DEFAULT_NODE_HEIGHT     = 50;
const MIN_LABEL_WIDTH         = 140;
const LABEL_WIDTH_PER_CHAR    = 8;
const LABEL_WIDTH_PADDING     = 40;
const HANDLE_SIZE             = 7;
const HANDLE_BORDER_WIDTH     = 2;
const GLOW_RING_INSET         = -3;
const GLOW_RING_OPACITY       = 0.35;
const CIRCLE_BORDER_RADIUS    = "50%";
const RECT_BORDER_RADIUS      = 10;
const GLOW_RING_RECT_RADIUS   = 14;

function isCircleRole(role) {
  return role === ONTOLOGY_ROLE.abstract;
}

function resolveNodeDimensions({ role, label, overrideWidth, overrideHeight }) {
  if (isCircleRole(role)) {
    return { width: CIRCLE_SIZE, height: CIRCLE_SIZE };
  }

  const labelWidth = Math.max(
    MIN_LABEL_WIDTH,
    label.length * LABEL_WIDTH_PER_CHAR + LABEL_WIDTH_PADDING
  );

  return {
    width:  overrideWidth  ?? labelWidth,
    height: overrideHeight ?? DEFAULT_NODE_HEIGHT,
  };
}

// ─── Active / default style resolution ───────────────────────────────────────
// Active nodes invert the palette: stroke becomes the fill background.
// Resolved into named objects before JSX so the render return has no
// conditional expressions.

function resolveActiveNodeStyle(palette) {
  return {
    backgroundColor: palette.stroke,
    textColor:       colorStyled.onPrimary,
    borderColor:     colorStyled.primary,
  };
}

function resolveDefaultNodeStyle(palette) {
  return {
    backgroundColor: palette.fill,
    textColor:       palette.text,
    borderColor:     palette.stroke,
  };
}

// ─── OntologyNode ─────────────────────────────────────────────────────────────

export const OntologyNode = memo(function OntologyNode({ data }) {
  const palette   = resolveNodePalette({ colorKey: data.colorKey, role: data.role });
  const isCircle  = isCircleRole(data.role);
  const isDashed  = data.role === ONTOLOGY_ROLE.instance;

  const { width, height } = resolveNodeDimensions({
    role:           data.role,
    label:          data.label,
    overrideWidth:  data.w,
    overrideHeight: data.h,
  });

  const { backgroundColor, textColor, borderColor } = data.active
    ? resolveActiveNodeStyle(palette)
    : resolveDefaultNodeStyle(palette);

  const borderRadius   = isCircle ? CIRCLE_BORDER_RADIUS : RECT_BORDER_RADIUS;
  const borderStyle    = isDashed ? "dashed" : "solid";
  const glowRingRadius = isCircle ? CIRCLE_BORDER_RADIUS : GLOW_RING_RECT_RADIUS;

  const boxShadow = data.active
    ? `0 0 0 3px ${palette.stroke}33, 0 4px 12px rgba(0,0,0,0.1)`
    : "0 1px 4px rgba(0,0,0,0.06)";

  const handleStyle = {
    background: palette.stroke,
    width:      HANDLE_SIZE,
    height:     HANDLE_SIZE,
    border:     `${HANDLE_BORDER_WIDTH}px solid ${colorStyled.surfaceContainerLowest}`,
  };

  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background:     backgroundColor,
        border:         `2.5px ${borderStyle} ${borderColor}`,
        boxShadow,
        color:          textColor,
        cursor:         "pointer",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        "6px 10px",
        userSelect:     "none",
        position:       "relative",
        transition:     "all 0.2s ease",
      }}
    >
      <Handle type="target" position={Position.Top} style={handleStyle} />

      {/* Stereotype label — e.g. «class», «survey», «instance» */}
      <Typography
        style={{ color: textColor }}
        sx={{
          fontSize:      8,
          fontWeight:    600,
          opacity:       0.6,
          letterSpacing: 0.6,
          lineHeight:    1,
        }}
      >
        {data.stereotype}
      </Typography>

      {/* Node name */}
      <Typography
        style={{ color: textColor }}
        sx={{
          fontSize:   11.5,
          fontWeight: 700,
          lineHeight: 1.25,
          mt:         "3px",
        }}
      >
        {data.label}
      </Typography>

      {data.active && (
        <GlowRing borderRadius={glowRingRadius} color={palette.text} />
      )}

      <Handle type="source" position={Position.Bottom} style={handleStyle} />
    </div>
  );
});

// GlowRing is a purely decorative overlay — not exported.
// It has no MUI equivalent so it stays as a plain div.
function GlowRing({ borderRadius, color }) {
  return (
    <div
      style={{
        position:      "absolute",
        inset:         GLOW_RING_INSET,
        borderRadius,
        border:        `1px solid ${color}`,
        opacity:       GLOW_RING_OPACITY,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── buildGraphNodes ──────────────────────────────────────────────────────────
// Converts schema node definitions into ReactFlow node objects.
// Schema nodes use `ck` as the color key field name — renamed to `colorKey`
// here so that downstream code never encounters the abbreviated form.

export function buildGraphNodes(schema) {
  return schema.nodes.map((schemaNode) => {
    const { width, height } = resolveNodeDimensions({
      role:  schemaNode.role,
      label: schemaNode.label,
    });

    return {
      id:       schemaNode.id,
      type:     "ontologyNode",
      position: { x: 0, y: 0 }, // ELK overwrites positions after layout
      data: {
        ...schemaNode,
        colorKey: schemaNode.ck,
        active:   schemaNode.active ?? false,
      },
      width,
      height,
    };
  });
}

// ─── buildGraphEdges ──────────────────────────────────────────────────────────
// Converts schema edge definitions into ReactFlow edge objects.
// Abbreviated schema fields (s, t, ck) are expanded to full names
// so that the constructed ReactFlow objects are self-documenting.

export function buildGraphEdges(schema) {
  return schema.edges.map((schemaEdge, index) => {
    const isSubclassEdge = schemaEdge.style === "sub";
    const isInstanceEdge = schemaEdge.style === "inst";

    const edgeStrokeColor = isSubclassEdge
      ? edgeColors.subclass
      : (graphAccents[schemaEdge.ck]?.stroke ?? edgeColors.property);

    const arrowMarkerType = isSubclassEdge
      ? MarkerType.Arrow
      : MarkerType.ArrowClosed;

    const strokeDashPattern = isInstanceEdge ? "5,5" : "0";

    return {
      id:     `edge-${index}`,
      source: schemaEdge.s,
      target: schemaEdge.t,
      label:  schemaEdge.label,
      type:   "default",
      style: {
        stroke:          edgeStrokeColor,
        strokeWidth:     isSubclassEdge ? 2 : 1.5,
        strokeDasharray: strokeDashPattern,
      },
      labelBgStyle: {
        fill:        colorStyled.surfaceContainerLowest,
        fillOpacity: 0.9,
      },
      labelBgPadding: [6, 3],
      labelStyle: {
        fontSize:   9,
        fill:       colorStyled.onSurfaceVariant,
        fontWeight: 500,
      },
      markerEnd: {
        type:  arrowMarkerType,
        color: edgeStrokeColor,
      },
    };
  });
}