import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrefixedVersion } from '../../mappers/helperFunctions';
import { transformIdentifierToPrefixed } from '../../mappers/RelationToTTL';
import { Card, CardBody } from 'reactstrap';
import { withTheme } from '@emotion/react';
import { StyledCardWidgetVisSpan } from 'styledComponents/styledComponents';
class CardWidgetVis extends Component {
    constructor(props) {
        super(props);
        this.prefixList = this.props.rrModel.metaInformation.prefixList.longToShort;
    }

    componentDidMount() {}

    componentDidUpdate = (prevProps, prevState) => {};

    componentWillUnmount() {}

    renderWidget = () => {
        if (this.props.itemType === 'Relation') {
            return this.renderRelationWidget();
        } else {
            return this.renderResourceWidget();
        }
    };

    renderResourceWidget = () => {
        const itemOfInterest = this.props.itemContext;
        const { theme } = this.props;
        return (
            <div>
                <Card
                    style={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        width: '100%',
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary
                    }}
                >
                    <StyledCardWidgetVisSpan style={{ fontWeight: 'bold' }}>Description :</StyledCardWidgetVisSpan>
                    <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>
                        {this.renderResourceDescription(itemOfInterest)}
                    </CardBody>
                </Card>
            </div>
        );
    };

    renderRelationWidget = () => {
        //const itemIdentifier = this.props.itemIdentifier;
        const itemOfInterest = this.props.itemContext;
        const { theme } = this.props;
        return (
            <div>
                {/*<div key={'description' + itemIdentifier} className="root" style={{ padding: '2px 5px' }}>*/}
                <Card
                    style={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        width: '100%',
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary
                    }}
                >
                    <StyledCardWidgetVisSpan style={{ fontWeight: 'bold' }}>Description :</StyledCardWidgetVisSpan>
                    <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>{this.renderDescription(itemOfInterest)}</CardBody>
                </Card>
                {/*</div>*/}
            </div>
        );
    };

    renderResourceDescription = itemOfInterest => {
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const iri = transformIdentifierToPrefixed(this.props.itemContext.identifier, prefixList);
        return (
            <div>
                <StyledCardWidgetVisSpan>IRI:</StyledCardWidgetVisSpan>
                <div style={{ marginLeft: '25px' }}>
                    <StyledCardWidgetVisSpan>{iri}</StyledCardWidgetVisSpan>
                    <hr style={{ marginTop: 0 }} />
                </div>
                {Object.keys(itemOfInterest.axioms).length > 0 || iri.length > 0 ? (
                    Object.keys(itemOfInterest.axioms).map((axiom, index) => {
                        return (
                            <div key={itemOfInterest.itemIdentifier + axiom + index}>
                                <div>
                                    <StyledCardWidgetVisSpan>{axiom.split(':')[1]}</StyledCardWidgetVisSpan>
                                </div>
                                <div>
                                    {Object.keys(itemOfInterest.axioms[axiom]).map((item, subIndex) => {
                                        return (
                                            <div key={itemOfInterest.itemIdentifier + axiom + item + subIndex} style={{ marginLeft: '1rem' }}>
                                                <StyledCardWidgetVisSpan> {getPrefixedVersion(itemOfInterest.axioms[axiom][item], this.prefixList)}</StyledCardWidgetVisSpan>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <StyledCardWidgetVisSpan>No Description Available</StyledCardWidgetVisSpan>
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
                    <StyledCardWidgetVisSpan>IRI:</StyledCardWidgetVisSpan>
                    <div style={{ marginLeft: '25px' }}>
                        <StyledCardWidgetVisSpan>{iri}</StyledCardWidgetVisSpan>
                        <hr style={{ marginTop: 0 }} />
                    </div>
                    <StyledCardWidgetVisSpan>Domains</StyledCardWidgetVisSpan>
                </div>
                {domains.map((domain, index) => (
                    <div key={'domainKey_' + domain + index} style={{ marginLeft: '1rem' }}>
                        <StyledCardWidgetVisSpan>{domain}</StyledCardWidgetVisSpan>
                        <hr style={{ marginTop: 0 }} />
                    </div>
                ))}
                <div>
                    <StyledCardWidgetVisSpan>Ranges</StyledCardWidgetVisSpan>
                </div>
                {ranges.map((range, index) => (
                    <div key={'domainKey_' + range + index} style={{ marginLeft: '1rem' }}>
                        {range}
                    </div>
                ))}
            </div>
        );
    };

    render() {
        const { theme } = this.props;
        return (
            <div
                style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, borderTop: 'none', overflow: 'auto' }}
            >
                {this.props.isExpanded && <div style={{ display: 'block' }}>{this.renderWidget()}</div>}
            </div>
        );
    }
}
CardWidgetVis.propTypes = {
    height: PropTypes.number,
    itemIdentifier: PropTypes.string,
    itemType: PropTypes.string.isRequired,
    rrModel: PropTypes.object.isRequired,
    itemContext: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    callback: PropTypes.func,
    metaInformation: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CardWidgetVis));
