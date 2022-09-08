import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    Collapse,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Container,
    Row,
    Col,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { redux_editRelation, redux_editResource } from '../../redux/actions/rrm_actions';
import { SECONDARY } from '../RRView/StyledComponents';

class AnnotationsDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseAnnotations: true,
            popoverOpen: false,
            selectedPrefix: '',
            modelTextareaValue: '',
            annotationType: '',
            annotationLang: ''
        };

        this.annotationNames = [
            'dc:description',
            'dc:title',
            'owl:backwardCompatibleWith',
            'owl:deprecated',
            'owl:incompatibleWith',
            'owl:priorVersion',
            'owl:versionInfo',
            'rdfs:comment',
            'rdfs:isDefinedBy',
            'rdfs:label',
            'rdfs:seeAlso'
        ];
        this.types = ['owl:rational', 'rdf:PlainLiteral', 'rdf:XMLLiteral', 'rdfs:Literal']; //TODO add all types
        this.languages = ['en', 'de', 'fr', 'es', 'pt'];
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('AnnotationsDropDown updated');
        //this.props.callback();
    };

    renderAnnotations = itemOfInterest => {
        const allAnnotations = [];
        for (const annotation in itemOfInterest.annotations) {
            if (itemOfInterest.annotations.hasOwnProperty(annotation)) {
                const subAnnotation = itemOfInterest.annotations[annotation];
                for (const sub in subAnnotation) {
                    if (subAnnotation.hasOwnProperty(sub)) {
                        subAnnotation[sub].forEach(item => {
                            allAnnotations.push({ prefix: annotation, type: item });
                        });
                    }
                }
            }
        }
        if (allAnnotations.length === 0) {
            return <div>No Annotations Available</div>;
        }
        const mappedAnnotations = allAnnotations.map(item => {
            return (
                <div
                    key={'itemId_' + item.prefix + item.type}
                    style={{ display: 'block', overflow: 'hidden' }}
                    onClick={event => {
                        console.log('Improvement: Maybe change background color to show it as selected');
                    }}
                >
                    {/*   <Icon
                        icon={faTimesCircle}
                        onClick={event => {
                            this.deleteAnnotationItem(event, item);
                        }}
                        style={{ marginRight: '5px', float: 'right' }}
                    />*/}
                    <div>{item.prefix}</div>
                    <div style={{ marginLeft: '1rem' }}>{item.type}</div>
                </div>
            );
        });

        return mappedAnnotations;
    };

    toggleAnnotation = () => {
        this.setState({ collapseAnnotations: !this.state.collapseAnnotations });
    };

    addAnnotation = event => {
        if (this.state.selectedPrefix === '') {
            alert('please select prefix');
            return;
        }
        const annotationPrefix = this.state.selectedPrefix;
        const annotationLang = this.state.annotationLang === '' ? 'default' : this.state.annotationLang;
        const annotationValue = this.state.modelTextareaValue;

        const currentItemContext = this.props.itemOfInterest;

        let currentAnnotations = JSON.parse(JSON.stringify(currentItemContext.annotations));

        if (currentAnnotations[annotationPrefix] !== undefined) {
            if (currentAnnotations[annotationPrefix][annotationLang] !== undefined) {
                currentAnnotations[annotationPrefix][annotationLang].push(annotationValue);
            } else {
                //add Language as well as value
                const obj = { [annotationLang]: [annotationValue] };
                currentAnnotations[annotationPrefix] = { ...currentAnnotations[annotationPrefix], ...obj };
            }
        } else {
            const obj = { [annotationPrefix]: { [annotationLang]: [annotationValue] } };
            currentAnnotations = { ...currentAnnotations, ...obj };
        }

        const newItem = { ...currentItemContext, annotations: currentAnnotations };
        if (this.props.itemType === 'Relation') {
            this.props.redux_editRelation({ updatedRelation: newItem, relationIdentifier: currentItemContext.identifier });
        } else {
            this.props.redux_editResource({ updatedResource: newItem, resourceIdentifier: currentItemContext.identifier });
        }

        event.stopPropagation();
        this.setState({ popoverOpen: !this.state.popoverOpen, selectedPrefix: '', annotationType: '', annotationLang: '', modelTextareaValue: '' });
    };

    deleteAnnotationItem = (event, item) => {
        event.stopPropagation();
        const currentItemContext = this.props.itemOfInterest;

        const currentAnnotations = JSON.parse(JSON.stringify(currentItemContext.annotations));

        Object.keys(currentAnnotations).map(annotationKey => {
            if (annotationKey === item.prefix) {
                //now we need to check for each language
                Object.keys(currentAnnotations[annotationKey]).map(languageKey => {
                    const listOfTypes = currentAnnotations[annotationKey][languageKey];
                    if (listOfTypes.length === 1) {
                        delete currentAnnotations[annotationKey][languageKey];
                        //the parent may have become an empty object, in that case delete that too.
                        if (Object.keys(currentAnnotations[annotationKey]).length === 0) {
                            delete currentAnnotations[annotationKey];
                        }
                    } else {
                        listOfTypes.splice(listOfTypes.indexOf(item.type), 1);
                    }
                    return currentAnnotations[annotationKey];
                });
            }
            return currentAnnotations;
        });
        const newItem = { ...currentItemContext, annotations: currentAnnotations };
        if (this.props.itemType === 'Relation') {
            this.props.redux_editRelation({ updatedRelation: newItem, relationIdentifier: currentItemContext.identifier });
        } else {
            this.props.redux_editResource({ updatedResource: newItem, resourceIdentifier: currentItemContext.identifier });
        }
    };

    toggleAddAnnotation = event => {
        event.stopPropagation();
        this.setState({ popoverOpen: !this.state.popoverOpen });
    };

    handleTextareaChange = event => {
        this.setState({ modelTextareaValue: event.target.value });
    };

    render() {
        return (
            <div key={'annotaions_' + this.props.itemIdentifier} className="root" style={{ padding: '2px 5px' }}>
                <Button
                    onClick={() => this.toggleAnnotation()}
                    style={{ marginTop: '0px', width: '100%', textAlign: 'left', backgroundColor: SECONDARY.dark }}
                >
                    <Icon icon={this.state.collapseAnnotations ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                    Annotations
                    {/*<Icon
                        id="PopoverAnnotation"
                        onClick={this.toggleAddAnnotation}
                        icon={faPlusCircle}
                        style={{ float: 'right', marginTop: '3px', marginRight: '5px', color: 'white' }}
                    /> */}
                    <Modal
                        style={{ height: '100%' }}
                        size="lg"
                        isOpen={this.state.popoverOpen}
                        toggle={this.toggleAddAnnotation}
                        target="PopoverAnnotation"
                    >
                        <ModalHeader toggle={this.toggleAddAnnotation} style={{ marginTop: '1px', marginBottom: '0px', padding: '0rem 0rem' }}>
                            <label style={{ marginLeft: '5px' }}>Add Annotation</label>
                        </ModalHeader>
                        <ModalBody style={{ padding: '0', height: '100%' }}>
                            <Container style={{ paddingLeft: '0px', paddingRight: '0px', height: '100%' }}>
                                <Row style={{ margin: '0 0 0 0' }}>
                                    <Col xs="6" style={{ height: '100%', maxWidth: '30%', padding: '0 0 0 0' }}>
                                        <Nav tabs vertical pills style={{ overflow: 'hidden' }}>
                                            {this.annotationNames.map(item => {
                                                return (
                                                    <NavItem key={'NavKey_' + item}>
                                                        <NavLink
                                                            onClick={() => {
                                                                this.setState({ selectedPrefix: item });
                                                            }}
                                                            style={{ padding: '0 1rem', color: 'black', fontSize: '14px' }}
                                                        >
                                                            {item}
                                                        </NavLink>
                                                    </NavItem>
                                                );
                                            })}
                                        </Nav>
                                    </Col>
                                    <Col
                                        style={{
                                            maxWidth: '70%',
                                            maxHeight: '100%',
                                            border: '1px gray',
                                            padding: '0 0 0 0'
                                        }}
                                    >
                                        <Row style={{ height: '85%', margin: '0 0 0 0' }}>
                                            <Label style={{ marginTop: '-30px' }}>{this.state.selectedPrefix}</Label>
                                            <Input
                                                style={{ height: '100%', padding: '0 0 0 0' }}
                                                value={this.state.modelTextareaValue}
                                                autoFocus={true}
                                                onChange={this.handleTextareaChange}
                                                type="textarea"
                                                name="text"
                                                id="exampleText"
                                            />
                                        </Row>
                                        <Row style={{ marginLeft: '0px', height: '15%', bottom: '0px' }}>
                                            <Label style={{ fontSize: '14px', marginTop: '5px' }}>Type</Label>
                                            <div style={{ float: 'left', marginTop: '1px', paddingLeft: '5px', paddingRight: '15px' }}>
                                                <Input
                                                    style={{ fontSize: '14px' }}
                                                    onChange={event => {
                                                        this.setState({ annotationType: event.target.value });
                                                    }}
                                                    type="select"
                                                    id="select"
                                                >
                                                    <option key={'types_none'}>{''}</option>
                                                    {this.types.map(item => {
                                                        return <option key={'typesKey_' + item}>{item}</option>;
                                                    })}
                                                </Input>
                                            </div>
                                            <Label style={{ fontSize: '14px', marginTop: '5px' }}>Lang</Label>
                                            <div style={{ float: 'right', marginTop: '1px', paddingLeft: '5px' }}>
                                                <Input
                                                    style={{ fontSize: '14px' }}
                                                    onChange={event => {
                                                        this.setState({ annotationLang: event.target.value });
                                                    }}
                                                    type="select"
                                                    id="select"
                                                >
                                                    <option key={'languageKey_none'}>{''}</option>
                                                    {this.languages.map(item => {
                                                        return <option key={'languageKey_' + item}>{item}</option>;
                                                    })}
                                                </Input>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </ModalBody>
                        <ModalFooter style={{ padding: '0rem' }}>
                            <Button color="primary" onClick={this.addAnnotation}>
                                OK
                            </Button>{' '}
                            <Button color="secondary" onClick={this.toggleAddAnnotation}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Button>
                <Collapse isOpen={!this.state.collapseAnnotations}>
                    <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                        <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>
                            {this.renderAnnotations(this.props.itemOfInterest)}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

AnnotationsDropDown.propTypes = {
    itemType: PropTypes.string.isRequired,
    itemIdentifier: PropTypes.string.isRequired,
    itemOfInterest: PropTypes.object.isRequired,
    redux_editRelation: PropTypes.func.isRequired,
    redux_editResource: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer
    };
};

const mapDispatchToProps = dispatch => ({
    redux_editRelation: data => dispatch(redux_editRelation(data)),
    redux_editResource: data => dispatch(redux_editResource(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationsDropDown);
