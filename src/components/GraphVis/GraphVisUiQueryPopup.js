import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import GraphModal from './GraphModal';
import DonatelloGraph from '../../GraphVisLib/implementation/Renderes/gizmoRenderer/DonatelloGraph';
import MapperModule from '../../GraphVisLib/implementation/MapperModule';

const GraphVisUiQueryPopup = ({ open, onClose, queryGraphData }) => {
    const containerId = useRef(
        `query_graph_rendering_div_${Math.random()
            .toString(36)
            .substr(2, 9)}`
    );
    const graphRef = useRef(null);
    const graphInstance = useRef(null);
    const mapperModule = useRef(null);

    useEffect(() => {
        if (!open || !queryGraphData) return;
        // Wait for the div to be in the DOM
        requestAnimationFrame(() => {
            setTimeout(() => {
                const container = document.getElementById(containerId.current);
                if (!container) return;
                graphInstance.current = new DonatelloGraph();
                mapperModule.current = new MapperModule();
                mapperModule.current.setGraphReference(graphInstance.current);
                const modelAsJsonObject = {
                    resources: queryGraphData.resources,
                    relations: queryGraphData.relations
                };
                const resourceRelationModel = {
                    resultingModel: {
                        type: 'TYPE_RESOURCE_RELATION_MODEL',
                        modelAsJsonObject: modelAsJsonObject
                    }
                };
                resourceRelationModel.resultingModel.getResult = function() {
                    return modelAsJsonObject;
                };
                graphInstance.current.setRenderingContainer(containerId.current);
                mapperModule.current.setResourceRelationModelInput(resourceRelationModel);
                mapperModule.current.setNodeLinkType('VOWL');
                mapperModule.current.execute().then(model => {
                    graphInstance.current.setModel(model);
                    graphInstance.current.initializeRenderingContainer();
                    graphInstance.current.createRenderingElements();
                    graphInstance.current.drawRenderingPrimitives();
                    graphInstance.current.setGraphInitialized(true);
                });
            }, 0);
        });
        // Cleanup on close
        return () => {
            if (graphInstance.current) {
                // Optionally, add cleanup logic if DonatelloGraph supports it
                graphInstance.current = null;
            }
        };
    }, [open, queryGraphData]);

    if (!open || !queryGraphData) return null;

    return (
        <GraphModal open={open} onClose={onClose}>
            <div id={containerId.current} ref={graphRef} style={{ width: '100%', height: '100%' }} />
        </GraphModal>
    );
};

GraphVisUiQueryPopup.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    queryGraphData: PropTypes.shape({
        resources: PropTypes.array,
        relations: PropTypes.array
    })
};

export default GraphVisUiQueryPopup;
