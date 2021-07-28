import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrefixedVersion } from '../../mappers/helperFunctions';
import { transformIdentifierToPrefixed, transformRelationToTTL } from '../../mappers/RelationToTTL';
import { Button, Card, CardBody, Collapse, Popover, PopoverHeader, PopoverBody, CustomInput, Input } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight, faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
class CardWidgetVis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: false,
            collapseAnnotations: true,
            collapseDescription: true,
            popoverOpen: false,
            popoverCharacteristicsOpen: false,
            checkedItems: new Map()
        };
        this.characteristics = ['Functional', 'Inverse functional', 'Transitive', 'Symmetric', 'Asymmetric', 'Reflexive', 'Irreflexive'];
        this.prefixList = this.props.rrModel.metaInformation.prefixList.longToShort;
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

    addAnnotation = event => {
        event.stopPropagation();
    };

    toggle = () => {
        this.setState({ popoverOpen: !this.state.popoverOpen });
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
                            onClick={this.addAnnotation}
                            icon={faPlusCircle}
                            style={{ float: 'right', marginTop: '3px', marginRight: '5px', color: 'white' }}
                        />
                        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                            <PopoverHeader>Add Annotation</PopoverHeader>
                            <PopoverBody> (In Progress) annotation to be selected and added here</PopoverBody>
                        </Popover>
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

    deleteItem = (event, item) => {
        event.stopPropagation();
        console.log('To be deleted ', item);
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
                    style={{ display: 'block' }}
                    onClick={event => {
                        console.log('Improvement: Maybe change background color to show it as selected');
                    }}
                >
                    <Icon
                        icon={faTimesCircle}
                        onClick={e => {
                            this.deleteItem(e, item);
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

    handleCheck = (event, item) => {
        const isChecked = event.target.checked;
        console.log(item);
        console.log(isChecked);
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    };

    renderCharacteristics = itemOfInterest => {
        const typeOfRelation = itemOfInterest.type[0].split(':')[1];
        console.log(typeOfRelation);
        if (typeOfRelation === 'DatatypeProperty') {
            return (
                <div>
                    Characteristics (0/1)
                    <div style={{ float: 'right' }}>
                        <CustomInput id={'checkbox'} type={'checkbox'}>
                            Functional
                        </CustomInput>
                    </div>
                </div>
            );
        } else if (typeOfRelation === 'ObjectProperty') {
            return (
                <div>
                    Characteristics (0/1)
                    <div style={{ float: 'right' }}>
                        <Icon
                            id="Popover2"
                            onClick={this.addAnnotation}
                            icon={faPlusCircle}
                            style={{ float: 'right', marginTop: '3px', marginRight: '5px', color: 'white' }}
                        />
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
                                            onChange={event => this.handleCheck(event, item)}
                                        >
                                            {item}
                                        </CustomInput>
                                    );
                                })}
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

        return (
            <div style={{ overflow: 'hidden' }}>
                <div>
                    Domains{'  '}
                    <Icon
                        onClick={() => {
                            alert('Great things will happen here');
                        }}
                        icon={faPlusCircle}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        style={{ marginRight: '5px', color: 'gray' }}
                    />
                </div>
                {domains.map(domain => (
                    <div key={'domainKey_' + domain} style={{ marginLeft: '1rem' }}>
                        {domain}
                        <Icon
                            icon={faTimesCircle}
                            onClick={e => {
                                console.log('Delete Domain');
                            }}
                            style={{ marginRight: '5px', float: 'right' }}
                        />
                        <hr style={{ marginTop: 0 }} />
                    </div>
                ))}
                <div>
                    Ranges{'  '}
                    <Icon
                        onClick={() => {
                            alert('Great things will happen here');
                        }}
                        icon={faPlusCircle}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        style={{ marginRight: '5px', color: 'gray' }}
                    />
                </div>
                {ranges.map(range => (
                    <div key={'domainKey_' + range} style={{ marginLeft: '1rem' }}>
                        {range}
                        <Icon
                            icon={faTimesCircle}
                            onClick={e => {
                                console.log('Delete Range');
                            }}
                            style={{ marginRight: '5px', float: 'right' }}
                        />
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
    isExpanded: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardWidgetVis);
