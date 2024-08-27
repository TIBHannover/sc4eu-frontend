import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrefixedVersion } from '../../mappers/helperFunctions';
import { transformIdentifierToPrefixed } from '../../mappers/RelationToTTL';
import { Card, CardBody } from 'reactstrap';
import styled from 'styled-components';
import { fontStyled } from '../../styledComponents/styledFont';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { PRIMARY } from '../RRView/StyledComponents';

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

        return (
            <div>
                <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, width: '100%', background: PRIMARY.lighter }}>
                    <StyledSpan style={{ fontWeight: 'bold' }}>Description :</StyledSpan>
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

        return (
            <div>
                {/*<div key={'description' + itemIdentifier} className="root" style={{ padding: '2px 5px' }}>*/}
                <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, width: '100%', background: PRIMARY.lighter }}>
                    <StyledSpan style={{ fontWeight: 'bold' }}>Description :</StyledSpan>
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
                <StyledSpan>IRI:</StyledSpan>
                <div style={{ marginLeft: '25px' }}>
                    <StyledSpan>{iri}</StyledSpan>
                    <hr style={{ marginTop: 0 }} />
                </div>
                {Object.keys(itemOfInterest.axioms).length > 0 || iri.length > 0 ? (
                    Object.keys(itemOfInterest.axioms).map((axiom, index) => {
                        return (
                            <div key={itemOfInterest.itemIdentifier + axiom + index}>
                                <div>
                                    <StyledSpan>{axiom.split(':')[1]}</StyledSpan>
                                </div>
                                <div>
                                    {Object.keys(itemOfInterest.axioms[axiom]).map((item, subIndex) => {
                                        return (
                                            <div key={itemOfInterest.itemIdentifier + axiom + item + subIndex} style={{ marginLeft: '1rem' }}>
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
                </div>
                {domains.map((domain,index) => (
                    <div key={'domainKey_' + domain + index} style={{ marginLeft: '1rem' }}>
                        <StyledSpan>{domain}</StyledSpan>
                        <hr style={{ marginTop: 0 }} />
                    </div>
                ))}
                <div>
                    <StyledSpan>Ranges</StyledSpan>
                </div>
                {ranges.map((range,index) => (
                    <div key={'domainKey_' + range + index} style={{ marginLeft: '1rem' }}>
                        {range}
                    </div>
                ))}
            </div>
        );
    };

    render() {
        return (
            <div style={{ backgroundColor: PRIMARY.lighter, borderTop: 'none', overflow: 'auto' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardWidgetVis);

const StyledSpan = styled.span`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
