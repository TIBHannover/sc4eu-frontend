import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrefixedVersion } from '../../mappers/helperFunctions';
import { transformIdentifierToPrefixed } from '../../mappers/RelationToTTL';
import { Button, Card, CardBody, Collapse, Popover, PopoverHeader, PopoverBody, CustomInput } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { redux_editRelation, redux_editResource } from '../../redux/actions/rrm_actions';
import AnnotationsDropDown from './AnnotationsDropDown';
import { PRIMARY, SECONDARY } from '../RRView/StyledComponents';
import styled from 'styled-components';
import { fontStyled } from '../../styledComponents/styledFont';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';

class CardWidgetVis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: false,
            collapseAnnotations: true,
            collapseDescription: false,
            collapseResourceDescription: false,
            popoverOpen: false,
            popoverCharacteristicsOpen: false,
            popoverDomainRangePairsOpen: false,
            popoverResourceTypeOpen: false,
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

        this.resourceTypes = ['owl:Class', 'rdfs:Class', 'owl:DeprecatedClass', 'owl:Thing', 'rdfs:Resource'];

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

        this.objectTypeRestrictions = ['foaf:Agent', 'foaf:Document', 'foaf:Person', 'foaf:organization']; //Todo complete the list, I think this should come from resources

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

    renderResourceWidget = () => {
        const itemIdentifier = this.props.itemIdentifier;
        //const prefixedItemIdentifier = transformIdentifierToPrefixed(this.props.itemIdentifier, this.prefixList);
        const itemOfInterest = this.props.itemContext;

        const props = {
            itemType: this.props.itemType,
            itemIdentifier: this.props.itemIdentifier,
            itemOfInterest: this.props.itemContext,
            callback: this.props.callback
        };

        return (
            <div>
                <AnnotationsDropDown {...props} />

                <div key={'description' + itemIdentifier} className="root" style={{ padding: '2px 5px' }}>
                    <Button
                        onClick={() => this.toggleResourceDescription()}
                        style={{ marginTop: '0px', width: '100%', textAlign: 'left', backgroundColor: SECONDARY.dark }}
                    >
                        <Icon icon={this.state.collapseResourceDescription ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                        <StyledSpan>Description</StyledSpan>
                    </Button>
                    <Collapse isOpen={!this.state.collapseResourceDescription}>
                        <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                            <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>
                                {this.renderResourceDescription(itemOfInterest)}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>

                <div style={{ padding: '2px 5px' }}>
                    {/* <Button color="primary" style={{ marginTop: '0px', width: '100%', textAlign: 'left' }}>
                        {this.renderResourceType(itemOfInterest)}
                    </Button>*/}
                </div>
            </div>
        );
    };

    renderRelationWidget = () => {
        const itemIdentifier = this.props.itemIdentifier;
        //const prefixedItemIdentifier = transformIdentifierToPrefixed(this.props.itemIdentifier, this.prefixList);
        const itemOfInterest = this.props.itemContext;

        const props = {
            itemType: this.props.itemType,
            itemIdentifier: this.props.itemIdentifier,
            itemOfInterest: this.props.itemContext,
            callback: this.props.callback
        };

        return (
            <div>
                <AnnotationsDropDown {...props} />
                <div key={'description' + itemIdentifier} className="root" style={{ padding: '2px 5px' }}>
                    <Button
                        onClick={() => this.toggleDescription()}
                        style={{ marginTop: '0px', width: '100%', textAlign: 'left', backgroundColor: SECONDARY.dark }}
                    >
                        <Icon icon={this.state.collapseDescription ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                        <StyledSpan>Description</StyledSpan>
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
                    {/* <Button color="primary" style={{ marginTop: '0px', width: '100%', textAlign: 'left' }}>
                        {this.renderCharacteristics(itemOfInterest)}
                    </Button>*/}
                </div>
            </div>
        );
    };

    toggleDescription = () => {
        this.setState({ collapseDescription: !this.state.collapseDescription });
    };

    toggleResourceDescription = () => {
        this.setState({ collapseResourceDescription: !this.state.collapseResourceDescription });
    };

    toggleCharacteristics = () => {
        this.setState({ popoverCharacteristicsOpen: !this.state.popoverCharacteristicsOpen });
    };

    toggleResourceType = () => {
        this.setState({ popoverResourceTypeOpen: !this.state.popoverResourceTypeOpen });
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

    handleResourceCharacteristicsChecked = (event, item) => {
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
        const currentResourceContext = this.props.itemContext;
        const newResource = { ...currentResourceContext, type: currentTypes };
        this.props.redux_editResource({ updatedResource: newResource, resourceIdentifier: currentResourceContext.identifier });
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    };

    renderResourceType = itemOfInterest => {
        return (
            <div>
                Characteristics
                <div style={{ float: 'right' }}>
                    {/* <Icon
                        id="PopoverResourceType"
                        icon={faPlusCircle}
                        style={{ float: 'right', marginTop: '3px', marginRight: '5px', color: 'white' }}
                    />
                    <Popover
                        placement="bottom"
                        isOpen={this.state.popoverResourceTypeOpen}
                        target="PopoverResourceType"
                        toggle={this.toggleResourceType}
                    >
                        <PopoverHeader>Add resource type</PopoverHeader>
                        <PopoverBody>
                            {this.resourceTypes.map(item => {
                                return (
                                    <CustomInput
                                        key={'checkBoxKey_' + item}
                                        id={'checkbox_' + item}
                                        checked={this.state.checkedItems.get(item) || false}
                                        type={'checkbox'}
                                        onChange={event => this.handleResourceCharacteristicsChecked(event, item)}
                                    >
                                        {item}
                                    </CustomInput>
                                );
                            })}
                            <Button
                                style={{ padding: '0.1em 1em', background: '#0069d9', borderColor: '#0069d9', marginTop: '5px' }}
                                onClick={this.toggleResourceType}
                            >
                                Ok
                            </Button>
                        </PopoverBody>
                    </Popover>*/}
                </div>
            </div>
        );
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
                                this.handleCharacteristicsChecked(event, 'owl:Functional');
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
            //const longVersion = getLongVersion(domainItem[0], this.prefixToLongList); //TODO implement gtLongVersion
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
            //const longVersion = getLongVersion(rangeItem[0], this.prefixToLongList); //TODO implement gtLongVersion
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

    addAxiom = () => {
        //TODO add axiom to particular type and then render the Relation
        console.log('axioms needs to be added to its particular type here');
        this.showPopup();
    };

    renderResourceDescription = itemOfInterest => {
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const iri = transformIdentifierToPrefixed(this.props.itemContext.identifier, prefixList);
        return (
            <div>
                <StyledSpan>IRI:</StyledSpan>
                <div style={{ marginLeft: '25px' }}>
                    <StyledSpan>{iri}</StyledSpan>
                    <hr style={{ marginTop: 0 }} />
                </div>
                {Object.keys(itemOfInterest.axioms).length > 0 || iri.length > 0 ? (
                    Object.keys(itemOfInterest.axioms).map(axiom => {
                        return (
                            <div key={itemOfInterest.itemIdentifier + axiom}>
                                <div>
                                    <StyledSpan>{axiom.split(':')[1]}</StyledSpan>
                                    {/*<Icon
                                        id={'PopoverAxiom' + itemOfInterest.itemIdentifier}
                                        icon={faPlusCircle}
                                        onMouseEnter={this.onMouseEnter}
                                        onMouseLeave={this.onMouseLeave}
                                        style={{ marginRight: '5px', color: 'gray' }}
                                    />
                                    <div>
                                        <Popover
                                            placement="bottom"
                                            isOpen={this.state.popoverDomainRangePairsOpen}
                                            target={'PopoverAxiom' + itemOfInterest.itemIdentifier}
                                            toggle={this.showPopup}
                                        >
                                            <PopoverHeader>Add {axiom}</PopoverHeader>
                                            <PopoverBody>
                                                {this.objectTypeRestrictions.map(item => {
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
                                                <Button onClick={this.addAxiom}>Ok</Button>
                                                <Button onClick={this.showPopup}>Cancel</Button>
                                            </PopoverBody>
                                        </Popover>
                                    </div>*/}
                                </div>
                                <div>
                                    {Object.keys(itemOfInterest.axioms[axiom]).map(item => {
                                        return (
                                            <div key={itemOfInterest.itemIdentifier + axiom + item} style={{ marginLeft: '1rem' }}>
                                                <StyledSpan> {getPrefixedVersion(itemOfInterest.axioms[axiom][item], this.prefixList)}</StyledSpan>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <StyledSpan>No Description Available</StyledSpan>
                )}
            </div>
        );
    };

    renderDescription = itemOfInterest => {
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
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const iri = transformIdentifierToPrefixed(this.props.itemContext.identifier, prefixList);
        return (
            <div style={{ overflow: 'hidden' }}>
                <div>
                    <StyledSpan>IRI:</StyledSpan>
                    <div style={{ marginLeft: '25px' }}>
                        <StyledSpan>{iri}</StyledSpan>
                        <hr style={{ marginTop: 0 }} />
                    </div>
                    <StyledSpan>Domains</StyledSpan>
                    {/* <Icon
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
                    </div>*/}
                </div>
                {domains.map(domain => (
                    <div key={'domainKey_' + domain} style={{ marginLeft: '1rem' }}>
                        <StyledSpan>{domain}</StyledSpan>
                        {/* <Icon
                            icon={faTimesCircle}
                            onClick={event => this.deleteDomain(event, domain)}
                            style={{ marginRight: '5px', float: 'right' }}
                        />*/}
                        <hr style={{ marginTop: 0 }} />
                    </div>
                ))}
                <div>
                    <StyledSpan>Ranges</StyledSpan>
                    {/* <Icon
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
                    </div>*/}
                </div>
                {/*{ranges.map(range => (
                     <div key={'domainKey_' + range} style={{ marginLeft: '1rem' }}>
                        {range}
                        <Icon icon={faTimesCircle} onClick={event => this.deleteRange(event, range)} style={{ marginRight: '5px', float: 'right' }} />
                        <hr style={{ marginTop: 0 }} />
                    </div>
                ))}*/}
            </div>
        );
    };

    render() {
        return (
            <div style={{ backgroundColor: PRIMARY.lighter, height: '250px', borderTop: 'none', overflow: 'auto' }}>
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
    callback: PropTypes.func.isRequired,
    redux_editRelation: PropTypes.func.isRequired,
    redux_editResource: PropTypes.func.isRequired,
    metaInformation: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

const mapDispatchToProps = dispatch => ({
    redux_editRelation: data => dispatch(redux_editRelation(data)),
    redux_editResource: data => dispatch(redux_editResource(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardWidgetVis);

const StyledSpan = styled.span`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
