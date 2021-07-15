export default class UMLRenderingHandler {
    constructor() {
        this.renderingConfigObject = {
            nodes: {
                'rdfs:literal': {
                    style: {
                        renderingType: 'rect',
                        bgColor: '#FFCC33',
                        strokeElement: true,
                        strokeWidth: '1px',
                        strokeStyle: 'dashed',
                        strokeColor: '#000',
                        radius: 30,
                        width: 90,
                        height: 20
                    },
                    fontStyle: {
                        fontFamily: 'Helvetica,Arial,sans-serif',
                        fontColor: '#000',
                        fontSize: '12px'
                    },

                    options: {
                        drawDisplayName: true,
                        drawNestedAttributes: false,
                        cropLongText: false,
                        addTitleForDisplayName: true,
                        overwritesShapeSize: false,
                        overwriteOffset: 0,
                        fontPositionH: 'center',
                        fontPositionV: 'center'
                    }
                },
                'rdfs:datatype': {
                    style: {
                        renderingType: 'rect',
                        bgColor: '#ffa535',
                        strokeElement: true,
                        strokeWidth: '1px',
                        strokeStyle: 'dashed',
                        strokeColor: '#000',
                        radius: 30,
                        width: 90,
                        height: 20
                    },
                    fontStyle: {
                        fontFamily: 'Helvetica,Arial,sans-serif',
                        fontColor: '#000',
                        fontSize: '12px'
                    },

                    options: {
                        drawDisplayName: true,
                        drawNestedAttributes: false,
                        cropLongText: false,
                        addTitleForDisplayName: true,
                        overwritesShapeSize: false,
                        overwriteOffset: 0,
                        fontPositionH: 'center',
                        fontPositionV: 'center'
                    }
                },
                literal: {
                    style: {
                        renderingType: 'rect',
                        bgColor: '#FFCC33',
                        strokeElement: true,
                        strokeWidth: '1px',
                        strokeStyle: 'dashed',
                        strokeColor: '#000',
                        radius: 30,
                        width: 90,
                        height: 20
                    },
                    fontStyle: {
                        fontFamily: 'Helvetica,Arial,sans-serif',
                        fontColor: '#000',
                        fontSize: '12px'
                    },

                    options: {
                        drawDisplayName: true,
                        drawNestedAttributes: false,
                        cropLongText: true,
                        addTitleForDisplayName: true,
                        overwritesShapeSize: false,
                        overwriteOffset: 0,
                        fontPositionH: 'center',
                        fontPositionV: 'center'
                    }
                }
            },
            links: {
                'owl:datatypeproperty': {
                    style: {
                        link: {
                            lineStyle: 'solid',
                            lineWidth: '2px',
                            lineColor: '#000000'
                        },
                        arrowHead: {
                            renderingType: 'triangle',
                            scaleFactor: 1,
                            strokeWidth: '2px',
                            strokeStyle: 'solid',
                            strokeColor: '#000000',
                            fillColor: '#000000'
                        },

                        propertyNode: {
                            style: {
                                renderingType: 'rect',
                                bgColor: '#99CC66',
                                roundedCorner: '0,0',
                                fontSizeOverWritesShapeSize: 'true',
                                overWriteOffset: '5',
                                strokeElement: 'false',
                                radius: 50,
                                width: 100,
                                height: 25
                            },
                            fontStyle: {
                                fontFamily: 'Helvetica,Arial,sans-serif',
                                fontColor: '#000000',
                                fontSize: '12px'
                            },
                            options: {
                                drawDisplayName: true,
                                cropLongText: true,
                                addTitleForDisplayName: true,
                                overwritesShapeSize: false,
                                overwriteOffset: 0,
                                fontPositionH: 'center',
                                fontPositionV: 'center'
                            }
                        }
                    },
                    options: {
                        drawPropertyNode: true,
                        drawArrowHead: true,
                        drawArrowTail: false,
                        link_renderingType: 'line' // line or curve
                    }
                },

                'owl:objectproperty': {
                    style: {
                        link: {
                            lineStyle: 'solid',
                            lineWidth: '2px',
                            lineColor: '#000000'
                        },
                        arrowHead: {
                            renderingType: 'triangle',
                            scaleFactor: 1,
                            strokeWidth: '2px',
                            strokeStyle: 'solid',
                            strokeColor: '#000000',
                            fillColor: '#000000'
                        },

                        propertyNode: {
                            style: {
                                renderingType: 'rect',
                                bgColor: '#aaccff',
                                roundedCorner: '0,0',
                                fontSizeOverWritesShapeSize: 'true',
                                overWriteOffset: '5',
                                strokeElement: 'false',
                                radius: 50,
                                width: 100,
                                height: 25
                            },
                            fontStyle: {
                                fontFamily: 'Helvetica,Arial,sans-serif',
                                fontColor: '#000000',
                                fontSize: '12px'
                            },
                            options: {
                                drawDisplayName: true,
                                cropLongText: true,
                                addTitleForDisplayName: true,
                                overwritesShapeSize: false,
                                overwriteOffset: 0,
                                fontPositionH: 'center',
                                fontPositionV: 'center'
                            }
                        }
                    },
                    options: {
                        drawPropertyNode: true,
                        drawArrowHead: true,
                        drawArrowTail: false,
                        link_renderingType: 'line' // line or curve
                    }
                }
            }
        };

        this.defaultNodeCFG = {
            style: {
                renderingType: 'rect',
                bgColor: '#ffffff',
                strokeElement: true,
                strokeWidth: '1px',
                strokeStyle: 'solid',
                strokeColor: '#000',
                radius: 50,
                width: 100,
                height: 50,
                roundedCorner: '10,10'
            },
            fontStyle: {
                fontFamily: 'Helvetica,Arial,sans-serif',
                fontColor: '#000',
                fontSize: '12px'
            },

            options: {
                drawDisplayName: true,
                drawNestedAttributes: true,
                cropLongText: true,
                addTitleForDisplayName: true,
                overwritesShapeSize: false,
                overwriteOffset: 0,
                fontPositionH: 'center',
                fontPositionV: 'center'
            }
        };

        this.defaultLinkCFG = {
            style: {
                link: {
                    lineStyle: 'solid',
                    lineWidth: '2px',
                    lineColor: '#000000'
                },
                arrowHead: {
                    renderingType: 'triangle',
                    scaleFactor: 1,
                    strokeWidth: '2px',
                    strokeStyle: 'solid',
                    strokeColor: '#000000',
                    fillColor: '#000000'
                },
                arrowTail: {
                    renderingType: 'diamond',
                    scaleFactor: 2,
                    strokeWidth: '2px',
                    strokeStyle: 'solid',
                    strokeColor: '#000000',
                    fillColor: '#d6d5d5'
                },
                propertyNode: {
                    style: {
                        renderingType: 'rect',
                        bgColor: '#ff2358',
                        roundedCorner: '0,0',
                        fontSizeOverWritesShapeSize: 'true',
                        overWriteOffset: '5',
                        strokeElement: 'true',
                        strokeWidth: '1px',
                        strokeStyle: 'solid',
                        strokeColor: '#000000',
                        radius: 50,
                        width: 100,
                        height: 25
                    },
                    fontStyle: {
                        fontFamily: 'Helvetica,Arial,sans-serif',
                        fontColor: '#000000',
                        fontSize: '12px'
                    },
                    options: {
                        drawDisplayName: true,
                        cropLongText: true,
                        addTitleForDisplayName: true,
                        overwritesShapeSize: false,
                        overwriteOffset: 0,
                        fontPositionH: 'center',
                        fontPositionV: 'center'
                    }
                }
            },
            options: {
                drawPropertyNode: true,
                drawArrowHead: true,
                drawArrowTail: false,
                link_renderingType: 'line' // line or curve
            }
        };
    }
    getNodeConfigFromType = type => {
        if (!type) {
            return this.defaultNodeCFG;
        }
        let qType = '';
        if (typeof type === 'object') {
            qType = type[0];
        } else {
            qType = type;
        }
        const rType = qType.toLowerCase();
        if (!this.renderingConfigObject.nodes.hasOwnProperty(rType)) {
            return this.defaultNodeCFG;
        }
        return this.renderingConfigObject.nodes[rType];
    };

    getLinkConfigFromType = type => {
        if (!type) {
            return this.defaultLinkCFG;
        }
        let qType = '';
        if (typeof type === 'object') {
            qType = type[0];
        } else {
            qType = type;
        }
        const rType = qType.toLowerCase();
        if (!this.renderingConfigObject.links.hasOwnProperty(rType)) {
            return this.defaultLinkCFG;
        }
        return this.renderingConfigObject.links[rType];
    };
}
