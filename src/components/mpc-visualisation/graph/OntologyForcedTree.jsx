import { useEffect, useRef, useCallback, memo, useState, useMemo } from 'react';
import { Box, Typography, CircularProgress, Chip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import * as d3 from 'd3';
import { domainColors, useThemePalette } from '../config/theme';
import { extractSurveyDomains, filterSchemaByDomain } from '../data/parseTtl';
import { NavChip } from '../shared';
import { GraphHelpPopover } from '../shared/GraphHelpPopover';

// ─── Instance node detection ──────────────────────────────────────────────────

const INSTANCE_ID_PREFIXES = [
    'assumption_',
    'tech_assumption_',
    'FutureDemand_',
    'CurrentDemand_',
    'AutonomousDrivingDevelopment_OEM_',
    'AutonomousDrivingDevelopment_Tier1_',
    'InventoryTrend_Aggregated_',
    'InventoryTarget_Aggregated_',
    'OrderCancellation_Aggregated_',
    'SemiconductorShortage_Aggregated_',
    'OEMCurrentDemand_',
    'OEMFutureDemand_',
    'SemiCurrentDemand_',
    'SemiFutureDemand_',
    'Tier1CurrentDemand_',
    'Tier1FutureDemand_',
    'FutureRegionalDemand_',
    'CurrentRegionalDemand_',
    'ConvFactor_',
    'AggregatedTrend_'
];

function isDataInstanceNode(nodeId) {
    return INSTANCE_ID_PREFIXES.some(prefix => nodeId.includes(prefix));
}

// ─── Schema filtering ─────────────────────────────────────────────────────────

function buildFilteredSchema(schema, expandedNodeIds) {
    const structuralNodes = schema.nodes.filter(n => !isDataInstanceNode(n.id));
    const structuralNodeIds = new Set(structuralNodes.map(n => n.id));

    const visibleInstanceNodes = schema.nodes.filter(schemaNode => {
        if (!isDataInstanceNode(schemaNode.id)) return false;
        return schema.edges.some(
            schemaEdge => expandedNodeIds.has(schemaEdge.s) && schemaEdge.t === schemaNode.id && structuralNodeIds.has(schemaEdge.s)
        );
    });

    const visibleInstanceIds = new Set(visibleInstanceNodes.map(n => n.id));
    const allVisibleNodeIds = new Set([...structuralNodeIds, ...visibleInstanceIds]);

    const visibleEdges = schema.edges.filter(e => allVisibleNodeIds.has(e.s) && allVisibleNodeIds.has(e.t));

    const instanceCountByParentId = new Map();
    schema.edges.forEach(schemaEdge => {
        if (structuralNodeIds.has(schemaEdge.s) && isDataInstanceNode(schemaEdge.t) && !visibleInstanceIds.has(schemaEdge.t)) {
            instanceCountByParentId.set(schemaEdge.s, (instanceCountByParentId.get(schemaEdge.s) ?? 0) + 1);
        }
    });

    return {
        visibleNodes: [...structuralNodes, ...visibleInstanceNodes],
        visibleEdges,
        instanceCountByParentId
    };
}

function makeFallbackColor(c) {
    return { fill: c.surfaceContainerLow, stroke: c.outline, text: c.onSurfaceVariant };
}

function assignDomainColors(allNodes, allEdges, fallbackColor) {
    const subclassEdges = allEdges.filter(e => e.style === 'sub');
    const parentsByChildId = new Map(allNodes.map(n => [n.id, []]));

    subclassEdges.forEach(e => {
        const parents = parentsByChildId.get(e.s);
        if (parents) parents.push(e.t);
    });

    const childNodeIds = new Set(subclassEdges.map(e => e.s));
    const domainRoots = allNodes.filter(n => !isDataInstanceNode(n.id) && !childNodeIds.has(n.id));

    const colorByRootId = new Map(domainRoots.map((rootNode, index) => [rootNode.id, domainColors[index % domainColors.length]]));

    const cache = new Map();

    function findRoots(nodeId, visited = new Set()) {
        if (cache.has(nodeId)) return cache.get(nodeId);
        if (visited.has(nodeId)) return [];
        visited.add(nodeId);

        if (colorByRootId.has(nodeId)) {
            cache.set(nodeId, [nodeId]);
            return [nodeId];
        }

        const roots = [...new Set((parentsByChildId.get(nodeId) ?? []).flatMap(parentId => findRoots(parentId, new Set(visited))))];
        cache.set(nodeId, roots);
        return roots;
    }

    const colorByNodeId = new Map();
    allNodes.forEach(n => {
        const roots = findRoots(n.id);
        const dominantRoot = roots[0];
        colorByNodeId.set(n.id, dominantRoot ? colorByRootId.get(dominantRoot) ?? fallbackColor : fallbackColor);
    });

    return { colorByNodeId, domainRoots, colorByRootId };
}

// ─── Simulation constants ─────────────────────────────────────────────────────

const CHARGE_BY_ROLE = { abstract: -400, tier: -320, class: -250, sub: -180, instance: -80 };
const RADIUS_BY_ROLE = { abstract: 26, tier: 20, class: 15, sub: 11, instance: 6 };
const DISTANCE_BY_STYLE = { sub: 60, prop: 100, inst: 40 };
const ROLES_WITH_LABELS = new Set(['abstract', 'tier', 'class']);

// ─── Shared helpers ───────────────────────────────────────────────────────────

// Builds a simulation node object from a schema node. Used in both
// buildSimulation and the expandedNodeIds incremental-update effect.
function makeSimNode(schemaNode, { colorByNodeId, fallbackColor, instanceCountByParentId, expandedIds }) {
    return {
        id: schemaNode.id,
        label: schemaNode.label,
        role: schemaNode.role,
        radius: RADIUS_BY_ROLE[schemaNode.role] ?? 8,
        charge: CHARGE_BY_ROLE[schemaNode.role] ?? -100,
        domainColor: colorByNodeId.get(schemaNode.id) ?? fallbackColor,
        instanceCount: instanceCountByParentId.get(schemaNode.id) ?? 0,
        isExpanded: expandedIds.has(schemaNode.id),
        isInstance: isDataInstanceNode(schemaNode.id)
    };
}

// Applies the standard stroke/width/dash/opacity attributes to a D3 link
// selection. Used identically in buildSimulation and the expansion update.
function applyLinkAttrs(selection, colorStyledRef) {
    return selection
        .attr('stroke', colorStyledRef.current.outlineVariant ?? '#c7d0d4')
        .attr('stroke-width', e => (e.style === 'sub' ? 1.5 : 0.8))
        .attr('stroke-dasharray', e => (e.style === 'inst' ? '3,3' : 'none'))
        .attr('opacity', e => (e.style === 'inst' ? 0.3 : 0.5));
}

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

const OntologyForceTree = memo(function OntologyForceTree({ schema, selectedGroup, onNodeClick, onDomainChange }) {
    const { colorStyled } = useThemePalette();

    const svgRef = useRef(null);
    const simulationRef = useRef(null);
    const nodeElementsRef = useRef(null);
    const linkElementsRef = useRef(null);

    // Store callbacks and frequently-changing values in refs so they never
    // appear in useCallback dependency arrays and never trigger simulation rebuilds.
    const onNodeClickRef = useRef(onNodeClick);
    const onDomainChangeRef = useRef(onDomainChange);
    const selectedGroupRef = useRef(selectedGroup);
    const colorStyledRef = useRef(colorStyled);

    useEffect(() => {
        onNodeClickRef.current = onNodeClick;
    }, [onNodeClick]);
    useEffect(() => {
        onDomainChangeRef.current = onDomainChange;
    }, [onDomainChange]);
    useEffect(() => {
        selectedGroupRef.current = selectedGroup;
    }, [selectedGroup]);
    useEffect(() => {
        colorStyledRef.current = colorStyled;
    }, [colorStyled]);

    const [isSimulating, setIsSimulating] = useState(true);
    const [expandedNodeIds, setExpandedNodeIds] = useState(new Set());
    const [activeDomainId, setActiveDomainId] = useState(null);
    const [simulationNodeCount, setSimulationNodeCount] = useState(0);
    const [hiddenInstanceCount, setHiddenInstanceCount] = useState(0);

    const surveyDomains = useMemo(() => (schema ? extractSurveyDomains(schema) : []), [schema]);

    const activeSchema = useMemo(() => {
        if (!schema) return null;
        if (!activeDomainId) return schema;
        const activeDomain = surveyDomains.find(d => d.id === activeDomainId);
        return activeDomain ? filterSchemaByDomain(schema, activeDomain.memberNodeIds) : schema;
    }, [schema, activeDomainId, surveyDomains]);

    useEffect(() => {
        setExpandedNodeIds(new Set());
    }, [activeDomainId, schema]);

    const handleDomainChange = useCallback(newDomainId => {
        setActiveDomainId(newDomainId);
        onDomainChangeRef.current?.(newDomainId);
    }, []);

    const handleBadgeClick = useCallback(nodeId => {
        setExpandedNodeIds(prev => {
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
    // expandedNodeIds is accessed via ref to avoid restarting the simulation
    // when a badge is clicked — expansion is handled by updateSimulationNodes.

    const buildSimulationRef = useRef(null);
    const expandedNodeIdsRef = useRef(expandedNodeIds);
    useEffect(() => {
        expandedNodeIdsRef.current = expandedNodeIds;
    }, [expandedNodeIds]);

    const buildSimulation = useCallback(() => {
        const svgElement = svgRef.current;
        if (!svgElement || !activeSchema) return;

        const containerWidth = svgElement.clientWidth;
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

        d3.select(svgElement)
            .selectAll('*')
            .remove();
        setIsSimulating(true);

        const { visibleNodes, visibleEdges, instanceCountByParentId } = buildFilteredSchema(activeSchema, expandedNodeIdsRef.current);

        const fallbackColor = makeFallbackColor(colorStyled);
        const { colorByNodeId } = assignDomainColors(activeSchema.nodes, activeSchema.edges, fallbackColor);

        const simNodeArgs = { colorByNodeId, fallbackColor, instanceCountByParentId, expandedIds: expandedNodeIdsRef.current };
        const simulationNodes = visibleNodes.map(sn => makeSimNode(sn, simNodeArgs));

        // Track the actual number of structural nodes and total hidden instances
        // so the status bar shows counts that match what is on screen.
        const structuralCount = simulationNodes.filter(n => !n.isInstance).length;
        const hiddenCount = [...instanceCountByParentId.values()].reduce((sum, c) => sum + c, 0);
        setSimulationNodeCount(structuralCount);
        setHiddenInstanceCount(hiddenCount);

        const nodeById = Object.fromEntries(simulationNodes.map(n => [n.id, n]));

        const simulationLinks = visibleEdges
            .filter(e => nodeById[e.s] && nodeById[e.t])
            .map(e => ({
                source: e.s,
                target: e.t,
                style: e.style,
                distance: DISTANCE_BY_STYLE[e.style] ?? 80
            }));

        // ── SVG structure ──────────────────────────────────────────────────────

        const zoomGroup = d3
            .select(svgElement)
            .append('g')
            .attr('class', 'zoom-root');

        d3.select(svgElement)
            .call(
                d3
                    .zoom()
                    .scaleExtent([0.05, 4])
                    .on('zoom', zoomEvent => {
                        zoomGroup.attr('transform', zoomEvent.transform);
                    })
            )
            .on('click', clickEvent => {
                if (clickEvent.target === svgElement) {
                    onNodeClickRef.current(null);
                }
            });

        // ── Links ──────────────────────────────────────────────────────────────

        const linkElements = applyLinkAttrs(
            zoomGroup
                .append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(simulationLinks)
                .join('line'),
            colorStyledRef
        );

        linkElementsRef.current = linkElements;

        // ── Nodes ──────────────────────────────────────────────────────────────

        const dragBehavior = d3
            .drag()
            .on('start', (dragEvent, draggedNode) => {
                if (!dragEvent.active) {
                    simulationRef.current?.alphaTarget(0.1).restart();
                }
                draggedNode.fx = draggedNode.x;
                draggedNode.fy = draggedNode.y;
            })
            .on('drag', (dragEvent, draggedNode) => {
                draggedNode.fx = dragEvent.x;
                draggedNode.fy = dragEvent.y;
            })
            .on('end', (dragEvent, draggedNode) => {
                if (!dragEvent.active) {
                    simulationRef.current?.alphaTarget(0);
                }
                draggedNode.fx = draggedNode.x;
                draggedNode.fy = draggedNode.y;
            });

        const nodeElements = zoomGroup
            .append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(simulationNodes)
            .join('g')
            .attr('cursor', 'pointer')
            .call(dragBehavior)
            .on('click', (clickEvent, clickedNode) => {
                clickEvent.stopPropagation();
                onNodeClickRef.current(clickedNode);
            });

        nodeElementsRef.current = nodeElements;

        // Node body.
        nodeElements
            .append('circle')
            .attr('r', simNode => simNode.radius)
            .attr('fill', simNode => {
                const isSelected = simNode.label === selectedGroupRef.current;
                return isSelected ? simNode.domainColor.stroke : simNode.domainColor.fill;
            })
            .attr('stroke', simNode => simNode.domainColor.stroke)
            .attr('stroke-width', simNode => {
                if (simNode.label === selectedGroupRef.current) {
                    return 3;
                } else if (simNode.isInstance) {
                    return 1;
                } else {
                    return 1.5;
                }
            })
            .attr('opacity', simNode => (simNode.isInstance ? 0.8 : 1));

        // Selection ring.
        nodeElements
            .append('circle')
            .attr('class', 'selection-ring')
            .attr('r', simNode => simNode.radius + 6)
            .attr('fill', 'none')
            .attr('stroke', simNode => simNode.domainColor.stroke)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,2')
            .attr('opacity', 0.6)
            .attr('display', simNode => (simNode.label === selectedGroupRef.current ? null : 'none'));

        // Expand badge.
        const badgeGroups = nodeElements.filter(simNode => simNode.instanceCount > 0 || simNode.isExpanded);

        badgeGroups
            .append('circle')
            .attr('cx', simNode => simNode.radius * 0.75)
            .attr('cy', simNode => -simNode.radius * 0.75)
            .attr('r', 9)
            .attr('fill', simNode => (simNode.isExpanded ? colorStyledRef.current.primary : simNode.domainColor.stroke))
            .attr('stroke', colorStyledRef.current.surfaceContainerLowest)
            .attr('stroke-width', 1.5)
            .attr('cursor', 'pointer')
            .on('click', (clickEvent, simNode) => {
                clickEvent.stopPropagation();
                handleBadgeClick(simNode.id);
            });

        badgeGroups
            .append('text')
            .attr('x', simNode => simNode.radius * 0.75)
            .attr('y', simNode => -simNode.radius * 0.75)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .attr('font-size', 7)
            .attr('font-weight', 700)
            .attr('fill', colorStyledRef.current.onPrimary)
            .attr('pointer-events', 'none')
            .text(simNode => {
                if (simNode.isExpanded) return '−';
                return simNode.instanceCount > 99 ? '99+' : String(simNode.instanceCount);
            });

        // Node label.
        nodeElements
            .filter(simNode => ROLES_WITH_LABELS.has(simNode.role))
            .append('text')
            .attr('dy', '0.31em')
            .attr('x', simNode => simNode.radius + 5)
            .attr('font-size', simNode => (simNode.role === 'abstract' ? 11 : 9))
            .attr('font-weight', simNode => (simNode.role === 'abstract' ? 700 : 500))
            .attr('fill', simNode => simNode.domainColor.stroke)
            .attr('pointer-events', 'none')
            .text(simNode => {
                const maxLength = simNode.role === 'abstract' ? 22 : 18;
                return simNode.label.length > maxLength ? `${simNode.label.slice(0, maxLength - 1)}…` : simNode.label;
            });

        // Hover tooltip for instance nodes.
        nodeElements
            .filter(simNode => simNode.isInstance)
            .append('title')
            .text(simNode => simNode.label);

        // ── Simulation ─────────────────────────────────────────────────────────

        const simulation = d3
            .forceSimulation(simulationNodes)
            .alphaDecay(0.02)
            .alphaMin(0.001)
            .force(
                'link',
                d3
                    .forceLink(simulationLinks)
                    .id(simNode => simNode.id)
                    .distance(simLink => simLink.distance)
                    .strength(simLink => (simLink.style === 'inst' ? 0.5 : 0.8))
            )
            .force(
                'charge',
                d3.forceManyBody().strength(simNode => simNode.charge)
            )
            .force(
                'collision',
                d3
                    .forceCollide()
                    .radius(simNode => simNode.radius + (simNode.isInstance ? 4 : 8))
                    .strength(0.9)
            )
            .force('center', d3.forceCenter(containerWidth / 2, containerHeight / 2).strength(0.05))
            .on('tick', () => {
                // Guard: simulation may tick after SVG is cleared on fast domain switches.
                if (!linkElementsRef.current || !nodeElementsRef.current) return;

                linkElementsRef.current
                    .attr('stroke', simLink => {
                        if (typeof simLink.source !== 'object') return colorStyledRef.current.outlineVariant ?? '#c7d0d4';
                        return simLink.source.domainColor?.stroke ?? colorStyledRef.current.outlineVariant ?? '#c7d0d4';
                    })
                    .attr('x1', simLink => simLink.source.x)
                    .attr('y1', simLink => simLink.source.y)
                    .attr('x2', simLink => simLink.target.x)
                    .attr('y2', simLink => simLink.target.y);

                nodeElementsRef.current.attr('transform', simNode => `translate(${simNode.x}, ${simNode.y})`);
            })
            .on('end', () => setIsSimulating(false));

        simulationRef.current = simulation;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSchema, handleBadgeClick]);

    // Keep buildSimulationRef current so ResizeObserver always calls the latest version.
    useEffect(() => {
        buildSimulationRef.current = buildSimulation;
    }, [buildSimulation]);

    // ── Effect: run simulation when schema/domain changes ─────────────────────
    useEffect(() => {
        buildSimulation();
        return () => {
            if (simulationRef.current) {
                simulationRef.current.stop();
                simulationRef.current = null;
            }
        };
    }, [buildSimulation]);

    // ── Effect: update nodes in-place when expansion changes ──────────────────
    // Does NOT rebuild the SVG — preserves all existing node positions.
    // New instance nodes are spawned near their parent to avoid flying in from
    // random positions.
    useEffect(() => {
        const sim = simulationRef.current;
        const svgElement = svgRef.current;
        if (!sim || !svgElement || !activeSchema) return;

        const { visibleNodes, visibleEdges, instanceCountByParentId } = buildFilteredSchema(activeSchema, expandedNodeIds);

        const fallbackColor = makeFallbackColor(colorStyledRef.current);
        const { colorByNodeId } = assignDomainColors(activeSchema.nodes, activeSchema.edges, fallbackColor);

        // Get current node positions from the running simulation so we can
        // preserve them for nodes that already exist.
        const existingById = Object.fromEntries((sim.nodes() ?? []).map(n => [n.id, n]));

        const simNodeArgs = { colorByNodeId, fallbackColor, instanceCountByParentId, expandedIds: expandedNodeIds };
        const newSimNodes = visibleNodes.map(schemaNode => {
            const existing = existingById[schemaNode.id];
            const node = makeSimNode(schemaNode, simNodeArgs);
            if (existing) {
                // Preserve position and velocity so the node stays put
                node.x = existing.x;
                node.y = existing.y;
                node.vx = existing.vx ?? 0;
                node.vy = existing.vy ?? 0;
                node.fx = existing.fx ?? null;
                node.fy = existing.fy ?? null;
            } else {
                // New instance node: spawn near its parent to avoid flying in from afar
                const parentEdge = visibleEdges.find(e => e.t === schemaNode.id && existingById[e.s]);
                const parent = parentEdge ? existingById[parentEdge.s] : null;
                const jitter = 20;
                node.x = parent ? parent.x + (Math.random() - 0.5) * jitter : undefined;
                node.y = parent ? parent.y + (Math.random() - 0.5) * jitter : undefined;
            }
            return node;
        });

        const nodeById = Object.fromEntries(newSimNodes.map(n => [n.id, n]));
        const newLinks = visibleEdges
            .filter(e => nodeById[e.s] && nodeById[e.t])
            .map(e => ({ source: e.s, target: e.t, style: e.style, distance: DISTANCE_BY_STYLE[e.style] ?? 80 }));

        // Update status bar counts
        const structuralCount = newSimNodes.filter(n => !n.isInstance).length;
        const hiddenCount = [...instanceCountByParentId.values()].reduce((s, c) => s + c, 0);
        setSimulationNodeCount(structuralCount);
        setHiddenInstanceCount(hiddenCount);

        // Rebuild D3 DOM elements and update the running simulation
        const zoomGroup = d3.select(svgElement).select('g.zoom-root');
        if (zoomGroup.empty()) {
            // SVG not yet built — let buildSimulation handle it
            buildSimulation();
            return;
        }

        // Update link elements
        const linkGroup = zoomGroup.select('g.links');
        const newLinkEls = linkGroup.selectAll('line').data(newLinks, d => `${d.source}-${d.target}`);
        newLinkEls.exit().remove();
        applyLinkAttrs(newLinkEls.enter().append('line'), colorStyledRef);
        linkElementsRef.current = linkGroup.selectAll('line');

        // Update node elements — only add new ones, remove departed ones
        const nodeGroup = zoomGroup.select('g.nodes');
        const newNodeEls = nodeGroup.selectAll('g').data(newSimNodes, d => d.id);
        newNodeEls.exit().remove();

        // For newly added nodes, append the full circle + label structure
        const enteredNodes = newNodeEls
            .enter()
            .append('g')
            .attr('cursor', 'pointer');

        enteredNodes
            .append('circle')
            .attr('r', n => n.radius)
            .attr('fill', n => n.domainColor.fill)
            .attr('stroke', n => n.domainColor.stroke)
            .attr('stroke-width', n => (n.isInstance ? 1 : 1.5))
            .attr('opacity', n => (n.isInstance ? 0.8 : 1));

        enteredNodes
            .append('circle')
            .attr('class', 'selection-ring')
            .attr('r', n => n.radius + 6)
            .attr('fill', 'none')
            .attr('stroke', n => n.domainColor.stroke)
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '4,2')
            .attr('opacity', 0.6)
            .attr('display', 'none');

        enteredNodes
            .filter(n => !n.isInstance)
            .append('text')
            .attr('dy', '0.31em')
            .attr('x', n => n.radius + 5)
            .attr('font-size', n => (n.role === 'abstract' ? 11 : 9))
            .attr('font-weight', n => (n.role === 'abstract' ? 700 : 500))
            .attr('fill', n => n.domainColor.stroke)
            .attr('pointer-events', 'none')
            .text(n => {
                const max = n.role === 'abstract' ? 22 : 18;
                return n.label.length > max ? `${n.label.slice(0, max - 1)}…` : n.label;
            });

        enteredNodes
            .filter(n => n.isInstance)
            .append('title')
            .text(n => n.label);

        // Re-attach drag and click to all nodes (entered + existing)
        const dragBehavior = d3
            .drag()
            .on('start', (ev, n) => {
                if (!ev.active) sim.alphaTarget(0.1).restart();
                n.fx = n.x;
                n.fy = n.y;
            })
            .on('drag', (ev, n) => {
                n.fx = ev.x;
                n.fy = ev.y;
            })
            .on('end', (ev, n) => {
                if (!ev.active) sim.alphaTarget(0);
                n.fx = n.x;
                n.fy = n.y;
            });

        nodeElementsRef.current = nodeGroup
            .selectAll('g')
            .call(dragBehavior)
            .on('click', (ev, n) => {
                ev.stopPropagation();
                onNodeClickRef.current(n);
            });

        // Patch badge counts on existing nodes that changed
        nodeElementsRef.current.each(function(n) {
            const existing2 = existingById[n.id];
            if (existing2 && existing2.instanceCount !== n.instanceCount) {
                d3.select(this)
                    .select('text.badge-text')
                    .text(() => {
                        if (n.isExpanded) return '−';
                        return n.instanceCount > 99 ? '99+' : String(n.instanceCount);
                    });
            }
        });

        // Update forceLink with new nodes/links and give a gentle nudge
        sim.nodes(newSimNodes);
        sim.force('link').links(newLinks);
        // Low alpha restart so new nodes settle gently without throwing existing ones
        sim.alpha(0.15).restart();
        setIsSimulating(true);

        // expandedNodeIds is the only trigger — activeSchema changes go through buildSimulation
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expandedNodeIds]);

    // Selected nodes get a thick outline; instance nodes get a slightly
    // thinner default outline than aggregate nodes.
    function getStrokeWidth(simNode, selectedGroup) {
        if (simNode.label === selectedGroup) return 3;
        return simNode.isInstance ? 1 : 1.5;
    }

    // ── Effect: update selection visuals without touching simulation ───────────
    // Runs when selectedGroup changes. Patches D3 attributes directly.
    useEffect(() => {
        if (!nodeElementsRef.current) return;

        nodeElementsRef.current
            .select('circle:first-child')
            .attr('fill', simNode => {
                const isSelected = simNode.label === selectedGroup;
                return isSelected ? simNode.domainColor.stroke : simNode.domainColor.fill;
            })
            .attr('stroke-width', simNode => getStrokeWidth(simNode, selectedGroup));

        nodeElementsRef.current.select('.selection-ring').attr('display', simNode => (simNode.label === selectedGroup ? null : 'none'));
    }, [selectedGroup]);

    // ── Effect: ResizeObserver — debounced, uses ref to avoid dependency loop ──
    // The ResizeObserver is set up ONCE and never reconnected.
    // It calls buildSimulationRef.current so it always gets the latest
    // buildSimulation without being listed as a dependency.
    useEffect(() => {
        const svgElement = svgRef.current;
        if (!svgElement) return;

        let lastWidth = svgElement.clientWidth;
        let lastHeight = svgElement.clientHeight;

        const handleResize = debounce(() => {
            const newWidth = svgElement.clientWidth;
            const newHeight = svgElement.clientHeight;

            // Only rebuild if the size actually changed.
            // This prevents the loop: build → DOM change → resize event → build → ...
            if (newWidth === lastWidth && newHeight === lastHeight) return;

            lastWidth = newWidth;
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

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative', bgcolor: colorStyled.background }}>
            <DomainFilterBar domains={surveyDomains} activeDomainId={activeDomainId} onDomainChange={handleDomainChange} />
            {isSimulating && <SimulatingIndicator />}
            <LayoutStatusBar
                structuralNodeCount={simulationNodeCount}
                hiddenInstanceCount={hiddenInstanceCount}
                expandedCount={expandedNodeIds.size}
            />
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
        </Box>
    );
});

export default OntologyForceTree;

// ─── DomainFilterBar ──────────────────────────────────────────────────────────

function DomainFilterBar({ domains, activeDomainId, onDomainChange }) {
    const { colorStyled: c } = useThemePalette();
    const [helpAnchor, setHelpAnchor] = useState(null);

    if (domains.length === 0) return null;

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                display: 'flex',
                gap: 0.75,
                alignItems: 'center',
                bgcolor: `${c.surfaceContainerLowest}CC`,
                backdropFilter: 'blur(8px)',
                borderRadius: 3,
                px: 1,
                py: 0.5,
                border: `1px solid ${c.outlineVariant}`
            }}
        >
            <NavChip label="All" isActive={activeDomainId === null} onClick={() => onDomainChange(null)} />
            {domains.map(domain => (
                <NavChip
                    key={domain.id}
                    label={domain.label}
                    isActive={activeDomainId === domain.id}
                    onClick={() => onDomainChange(activeDomainId === domain.id ? null : domain.id)}
                />
            ))}

            {/* Divider */}
            <Box sx={{ width: '1px', height: 14, bgcolor: c.outlineVariant, mx: 0.25 }} />

            {/* Help button */}
            <Chip
                icon={<HelpOutlineIcon sx={{ fontSize: '13px !important' }} />}
                label="How to use"
                size="small"
                onClick={e => setHelpAnchor(e.currentTarget)}
                sx={{
                    fontSize: 9,
                    fontWeight: 600,
                    height: 22,
                    cursor: 'pointer',
                    bgcolor: 'transparent',
                    color: c.onSurfaceVariant,
                    border: `1px solid ${c.outlineVariant}`,
                    '&:hover': { bgcolor: c.surfaceContainerHigh }
                }}
            />

            <GraphHelpPopover anchor={helpAnchor} onClose={() => setHelpAnchor(null)} title="Force Graph — How to use" items={FORCE_HELP_ITEMS} />
        </Box>
    );
}

const FORCE_HELP_ITEMS = [
    {
        key: 'expand-hidden-instances',
        icon: <TouchAppIcon fontSize="small" />,
        primary: 'Expand hidden instances',
        secondary: 'Nodes with a numbered badge have hidden data instances. Click the badge to reveal them next to the node.'
    },
    {
        key: 'filter-survey-domain',
        icon: <FilterAltIcon fontSize="small" />,
        primary: 'Filter by survey domain',
        secondary: 'Use the domain chips above (OEM Survey, Semiconductor, Tier 1) to show only nodes belonging to that survey.'
    },
    {
        key: 'click-node',
        icon: <TouchAppIcon fontSize="small" />,
        primary: 'Click a node',
        secondary: 'Clicking a node selects it in the dashboard. Clickable (pill-shaped) nodes filter the charts.'
    },
    {
        key: 'drag-to-pin',
        icon: <OpenWithIcon fontSize="small" />,
        primary: 'Drag to pin',
        secondary: 'Drag any node to move and fix it in place. The rest of the graph continues to settle around it.'
    },
    {
        key: 'scroll-to-zoom',
        icon: <ZoomInIcon fontSize="small" />,
        primary: 'Scroll to zoom',
        secondary: 'Use the mouse wheel to zoom in and out. Click and drag the background to pan.'
    }
];

function LayoutStatusBar({ structuralNodeCount, hiddenInstanceCount, expandedCount }) {
    const { colorStyled: c } = useThemePalette();
    return (
        <Box sx={{ position: 'absolute', bottom: 12, left: 14, zIndex: 10 }}>
            <Typography sx={{ fontSize: 9, color: c.outline }}>
                {structuralNodeCount} classes shown
                {hiddenInstanceCount > 0 && ` · ${hiddenInstanceCount} instances hidden`}
                {expandedCount > 0 && ` · ${expandedCount} expanded`}
                {' · click badge to expand · drag to pin · scroll to zoom'}
            </Typography>
        </Box>
    );
}

function SimulatingIndicator() {
    const { colorStyled: c } = useThemePalette();
    return (
        <Box sx={{ position: 'absolute', bottom: 12, right: 14, zIndex: 10, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={10} thickness={5} sx={{ color: c.outline }} />
            <Typography sx={{ fontSize: 9, color: c.outline }}>Settling…</Typography>
        </Box>
    );
}
