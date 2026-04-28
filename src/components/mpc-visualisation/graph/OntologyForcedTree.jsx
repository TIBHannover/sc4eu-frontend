import {
  useEffect, useRef, useCallback, memo, useState, useMemo,
} from "react";
import {
  Box, Typography, CircularProgress, Chip,
} from "@mui/material";
import * as d3 from "d3";
import { colorStyled } from "../config/theme";
import { extractSurveyDomains, filterSchemaByDomain } from "../data/parseTtl";

// ─── Instance node detection ──────────────────────────────────────────────────

const INSTANCE_ID_PREFIXES = [
  "assumption_",
  "tech_assumption_",
  "FutureDemand_",
  "CurrentDemand_",
  "AutonomousDrivingDevelopment_OEM_",
  "AutonomousDrivingDevelopment_Tier1_",
  "InventoryTrend_Aggregated_",
  "InventoryTarget_Aggregated_",
  "OrderCancellation_Aggregated_",
  "SemiconductorShortage_Aggregated_",
  "OEMCurrentDemand_",
  "OEMFutureDemand_",
  "SemiCurrentDemand_",
  "SemiFutureDemand_",
  "Tier1CurrentDemand_",
  "Tier1FutureDemand_",
  "FutureRegionalDemand_",
  "CurrentRegionalDemand_",
  "ConvFactor_",
  "AggregatedTrend_",
];

function isDataInstanceNode(nodeId) {
  return INSTANCE_ID_PREFIXES.some((prefix) => nodeId.includes(prefix));
}

// ─── Schema filtering ─────────────────────────────────────────────────────────

function buildFilteredSchema(schema, expandedNodeIds) {
  const structuralNodes   = schema.nodes.filter((n) => !isDataInstanceNode(n.id));
  const structuralNodeIds = new Set(structuralNodes.map((n) => n.id));

  const visibleInstanceNodes = schema.nodes.filter((schemaNode) => {
    if (!isDataInstanceNode(schemaNode.id)) return false;
    return schema.edges.some(
      (schemaEdge) =>
        expandedNodeIds.has(schemaEdge.s) &&
        schemaEdge.t === schemaNode.id &&
        structuralNodeIds.has(schemaEdge.s)
    );
  });

  const visibleInstanceIds = new Set(visibleInstanceNodes.map((n) => n.id));
  const allVisibleNodeIds  = new Set([...structuralNodeIds, ...visibleInstanceIds]);

  const visibleEdges = schema.edges.filter(
    (e) => allVisibleNodeIds.has(e.s) && allVisibleNodeIds.has(e.t)
  );

  const instanceCountByParentId = new Map();
  schema.edges.forEach((schemaEdge) => {
    if (
      structuralNodeIds.has(schemaEdge.s) &&
      isDataInstanceNode(schemaEdge.t) &&
      !visibleInstanceIds.has(schemaEdge.t)
    ) {
      instanceCountByParentId.set(
        schemaEdge.s,
        (instanceCountByParentId.get(schemaEdge.s) ?? 0) + 1
      );
    }
  });

  return {
    visibleNodes: [...structuralNodes, ...visibleInstanceNodes],
    visibleEdges,
    instanceCountByParentId,
  };
}

// ─── Domain color assignment ──────────────────────────────────────────────────

const DOMAIN_COLORS = [
  { fill: "#DBEAFE", stroke: "#2563EB", text: "#1E3A8A" },
  { fill: "#DCFCE7", stroke: "#16A34A", text: "#14532D" },
  { fill: "#FEF3C7", stroke: "#D97706", text: "#78350F" },
  { fill: "#F3E8FF", stroke: "#9333EA", text: "#581C87" },
  { fill: "#FFE4E6", stroke: "#E11D48", text: "#881337" },
  { fill: "#CFFAFE", stroke: "#0891B2", text: "#164E63" },
  { fill: "#FEE2E2", stroke: "#DC2626", text: "#7F1D1D" },
  { fill: "#FFEDD5", stroke: "#EA580C", text: "#7C2D12" },
  { fill: "#F0FDF4", stroke: "#15803D", text: "#14532D" },
  { fill: "#EDE9FE", stroke: "#7C3AED", text: "#4C1D95" },
];

const FALLBACK_COLOR = {
  fill: colorStyled.surfaceContainerLow,
  stroke: colorStyled.outline,
  text: colorStyled.onSurfaceVariant,
};

function assignDomainColors(allNodes, allEdges) {
  const subclassEdges    = allEdges.filter((e) => e.style === "sub");
  const parentsByChildId = new Map(allNodes.map((n) => [n.id, []]));

  subclassEdges.forEach((e) => {
    const parents = parentsByChildId.get(e.s);
    if (parents) parents.push(e.t);
  });

  const childNodeIds = new Set(subclassEdges.map((e) => e.s));
  const domainRoots  = allNodes.filter(
    (n) => !isDataInstanceNode(n.id) && !childNodeIds.has(n.id)
  );

  const colorByRootId = new Map(
    domainRoots.map((rootNode, index) => [
      rootNode.id,
      DOMAIN_COLORS[index % DOMAIN_COLORS.length],
    ])
  );

  const cache = new Map();

  function findRoots(nodeId, visited = new Set()) {
    if (cache.has(nodeId))  return cache.get(nodeId);
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);

    if (colorByRootId.has(nodeId)) {
      cache.set(nodeId, [nodeId]);
      return [nodeId];
    }

    const roots = [...new Set(
      (parentsByChildId.get(nodeId) ?? []).flatMap(
        (parentId) => findRoots(parentId, new Set(visited))
      )
    )];
    cache.set(nodeId, roots);
    return roots;
  }

  const colorByNodeId = new Map();
  allNodes.forEach((n) => {
    const roots         = findRoots(n.id);
    const dominantRoot  = roots[0];
    colorByNodeId.set(
      n.id,
      dominantRoot ? (colorByRootId.get(dominantRoot) ?? FALLBACK_COLOR) : FALLBACK_COLOR
    );
  });

  return { colorByNodeId, domainRoots, colorByRootId };
}

// ─── Simulation constants ─────────────────────────────────────────────────────

const CHARGE_BY_ROLE   = { abstract: -400, tier: -320, class: -250, sub: -180, instance: -80 };
const RADIUS_BY_ROLE   = { abstract: 26, tier: 20, class: 15, sub: 11, instance: 6 };
const DISTANCE_BY_STYLE = { sub: 60, prop: 100, inst: 40 };
const ROLES_WITH_LABELS = new Set(["abstract", "tier", "class"]);

// ─── Debounce utility ─────────────────────────────────────────────────────────
// Delays execution until calls stop arriving for `delayMs` milliseconds.
// Used for the ResizeObserver so rapid container size changes do not
// trigger repeated simulation rebuilds.

function debounce(callbackFn, delayMs) {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callbackFn(...args), delayMs);
  };
}

// ─── OntologyForceTree ────────────────────────────────────────────────────────

const OntologyForceTree = memo(function OntologyForceTree({
  schema,
  selectedGroup,
  onNodeClick,
  onDomainChange
}) {
  const svgRef          = useRef(null);
  const simulationRef   = useRef(null);
  const nodeElementsRef = useRef(null);
  const linkElementsRef = useRef(null);

  // Store callbacks in refs so they never appear in useCallback dependency arrays.
  // This is the core fix for the layout-jumps-on-click problem.
  const onNodeClickRef  = useRef(onNodeClick);
  const onDomainChangeRef = useRef(onDomainChange);
  const selectedGroupRef = useRef(selectedGroup);

  useEffect(() => { onNodeClickRef.current   = onNodeClick;    }, [onNodeClick]);
  useEffect(() => { onDomainChangeRef.current = onDomainChange; }, [onDomainChange]);
  useEffect(() => { selectedGroupRef.current = selectedGroup;  }, [selectedGroup]);

  const [isSimulating,    setIsSimulating]    = useState(true);
  const [expandedNodeIds, setExpandedNodeIds] = useState(new Set());
  const [activeDomainId,  setActiveDomainId]  = useState(null);

  const surveyDomains = useMemo(
    () => (schema ? extractSurveyDomains(schema) : []),
    [schema]
  );

  const activeSchema = useMemo(() => {
    if (!schema) return null;
    if (!activeDomainId) return schema;
    const activeDomain = surveyDomains.find((d) => d.id === activeDomainId);
    return activeDomain
      ? filterSchemaByDomain(schema, activeDomain.memberNodeIds)
      : schema;
  }, [schema, activeDomainId, surveyDomains]);

  useEffect(() => {
    setExpandedNodeIds(new Set());
  }, [activeDomainId, schema]);

   const handleDomainChange = useCallback((newDomainId) => {
    setActiveDomainId(newDomainId);
    onDomainChangeRef.current?.(newDomainId);
  }, []);

  const handleBadgeClick = useCallback((nodeId) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  }, []);

  // ── Core simulation build ──────────────────────────────────────────────────
  // Stored in a ref so the ResizeObserver can call the latest version
  // without being listed as a useCallback dependency (which would cause
  // the ResizeObserver to reconnect on every schema change).

  const buildSimulationRef = useRef(null);

  const buildSimulation = useCallback(() => {
    const svgElement = svgRef.current;
    if (!svgElement || !activeSchema) return;

    const containerWidth  = svgElement.clientWidth;
    const containerHeight = svgElement.clientHeight;
    if (containerWidth === 0 || containerHeight === 0) return;

    // Stop the previous simulation BEFORE clearing the SVG.
    // Without this, a tick can fire on already-removed elements mid-clear.
    if (simulationRef.current) {
      simulationRef.current.stop();
      simulationRef.current = null;
    }

    nodeElementsRef.current = null;
    linkElementsRef.current = null;

    d3.select(svgElement).selectAll("*").remove();
    setIsSimulating(true);

    const { visibleNodes, visibleEdges, instanceCountByParentId } =
      buildFilteredSchema(activeSchema, expandedNodeIds);

    const { colorByNodeId } =
      assignDomainColors(activeSchema.nodes, activeSchema.edges);

    const simulationNodes = visibleNodes.map((schemaNode) => ({
      id:            schemaNode.id,
      label:         schemaNode.label,
      role:          schemaNode.role,
      radius:        RADIUS_BY_ROLE[schemaNode.role] ?? 8,
      charge:        CHARGE_BY_ROLE[schemaNode.role] ?? -100,
      domainColor:   colorByNodeId.get(schemaNode.id) ?? FALLBACK_COLOR,
      instanceCount: instanceCountByParentId.get(schemaNode.id) ?? 0,
      isExpanded:    expandedNodeIds.has(schemaNode.id),
      isInstance:    isDataInstanceNode(schemaNode.id),
    }));

    const nodeById = Object.fromEntries(simulationNodes.map((n) => [n.id, n]));

    const simulationLinks = visibleEdges
      .filter((e) => nodeById[e.s] && nodeById[e.t])
      .map((e) => ({
        source:   e.s,
        target:   e.t,
        style:    e.style,
        distance: DISTANCE_BY_STYLE[e.style] ?? 80,
      }));

    // ── SVG structure ──────────────────────────────────────────────────────

    const zoomGroup = d3
      .select(svgElement)
      .append("g")
      .attr("class", "zoom-root");

    d3.select(svgElement)
      .call(
        d3.zoom()
          .scaleExtent([0.05, 4])
          .on("zoom", (zoomEvent) => {
            zoomGroup.attr("transform", zoomEvent.transform);
          })
      )
      .on("click", (clickEvent) => {
        if (clickEvent.target === svgElement) {
          onNodeClickRef.current(null);
        }
      });

    // ── Links ──────────────────────────────────────────────────────────────

    const linkElements = zoomGroup
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(simulationLinks)
      .join("line")
      .attr("stroke",           colorStyled.outlineVariant)
      .attr("stroke-width",     (e) => e.style === "sub" ? 1.5 : 0.8)
      .attr("stroke-dasharray", (e) => e.style === "inst" ? "3,3" : "none")
      .attr("opacity",          (e) => e.style === "inst" ? 0.3 : 0.5);

    linkElementsRef.current = linkElements;

    // ── Nodes ──────────────────────────────────────────────────────────────

    const dragBehavior = d3.drag()
      .on("start", (dragEvent, draggedNode) => {
        if (!dragEvent.active) {
          simulationRef.current?.alphaTarget(0.1).restart();
        }
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;
      })
      .on("drag", (dragEvent, draggedNode) => {
        draggedNode.fx = dragEvent.x;
        draggedNode.fy = dragEvent.y;
      })
      .on("end", (dragEvent, draggedNode) => {
        if (!dragEvent.active) {
          simulationRef.current?.alphaTarget(0);
        }
        draggedNode.fx = draggedNode.x;
        draggedNode.fy = draggedNode.y;
      });

    const nodeElements = zoomGroup
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(simulationNodes)
      .join("g")
      .attr("cursor", "pointer")
      .call(dragBehavior)
      .on("click", (clickEvent, clickedNode) => {
        clickEvent.stopPropagation();
        onNodeClickRef.current(clickedNode);
      });

    nodeElementsRef.current = nodeElements;

    // Node body.
    nodeElements
      .append("circle")
      .attr("r",            (simNode) => simNode.radius)
      .attr("fill",         (simNode) => {
        const isSelected = simNode.label === selectedGroupRef.current;
        return isSelected ? simNode.domainColor.stroke : simNode.domainColor.fill;
      })
      .attr("stroke",       (simNode) => simNode.domainColor.stroke)
      .attr("stroke-width", (simNode) =>
        simNode.label === selectedGroupRef.current ? 3
          : simNode.isInstance ? 1 : 1.5
      )
      .attr("opacity", (simNode) => simNode.isInstance ? 0.8 : 1);

    // Selection ring.
    nodeElements
      .append("circle")
      .attr("class",            "selection-ring")
      .attr("r",                (simNode) => simNode.radius + 6)
      .attr("fill",             "none")
      .attr("stroke",           (simNode) => simNode.domainColor.stroke)
      .attr("stroke-width",     2)
      .attr("stroke-dasharray", "4,2")
      .attr("opacity",          0.6)
      .attr("display",          (simNode) =>
        simNode.label === selectedGroupRef.current ? null : "none"
      );

    // Expand badge.
    const badgeGroups = nodeElements.filter(
      (simNode) => simNode.instanceCount > 0 || simNode.isExpanded
    );

    badgeGroups
      .append("circle")
      .attr("cx",           (simNode) =>  simNode.radius * 0.75)
      .attr("cy",           (simNode) => -simNode.radius * 0.75)
      .attr("r",            9)
      .attr("fill",         (simNode) =>
        simNode.isExpanded ? colorStyled.primary : simNode.domainColor.stroke
      )
      .attr("stroke",       colorStyled.surfaceContainerLowest)
      .attr("stroke-width", 1.5)
      .attr("cursor",       "pointer")
      .on("click", (clickEvent, simNode) => {
        clickEvent.stopPropagation();
        handleBadgeClick(simNode.id);
      });

    badgeGroups
      .append("text")
      .attr("x",              (simNode) =>  simNode.radius * 0.75)
      .attr("y",              (simNode) => -simNode.radius * 0.75)
      .attr("dy",             "0.35em")
      .attr("text-anchor",    "middle")
      .attr("font-size",      7)
      .attr("font-weight",    700)
      .attr("fill",           colorStyled.onPrimary)
      .attr("pointer-events", "none")
      .text((simNode) => {
        if (simNode.isExpanded) return "−";
        return simNode.instanceCount > 99 ? "99+" : String(simNode.instanceCount);
      });

    // Node label.
    nodeElements
      .filter((simNode) => ROLES_WITH_LABELS.has(simNode.role))
      .append("text")
      .attr("dy",            "0.31em")
      .attr("x",             (simNode) => simNode.radius + 5)
      .attr("font-size",     (simNode) => simNode.role === "abstract" ? 11 : 9)
      .attr("font-weight",   (simNode) => simNode.role === "abstract" ? 700 : 500)
      .attr("fill",          (simNode) => simNode.domainColor.stroke)
      .attr("pointer-events","none")
      .text((simNode) => {
        const maxLength = simNode.role === "abstract" ? 22 : 18;
        return simNode.label.length > maxLength
          ? `${simNode.label.slice(0, maxLength - 1)}…`
          : simNode.label;
      });

    // Hover tooltip for instance nodes.
    nodeElements
      .filter((simNode) => simNode.isInstance)
      .append("title")
      .text((simNode) => simNode.label);

    // ── Simulation ─────────────────────────────────────────────────────────

    const simulation = d3
      .forceSimulation(simulationNodes)
      .alphaDecay(0.02)
      .alphaMin(0.001)
      .force("link",
        d3.forceLink(simulationLinks)
          .id((simNode) => simNode.id)
          .distance((simLink) => simLink.distance)
          .strength((simLink) => simLink.style === "inst" ? 0.5 : 0.8)
      )
      .force("charge",
        d3.forceManyBody()
          .strength((simNode) => simNode.charge)
      )
      .force("collision",
        d3.forceCollide()
          .radius((simNode) => simNode.radius + (simNode.isInstance ? 4 : 8))
          .strength(0.9)
      )
      .force("center",
        d3.forceCenter(containerWidth / 2, containerHeight / 2).strength(0.05)
      )
      .on("tick", () => {
        // Guard: simulation may tick after SVG is cleared on fast domain switches.
        if (!linkElementsRef.current || !nodeElementsRef.current) return;

        linkElementsRef.current
          .attr("stroke", (simLink) => {
            if (typeof simLink.source !== "object") return colorStyled.outlineVariant;
            return simLink.source.domainColor?.stroke ?? colorStyled.outlineVariant;
          })
          .attr("x1", (simLink) => simLink.source.x)
          .attr("y1", (simLink) => simLink.source.y)
          .attr("x2", (simLink) => simLink.target.x)
          .attr("y2", (simLink) => simLink.target.y);

        nodeElementsRef.current.attr("transform", (simNode) =>
          `translate(${simNode.x}, ${simNode.y})`
        );
      })
      .on("end", () => setIsSimulating(false));

    simulationRef.current = simulation;

  // Intentionally excludes selectedGroup (handled by direct D3 update)
  // and onNodeClick (accessed via ref).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSchema, expandedNodeIds, handleBadgeClick]);

  // Keep buildSimulationRef current so ResizeObserver always calls the latest version.
  useEffect(() => {
    buildSimulationRef.current = buildSimulation;
  }, [buildSimulation]);

  // ── Effect: run simulation when structure changes ──────────────────────────
  useEffect(() => {
    buildSimulation();
    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
        simulationRef.current = null;
      }
    };
  }, [buildSimulation]);

  // ── Effect: update selection visuals without touching simulation ───────────
  // Runs when selectedGroup changes. Patches D3 attributes directly.
  useEffect(() => {
    if (!nodeElementsRef.current) return;

    nodeElementsRef.current
      .select("circle:first-child")
      .attr("fill", (simNode) => {
        const isSelected = simNode.label === selectedGroup;
        return isSelected ? simNode.domainColor.stroke : simNode.domainColor.fill;
      })
      .attr("stroke-width", (simNode) =>
        simNode.label === selectedGroup ? 3
          : simNode.isInstance ? 1 : 1.5
      );

    nodeElementsRef.current
      .select(".selection-ring")
      .attr("display", (simNode) =>
        simNode.label === selectedGroup ? null : "none"
      );
  }, [selectedGroup]);

  // ── Effect: ResizeObserver — debounced, uses ref to avoid dependency loop ──
  // The ResizeObserver is set up ONCE and never reconnected.
  // It calls buildSimulationRef.current so it always gets the latest
  // buildSimulation without being listed as a dependency.
  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    let lastWidth  = svgElement.clientWidth;
    let lastHeight = svgElement.clientHeight;

    const handleResize = debounce(() => {
      const newWidth  = svgElement.clientWidth;
      const newHeight = svgElement.clientHeight;

      // Only rebuild if the size actually changed.
      // This prevents the loop: build → DOM change → resize event → build → ...
      if (newWidth === lastWidth && newHeight === lastHeight) return;

      lastWidth  = newWidth;
      lastHeight = newHeight;

      if (simulationRef.current) {
        simulationRef.current.stop();
      }
      buildSimulationRef.current();
    }, 150);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(svgElement);

    return () => {
      resizeObserver.disconnect();
    };
    // Empty dependency array: set up once, never reconnected.
    // Uses refs to access latest values.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const visibleStructural = activeSchema
    ? activeSchema.nodes.filter((n) => !isDataInstanceNode(n.id)).length
    : 0;
  const totalNodeCount = schema?.nodes?.length ?? 0;

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative", bgcolor: colorStyled.background }}>
      <DomainFilterBar
        domains={surveyDomains}
        activeDomainId={activeDomainId}
        onDomainChange={handleDomainChange}
      />
      {isSimulating && <SimulatingIndicator />}
      <LayoutStatusBar
        structuralNodeCount={visibleStructural}
        totalNodeCount={totalNodeCount}
        expandedCount={expandedNodeIds.size}
      />
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
});

export default OntologyForceTree;

// ─── DomainFilterBar ──────────────────────────────────────────────────────────

function DomainFilterBar({ domains, activeDomainId, onDomainChange }) {
  if (domains.length === 0) return null;

  return (
    <Box
      sx={{
        position:  "absolute",
        top:       12,
        left:      "50%",
        transform: "translateX(-50%)",
        zIndex:    10,
        display:   "flex",
        gap:       0.75,
        // Backdrop so chips are readable over the graph.
        bgcolor:        `${colorStyled.surfaceContainerLowest}CC`,
        backdropFilter: "blur(8px)",
        borderRadius:   3,
        px:             1,
        py:             0.5,
        border:         `1px solid ${colorStyled.outlineVariant}`,
      }}
    >
      {/* "All" chip */}
      <DomainChip
        label="All"
        isActive={activeDomainId === null}
        onClick={() => onDomainChange(null)}
      />
      {domains.map((domain) => (
        <DomainChip
          key={domain.id}
          label={`${domain.label} · ${domain.memberCount} classes`}
          isActive={activeDomainId === domain.id}
          onClick={() =>
            onDomainChange(activeDomainId === domain.id ? null : domain.id)
          }
        />
      ))}
    </Box>
  );
}

function DomainChip({ label, isActive, onClick }) {
  return (
    <Chip
      label={label}
      size="small"
      onClick={onClick}
      sx={{
        fontSize:   9,
        fontWeight: 700,
        cursor:     "pointer",
        height:     22,
        bgcolor:    isActive ? colorStyled.primary : "transparent",
        color:      isActive ? colorStyled.onPrimary : colorStyled.onSurfaceVariant,
        border:     `1px solid ${isActive ? colorStyled.primary : colorStyled.outlineVariant}`,
        "&:hover": {
          bgcolor: isActive ? colorStyled.primary : colorStyled.surfaceContainerHigh,
        },
      }}
    />
  );
}

// ─── LayoutStatusBar ──────────────────────────────────────────────────────────

function LayoutStatusBar({ structuralNodeCount, totalNodeCount, expandedCount }) {
  const collapsedCount = totalNodeCount - structuralNodeCount;
  return (
    <Box
      sx={{
        position: "absolute",
        bottom:   12,
        left:     14,
        zIndex:   10,
      }}
    >
      <Typography sx={{ fontSize: 9, color: colorStyled.outline }}>
        {structuralNodeCount} classes shown
        {collapsedCount > 0 && ` · ${collapsedCount} instances hidden`}
        {expandedCount > 0  && ` · ${expandedCount} expanded`}
        {" · click badge to expand · drag to pin · scroll to zoom"}
      </Typography>
    </Box>
  );
}

// ─── SimulatingIndicator ──────────────────────────────────────────────────────

function SimulatingIndicator() {
  return (
    <Box
      sx={{
        position:   "absolute",
        bottom:     12,
        right:      14,
        zIndex:     10,
        display:    "flex",
        alignItems: "center",
        gap:        1,
      }}
    >
      <CircularProgress size={10} thickness={5} sx={{ color: colorStyled.outline }} />
      <Typography sx={{ fontSize: 9, color: colorStyled.outline }}>
        Settling…
      </Typography>
    </Box>
  );
}