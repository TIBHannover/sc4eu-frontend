export default class VOWLRenderingHandler {
    constructor() {
        this.renderingConfigObject = {
            nodes: {
                'owl:thing': {
                    style: {
                        renderingType: 'circle',
                        bgColor: '#ffffff',
                        strokeElement: true,
                        strokeWidth: '1px',
                        strokeStyle: 'dashed',
                        strokeColor: '#000',
                        radius: 30,
                        width: 100,
                        height: 50
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

                'owl:class': {
                    style: {
                        renderingType: 'circle',
                        bgColor: '#aaccff',
                        strokeElement: true,
                        strokeWidth: '1px',
                        strokeStyle: 'solid',
                        strokeColor: '#000',
                        radius: 50,
                        width: 100,
                        height: 50
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

                'owl:equivalentclass': {
                    style: {
                        renderingType: 'circle',
                        bgColor: '#aaccff',
                        strokeElement: true,
                        strokeWidth: '1px',
                        strokeStyle: 'dotted',
                        strokeColor: '#000',
                        radius: 50,
                        width: 100,
                        height: 50,
                        doubleStrokes: true
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
                },

                'rdfs:literal': {
                    style: {
                        renderingType: 'rect',
                        bgColor: '#FFCC33',
                        strokeElement: true,
                        strokeWidth: '1px',
                        strokeStyle: 'dashed',
                        strokeColor: '#000',
                        radius: 30,
                        width: 50,
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
                        width: 50,
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

                'rdfs:subclassof': {
                    style: {
                        link: {
                            lineStyle: 'dashed',
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
                                bgColor: '#ECF0F1',
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

                'owl:equivalentclass': {
                    style: {
                        link: {
                            lineStyle: 'dashed',
                            lineWidth: '2px',
                            lineColor: '#000000'
                        },
                        arrowHead: {
                            renderingType: 'triangle',
                            scaleFactor: 1,
                            strokeWidth: '2px',
                            strokeStyle: 'solid',
                            strokeColor: '#000000',
                            fillColor: '#ffffff'
                        },

                        propertyNode: {
                            style: {
                                renderingType: 'rect',
                                bgColor: '#ECF0F1',
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
                },

                multilink: {
                    style: {
                        link: {
                            lineStyle: 'solid',
                            lineWidth: '2px',
                            lineColor: '#474747'
                        },
                        arrowHead: {
                            renderingType: 'triangle',
                            scaleFactor: 1,
                            strokeWidth: '2px',
                            strokeStyle: 'solid',
                            strokeColor: '#000000',
                            fillColor: '#ffffff'
                        },

                        propertyNode: {
                            style: {
                                renderingType: 'rect',
                                bgColor: '#007bff',
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
                renderingType: 'circle',
                bgColor: '#ffffff',
                strokeElement: true,
                strokeWidth: '1px',
                strokeStyle: 'solid',
                strokeColor: '#000',
                radius: 50,
                width: 100,
                height: 50
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
                    fillColor: '#f9fff8'
                },
                arrowTail: {
                    renderingType: 'diamond',
                    scaleFactor: 2,
                    strokeWidth: '2px',
                    strokeStyle: 'solid',
                    strokeColor: '#d58d88',
                    fillColor: '#d6d5d5'
                },
                propertyNode: {
                    style: {
                        renderingType: 'rect',
                        bgColor: '#fefdff',
                        roundedCorner: '0,0',
                        fontSizeOverWritesShapeSize: 'true',
                        overWriteOffset: '5',
                        strokeElement: 'true',
                        strokeWidth: '1px',
                        strokeStyle: 'dashed',
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
