import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faChevronCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, CardBody, Collapse, Table } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { fontStyled } from '../../styledComponents/styledFont';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { colorStyled } from '../../styledComponents/styledColor';
import Tippy from '@tippyjs/react';

const ModalFooter = styled.div`
    height: 60px;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    border-top: 1px solid #ccc;
`;

const CloseButton = styled(Button)`
    float: right;
    font-weight: bold;
`;

class MetaDataModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            collapseComparison: false,
            collapseMetaInfo: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            collapse: !prevState.collapse
        }));
    };

    toggleMetaInformation = () => {
        this.setState(prevState => ({
            collapseMetaInfo: !prevState.collapseMetaInfo
        }));
    };

    renderMetaDescription = obj => {
        let keyIndex = 0;
        return Object.keys(obj).map(itemKey => {
            const metaDescriptionsItem = obj[itemKey];
            if (itemKey === 'description' || itemKey === 'title') {
                return Object.keys(metaDescriptionsItem).map(language => {
                    const itemValueInLang = metaDescriptionsItem[language];

                    return (
                        <tr key={'description_title_' + itemKey + keyIndex++}>
                            <th style={{ textAlign: 'left' }}>{itemKey}:</th>
                            <td style={{ textAlign: 'left' }}>{itemValueInLang}</td>
                        </tr>
                    );
                });
            } else if (itemKey === 'iri' || itemKey === 'version') {
                return (
                    <tr key={'iri_version_' + itemKey + keyIndex++}>
                        <th style={{ textAlign: 'left' }}>{itemKey}</th>
                        <td style={{ textAlign: 'left' }}>{obj[itemKey]}</td>
                    </tr>
                );
            }
            return <tr key={itemKey + keyIndex + '_ERROR'}>{/*<td>ERROR HERE</td>*/}</tr>;
        });
    };

    renderPrefixList = obj => {
        if (obj.hasOwnProperty('shortToLong')) {
            const shortToLongValues = obj['shortToLong'];
            return Object.keys(shortToLongValues).map(shortKey => {
                // const shortToLong = shortKey + ':' + prefixList[shortKey];
                return (
                    <tr key={'prefix_' + shortKey}>
                        <td style={{ textAlign: 'left' }}>{shortKey}:</td>
                        <Tippy content={shortToLongValues[shortKey]}>
                            <td
                                style={{
                                    justifyContent: 'start',
                                    display: 'flex',
                                    overflow: 'hidden'
                                }}
                            >
                                {shortToLongValues[shortKey]}
                            </td>
                        </Tippy>
                    </tr>
                );
            });
        } else {
            return <div>No Prefix List provided :(</div>;
        }
    };

    renderMetaInformation = () => {
        const metaInformation = this.props.metaInformation;

        return Object.keys(metaInformation).map(key => {
            if (key === 'metaDescriptions') {
                return (
                    <div key={'metaInformation_' + key} className="root" style={{ padding: '0 10px' }}>
                        <StyledButton onClick={() => this.toggleMetaInformation()}>
                            <StyledIcon icon={this.state.collapseMetaInfo ? faChevronCircleRight : faChevronCircleDown} />
                            Meta Information
                        </StyledButton>
                        <Collapse isOpen={!this.state.collapseMetaInfo}>
                            <Card>
                                <CardBody>
                                    <Table striped>
                                        <tbody>{this.renderMetaDescription(metaInformation[key])}</tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                );
            } else if (key === 'prefixList') {
                return (
                    <div key={'prefixList' + key} className="root" style={{ padding: '0 10px' }}>
                        <StyledButton onClick={() => this.toggle()}>
                            <StyledIcon icon={this.state.collapse ? faChevronCircleRight : faChevronCircleDown} />
                            Ontology Prefixes
                        </StyledButton>
                        <Collapse isOpen={!this.state.collapse}>
                            <Card>
                                <CardBody style={{ padding: '0 5px' }}>
                                    <Table striped id="simple-board">
                                        <thead key={'prefixTable_' + key}>
                                            <tr key={'prefixRow_' + key}>
                                                <th style={{ textAlign: 'left' }}>Prefix</th>
                                                <th style={{ textAlign: 'left' }}>IRI</th>
                                            </tr>
                                        </thead>
                                        <tbody> {this.renderPrefixList(metaInformation[key])}</tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                );
            } else {
                return <>No Meta Information Available</>;
            }
        });
    };

    render() {
        return (
            <div>
                <Modal open={this.props.isModalOpen} onClose={this.props.toggle} aria-labelledby="modal-title" aria-describedby="modal-description">
                    <Box
                        sx={{
                            position: 'absolute',
                            padding: 0,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '70%',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            paddingLeft: 4,
                            paddingRight: 4,
                            borderRadius: 3,
                            textAlign: 'center',
                            maxHeight: '90%', // Add maximum height
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div
                            style={{
                                height: '60px',
                                color: '#000000',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottom: '1px solid #ccc'
                            }}
                        >
                            <h3>Metadata Information</h3>
                        </div>
                        <div style={{ height: 'calc(100% - 120px)', overflow: 'auto' }}>{this.renderMetaInformation()}</div>
                        <ModalFooter>
                            <div style={{ textAlign: 'right' }}>
                                <CloseButton onClick={this.props.toggle}>Close</CloseButton>
                            </div>
                        </ModalFooter>
                    </Box>
                </Modal>
            </div>
        );
    }
}

MetaDataModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    metaInformation: PropTypes.object
};

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

export default connect(mapStateToProps)(MetaDataModal);

const StyledIcon = styled(Icon)`
    font-size: ${fontStyled.fontSize.NormalText};
    margin-right: 5px;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledButton = styled(Button)`
    margin-top: 5px;
    height: 40px;
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-size: ${fontStyled.fontSize.NormalText};
    background-color: ${colorStyled.SECONDARY.dark};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
