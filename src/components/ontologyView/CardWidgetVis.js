import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLongVersion, getPrefixedVersion } from '../../mappers/helperFunctions';
import { transformIdentifierToPrefixed, transformRelationToTTL } from '../../mappers/RelationToTTL';
import {
    Button,
    Card,
    CardBody,
    Collapse,
    Popover,
    PopoverHeader,
    PopoverBody,
    CustomInput,
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
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { redux_editRelation } from '../../redux/actions/rrm_actions';

const AnimationContainer = styled(CSSTransition)`
    &.fadeIn-enter {
        opacity: 0;
    }

    &.fadeIn-enter.fadeIn-enter-active {
        opacity: 1;
        transition: 1s opacity;
    }
`;

class CardWidgetVis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: false,
            collapseAnnotations: true,
            collapseDescription: true,
            popoverOpen: false,
            popoverCharacteristicsOpen: false,
            popoverDomainRangePairsOpen: false,
            popoverRange: false,
            selectedPrefix: '',
            annotationType: '',
            annotationLang: '',
            modelTextareaValue: '',
            checkedItems: new Map()
        };
        this.characteristics = [
            'owl:Functional',
            'owl:Inverse functional',
            'owl:Transitive',
            'owl:Symmetric',
            'owl:Asymmetric',
            'owl:Reflexive',
            'owl:Irreflexive'
        ];
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

        this.dataTypeRestrictions = [
            'rdfs:Literal',
            'xsd:anyURI',
            'xsd:boolean',
            'xsd:byte',
            'xsd:data',
            'xsd;dateTime',
            'xsd:double',
            'xsd:float',
            'xsd:duration'
        ]; //TODO complete this list

        this.objectTypeRestrictions = ['foaf:Agent', 'foaf:Document', 'foaf:Person', 'foaf:organization']; //Todo complete the list

        this.languages = ['en', 'de', 'fr', 'es', 'pt'];
        this.types = ['owl:rational', 'rdf:PlainLiteral', 'rdf:XMLLiteral', 'rdfs:Literal']; //TODO add all types
        this.prefixList = this.props.rrModel.metaInformation.prefixList.longToShort;
        this.prefixToLongList = this.props.rrModel.metaInformation.prefixList.shortToLong;
        this.widgetRenderingIdentifier =
            'widgetRenderingIdentifier_' +
            getPrefixedVersion(this.props.itemIdentifier, this.props.rrModel.metaInformation.prefixList.longToShort).replace(':', '_');
    }

    componentDidMount() {}

    componentDidUpdate = (prevProps, prevState) => {
        // we initialize the card based on the target item id for rendering
    };

    componentWillUnmount() {}

    renderWidget = () => {
        if (this.props.itemType === 'Relation') {
            return this.renderRelationWidget();
        } else {
            return this.renderResourceWidget();
        }
    };

    toggleAnnotation = () => {
        this.setState({ collapseAnnotations: !this.state.collapseAnnotations });
    };
    toggleDescription = () => {
        this.setState({ collapseDescription: !this.state.collapseDescription });
    };

    toggleAddAnnotation = event => {
        event.stopPropagation();
        this.setState({ popoverOpen: !this.state.popoverOpen });
    };

    handleTextareaChange = event => {
        this.setState({ modelTextareaValue: event.target.value });
    };

    addAnnotation = event => {
        if (this.state.selectedPrefix === '') {
            alert('please select prefix');
            return;
        }
        const annotationPrefix = this.state.selectedPrefix;
        const annotationLang = this.state.annotationLang === '' ? 'default' : this.state.annotationLang;
        const annotationValue = this.state.modelTextareaValue;

        const currentRelationContext = this.props.itemContext;

        let currentAnnotations = JSON.parse(JSON.stringify(currentRelationContext.annotations));

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

        const newRelation = { ...currentRelationContext, annotations: currentAnnotations };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });

        event.stopPropagation();
        this.setState({ popoverOpen: !this.state.popoverOpen, selectedPrefix: '', annotationType: '', annotationLang: '', modelTextareaValue: '' });
    };

    renderRelationWidget = () => {
        const itemIdentifier = this.props.itemIdentifier;
        const prefixedItemIdentifier = transformIdentifierToPrefixed(this.props.itemIdentifier, this.prefixList);
        const itemOfInterest = this.props.itemContext;

        return (
            <div>
                <div key={'annotaions_' + itemIdentifier} className="root" style={{ padding: '2px 5px' }}>
                    <Button color="primary" onClick={() => this.toggleAnnotation()} style={{ marginTop: '0px', width: '100%', textAlign: 'left' }}>
                        <Icon icon={this.state.collapseAnnotations ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                        Annotations
                        <Icon
                            id="Popover1"
                            onClick={this.toggleAddAnnotation}
                            icon={faPlusCircle}
                            style={{ float: 'right', marginTop: '3px', marginRight: '5px', color: 'white' }}
                        />
                        <Modal
                            style={{ height: '100%' }}
                            size="lg"
                            isOpen={this.state.popoverOpen}
                            toggle={this.toggleAddAnnotation}
                            target="Popover1"
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
                                            {/*<ListGroup style={{ overflow: 'hidden' }}>*/}
                                            {/*    {this.annotationNames.map(item => (*/}
                                            {/*        <ListGroupItem key={'ListKey_' + item} style={{ fontSize: '14px', padding: '0.1rem 0 0 0.3rem' }}>*/}
                                            {/*            {item}*/}
                                            {/*        </ListGroupItem>*/}
                                            {/*    ))}*/}
                                            {/*</ListGroup>*/}
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
                                {this.renderAnnotations(itemOfInterest)}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

                <div key={'description' + itemIdentifier} className="root" style={{ padding: '2px 5px' }}>
                    <Button color="primary" onClick={() => this.toggleDescription()} style={{ marginTop: '0px', width: '100%', textAlign: 'left' }}>
                        <Icon icon={this.state.collapseDescription ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                        Description
                    </Button>
                    <Collapse isOpen={!this.state.collapseDescription}>
                        <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                            <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>
                                {this.renderDescription(itemOfInterest)}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

                <div style={{ padding: '2px 5px' }}>
                    <Button color="primary" style={{ marginTop: '0px', width: '100%', textAlign: 'left' }}>
                        {this.renderCharacteristics(itemOfInterest)}
                    </Button>
                </div>
            </div>
        );
    };

    deleteAnnotationItem = (event, item) => {
        event.stopPropagation();
        const currentRelationContext = this.props.itemContext;

        const currentAnnotations = JSON.parse(JSON.stringify(currentRelationContext.annotations));

        Object.keys(currentAnnotations).map(annotationKey => {
            if (annotationKey === item.prefix) {
                //now we need to check for each language
                Object.keys(currentAnnotations[annotationKey]).map(languageKey => {
                    const listOfTypes = currentAnnotations[annotationKey][languageKey];
                    if (listOfTypes.length == 1) {
                        delete currentAnnotations[annotationKey][languageKey];
                        //the parent may have become an empty object, in that case delete that too.
                        if (Object.keys(currentAnnotations[annotationKey]).length == 0) {
                            delete currentAnnotations[annotationKey];
                        }
                    } else {
                        listOfTypes.splice(listOfTypes.indexOf(item.type), 1);
                    }
                });
            }
        });
        const newRelation = { ...currentRelationContext, annotations: currentAnnotations };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });
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

        const mappedAnnotations = allAnnotations.map(item => {
            return (
                <div
                    key={'itemId_' + item.prefix + item.type}
                    style={{ display: 'block', overflow: 'hidden' }}
                    onClick={event => {
                        console.log('Improvement: Maybe change background color to show it as selected');
                    }}
                >
                    <Icon
                        icon={faTimesCircle}
                        onClick={event => {
                            this.deleteAnnotationItem(event, item);
                        }}
                        style={{ marginRight: '5px', float: 'right' }}
                    />
                    <div>{item.prefix}</div>
                    <div>{item.type}</div>
                </div>
            );
        });

        return mappedAnnotations;
    };

    toggleCharacteristics = () => {
        this.setState({ popoverCharacteristicsOpen: !this.state.popoverCharacteristicsOpen });
    };

    handleCharacteristicsChecked = (event, item) => {
        const isChecked = event.target.checked;
        const currentTypes = [...this.props.itemContext.type];

        if (isChecked === true && !currentTypes.includes(item)) {
            currentTypes.push(item);
        } else if (isChecked === false) {
            const index = currentTypes.indexOf(item);
            if (index !== -1) {
                currentTypes.splice(index, 1);
            }
        }
        const currentRelationContext = this.props.itemContext;
        const newRelation = { ...currentRelationContext, type: currentTypes };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    };

    renderCharacteristics = itemOfInterest => {
        const typeOfRelation = itemOfInterest.type[0].split(':')[1];
        if (typeOfRelation === 'DatatypeProperty') {
            return (
                <div>
                    Characteristics ({itemOfInterest.type.length - 1}/1)
                    <div style={{ float: 'right' }}>
                        <CustomInput
                            id={'checkbox'}
                            type={'checkbox'}
                            checked={itemOfInterest.type.length > 1 ? true : false}
                            onChange={event => {
                                this.handleCharacteristicsChecked(event, 'Functional');
                            }}
                        >
                            Functional
                        </CustomInput>
                    </div>
                </div>
            );
        } else if (typeOfRelation === 'ObjectProperty') {
            return (
                <div>
                    Characteristics ({itemOfInterest.type.length - 1}/{this.characteristics.length})
                    <div style={{ float: 'right' }}>
                        <Icon id="Popover2" icon={faPlusCircle} style={{ float: 'right', marginTop: '3px', marginRight: '5px', color: 'white' }} />
                        <Popover
                            placement="bottom"
                            isOpen={this.state.popoverCharacteristicsOpen}
                            target="Popover2"
                            toggle={this.toggleCharacteristics}
                        >
                            <PopoverHeader>Add characteristics</PopoverHeader>
                            <PopoverBody>
                                {this.characteristics.map(item => {
                                    return (
                                        <CustomInput
                                            key={'checkBoxKey_' + item}
                                            id={'checkbox_' + item}
                                            checked={this.state.checkedItems.get(item) || false}
                                            type={'checkbox'}
                                            onChange={event => this.handleCharacteristicsChecked(event, item)}
                                        >
                                            {item}
                                        </CustomInput>
                                    );
                                })}
                                <Button
                                    style={{ padding: '0.1em 1em', background: '#0069d9', borderColor: '#0069d9', marginTop: '5px' }}
                                    onClick={this.toggleCharacteristics}
                                >
                                    Ok
                                </Button>
                            </PopoverBody>
                        </Popover>
                    </div>
                </div>
            );
        }
    };

    onMouseEnter = event => {
        event.target.style.color = 'green';
    };
    onMouseLeave = event => {
        event.target.style.color = 'gray';
    };

    addDomain = event => {
        const currentRelationContext = this.props.itemContext;
        const currentDomainRangePairs = [...currentRelationContext.domainRangePairs];

        const newDomains = [...this.state.checkedItems];
        newDomains.forEach(domainItem => {
            const longVersion = getLongVersion(domainItem[0], this.prefixToLongList); //TODO implement gtLongVersion
            currentDomainRangePairs.push({ domain: domainItem[0] });
        });

        const newRelation = { ...currentRelationContext, domainRangePairs: currentDomainRangePairs };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });

        //const prefix = domainItem.split(':')[0];
        //const longVersion = getLongVersion(prefix, this.prefixToLongList);
        this.setState({ popoverDomainRangePairsOpen: !this.state.popoverDomainRangePairsOpen, checkedItems: new Map() });
    };

    deleteDomain = (event, domainItem) => {
        const currentRelationContext = this.props.itemContext;
        const currentDomainRangePairs = JSON.parse(JSON.stringify(currentRelationContext.domainRangePairs));

        currentDomainRangePairs.forEach(domainRangePair => {
            const prefixedDomain = getPrefixedVersion(domainRangePair.domain, this.prefixList);
            if (prefixedDomain === domainItem) {
                domainRangePair.domain = 'http://www.w3.org/2002/07/owl#Thing'; //TODO use shortToLong here instead
            }
        });
        const newRelation = { ...currentRelationContext, domainRangePairs: currentDomainRangePairs };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });
    };

    addRange = event => {
        const currentRelationContext = this.props.itemContext;
        const currentDomainRangePairs = [...currentRelationContext.domainRangePairs];

        const newRanges = [...this.state.checkedItems];
        newRanges.forEach(rangeItem => {
            const longVersion = getLongVersion(rangeItem[0], this.prefixToLongList); //TODO implement gtLongVersion
            currentDomainRangePairs.push({ range: rangeItem[0] });
        });

        const newRelation = { ...currentRelationContext, domainRangePairs: currentDomainRangePairs };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });

        //const prefix = domainItem.split(':')[0];
        //const longVersion = getLongVersion(prefix, this.prefixToLongList);
        this.setState({ popoverDomainRangePairsOpen: !this.state.popoverDomainRangePairsOpen });
    };

    deleteRange = (event, rangeItem) => {
        const currentRelationContext = this.props.itemContext;
        const currentDomainRangePairs = JSON.parse(JSON.stringify(currentRelationContext.domainRangePairs));

        currentDomainRangePairs.forEach(domainRangePair => {
            const prefixedRange = getPrefixedVersion(domainRangePair.range, this.prefixList);
            if (prefixedRange === rangeItem) {
                domainRangePair.range = 'http://www.w3.org/2002/07/owl#Thing'; //TODO use shortToLong here instead
            }
        });
        const newRelation = { ...currentRelationContext, domainRangePairs: currentDomainRangePairs };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });
    };

    showPopup = () => {
        this.setState({ popoverDomainRangePairsOpen: !this.state.popoverDomainRangePairsOpen });
    };
    showPopupRange = () => {
        this.setState({ popoverRange: !this.state.popoverRange });
    };

    handleCheck = (event, item) => {
        const isChecked = event.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    };

    renderDescription = itemOfInterest => {
        const typeOfItemOfInterest = itemOfInterest.type[0].split(':')[1];

        const typeRestrictions = typeOfItemOfInterest === 'ObjectProperty' ? [...this.objectTypeRestrictions] : [...this.dataTypeRestrictions];
        let domains = [];
        let ranges = [];
        const domainRangePairs = itemOfInterest.domainRangePairs;
        domainRangePairs.forEach(item => {
            const domain = transformIdentifierToPrefixed(item.domain, this.prefixList);
            const range = transformIdentifierToPrefixed(item.range, this.prefixList);
            domains.push(domain);
            ranges.push(range);
        });

        //Keep only unique values in the list
        domains = [...new Set(domains)];
        ranges = [...new Set(ranges)];

        return (
            <div style={{ overflow: 'hidden' }}>
                <div>
                    Domains{'  '}
                    <Icon
                        id={'PopoverDomain' + itemOfInterest.itemIdentifier}
                        icon={faPlusCircle}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        style={{ marginRight: '5px', color: 'gray' }}
                    />
                    <div>
                        <Popover
                            placement="bottom"
                            isOpen={this.state.popoverDomainRangePairsOpen}
                            target={'PopoverDomain' + itemOfInterest.itemIdentifier}
                            toggle={this.showPopup}
                        >
                            <PopoverHeader>Add Domain</PopoverHeader>
                            <PopoverBody>
                                {typeRestrictions.map(item => {
                                    return (
                                        <CustomInput
                                            key={'checkBoxKey_' + item}
                                            id={'checkbox_' + item}
                                            checked={this.state.checkedItems.get(item) || false}
                                            type={'checkbox'}
                                            onChange={event => this.handleCheck(event, item)}
                                        >
                                            {item}
                                        </CustomInput>
                                    );
                                })}
                                <Button onClick={this.addDomain}>Ok</Button>
                                <Button onClick={this.showPopup}>Cancel</Button>
                            </PopoverBody>
                        </Popover>
                    </div>
                </div>
                {domains.map(domain => (
                    <div key={'domainKey_' + domain} style={{ marginLeft: '1rem' }}>
                        {domain}
                        <Icon
                            icon={faTimesCircle}
                            onClick={event => this.deleteDomain(event, domain)}
                            style={{ marginRight: '5px', float: 'right' }}
                        />
                        <hr style={{ marginTop: 0 }} />
                    </div>
                ))}
                <div>
                    Ranges{'  '}
                    <Icon
                        id={'PopoverRange' + itemOfInterest.itemIdentifier}
                        icon={faPlusCircle}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        style={{ marginRight: '5px', color: 'gray' }}
                    />
                    <div>
                        <Popover
                            placement="bottom"
                            isOpen={this.state.popoverRange}
                            target={'PopoverRange' + itemOfInterest.itemIdentifier}
                            toggle={this.showPopupRange}
                        >
                            <PopoverHeader>Add Range</PopoverHeader>
                            <PopoverBody>
                                {typeRestrictions.map(item => {
                                    return (
                                        <CustomInput
                                            key={'checkBoxKey_' + item}
                                            id={'checkbox_' + item}
                                            checked={this.state.checkedItems.get(item) || false}
                                            type={'checkbox'}
                                            onChange={event => this.handleCheck(event, item)}
                                        >
                                            {item}
                                        </CustomInput>
                                    );
                                })}
                                <Button onClick={this.addRange}>Ok</Button>
                                <Button onClick={this.showPopupRange}>Cancel</Button>
                            </PopoverBody>
                        </Popover>
                    </div>
                </div>
                {ranges.map(range => (
                    <div key={'domainKey_' + range} style={{ marginLeft: '1rem' }}>
                        {range}
                        <Icon icon={faTimesCircle} onClick={event => this.deleteRange(event, range)} style={{ marginRight: '5px', float: 'right' }} />
                        <hr style={{ marginTop: 0 }} />
                    </div>
                ))}
            </div>
        );
    };

    renderResourceWidget = () => {};

    render() {
        return (
            <div style={{ backgroundColor: 'white', height: '250px', border: '1px solid black', borderTop: 'none' }}>
                {this.props.isExpanded && <div style={{ display: 'block' }}>{this.renderWidget()}</div>}
            </div>
        );
    }
}
CardWidgetVis.propTypes = {
    height: PropTypes.number,
    itemIdentifier: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    rrModel: PropTypes.object.isRequired,
    itemContext: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    redux_editRelation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer
    };
};

const mapDispatchToProps = dispatch => ({
    redux_editRelation: data => dispatch(redux_editRelation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardWidgetVis);
