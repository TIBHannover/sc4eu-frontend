import BaseVertexEdgeMapper from './Mappers/BaseVertexEdgeMapper';
import UMLNodeLinkMapper from './Mappers/UMLNodeLinkMapper';
import VowlNodeLinkMapper from './Mappers/VowlNodeLinkMapper';
import UMLStyledRenderingHandler from './Renderes/gizmoRenderer/renderingConfigs/UMLStyledRenderingHandler';
import VOWLRenderingHandler from './Renderes/gizmoRenderer/renderingConfigs/VOWLRenderingHandler';

export default class MapperModule {
    constructor() {
        this.nodeLinkMapper = 'VOWL';
        this.rrm_input = null;
        this.ve_mapper_model = null;
        this.graphReference = null;
        this.supportedMapperTypes = ['UML', 'VOWL'];

        this.umlBasedRenderingConfing = new UMLStyledRenderingHandler();
        this.vowlRenderingConfig = new VOWLRenderingHandler();

        this.preprocessedData = false;
    }

    setResourceRelationModelInput = model => {
        this.rrm_input = model;
    };
    setGraphReference = graph => {
        this.graphReference = graph;

        // apply default rendering config
        this.graphReference.setRenderingConfig(this.vowlRenderingConfig);
    };

    execute = async () => {
        // based on the type we create a node-link mapper and return its result;
        if (this.preprocessedData === false) {
            await this.__preprocessModel();
            this.preprocessedData = true;
        }
        let nodeLinkModel = { nodes: [], links: [] };
        if (this.nodeLinkMapper === 'UML') {
            const umlMapper = new UMLNodeLinkMapper();
            umlMapper.setInputData(this.ve_mapper_model);
            await umlMapper.execute();
            nodeLinkModel = umlMapper.getResult().resultingModel.getResult();
        }

        if (this.nodeLinkMapper === 'VOWL') {
            const umlMapper = new VowlNodeLinkMapper();
            umlMapper.setInputData(this.ve_mapper_model);
            await umlMapper.execute();
            nodeLinkModel = umlMapper.getResult().resultingModel.getResult();
        }
        return nodeLinkModel;
    };

    setNodeLinkType = val => {
        if (this.supportedMapperTypes.indexOf(val) !== -1) {
            this.nodeLinkMapper = val;
            if (val === 'UML') {
                this.graphReference.setRenderingConfig(this.umlBasedRenderingConfing);
            }
            if (val === 'VOWL') {
                this.graphReference.setRenderingConfig(this.vowlRenderingConfig);
            }
        }
    };

    __preprocessModel = async () => {
        const mapper1 = new BaseVertexEdgeMapper();
        mapper1.setInputData(this.rrm_input);
        await mapper1.execute();
        this.ve_mapper_model = mapper1.getResult();
    };
}
