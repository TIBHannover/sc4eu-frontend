import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Collapse, Container, Input } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faChevronCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import styled, { keyframes } from 'styled-components';
import Tippy from '@tippyjs/react';
import { connect } from 'react-redux';
import { PRIMARY, SECONDARY } from '../../styledComponents/styledComponents';

class RightSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            expanded: this.props.initialState,
            minHeight: 200,
            title: props.title,
            initialRendering: true,
            collapse: true,
            collapseMetaInfo: true,
            isEditing: { description: false, title: false, version: false, iri: false },
            openOntology: props.ontologyName,
            openProject: props.project
        };
    }

    componentDidMount() {
        document.body.style.overflowX = 'hidden';
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.expanded !== this.state.expanded) {
            this.setState({ initialRendering: false });
        }

        // check required height TODO
        this.props.heightUpdateEvent();
    };

    componentWillUnmount() {
        document.body.style.overflowX = 'auto';
    }

    collapseSidebar = () => {
        this.props.updateEvent(!this.state.expanded);
        this.setState({ expanded: !this.state.expanded });
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    toggleMetaInformation = () => {
        this.setState({ collapseMetaInfo: !this.state.collapseMetaInfo });
    };

    renderMetaInformation = () => {
        const metaInformation = this.props.metaInformation;

        return Object.keys(metaInformation).map(key => {
            if (key === 'metaDescriptions') {
                return (
                    <div key={'metaInformation_' + key} className="root" style={{ padding: '0 10px' }}>
                        <Button
                            onClick={() => this.toggleMetaInformation()}
                            style={{ marginTop: '5px', width: '100%', textAlign: 'left', fontWeight: 'bold', backgroundColor: SECONDARY.dark }}
                        >
                            <Icon icon={this.state.collapseMetaInfo ? faChevronCircleRight : faChevronCircleDown} style={{ marginRight: '5px' }} />
                            Meta Information
                        </Button>
                        <Collapse isOpen={!this.state.collapseMetaInfo}>
                            <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                                <CardBody style={{ padding: '5px', width: '100%', overflow: 'hidden' }}>
                                    <table style={{ width: '100%' }}>
                                        <tbody>{this.renderMetaDescription(metaInformation[key])}</tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                );
            } else if (key === 'prefixList') {
                return (
                    <div key={'prefixList' + key} className="root" style={{ padding: '0 10px' }}>
                        <Button
                            onClick={() => this.toggle()}
                            style={{ marginTop: '5px', width: '100%', textAlign: 'left', fontWeight: 'bold', backgroundColor: SECONDARY.dark }}
                        >
                            <Icon icon={this.state.collapse ? faChevronCircleRight : faChevronCircleDown} style={{ marginRight: '5px' }} />
                            Prefix List
                        </Button>
                        <Collapse isOpen={!this.state.collapse}>
                            <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                                <CardBody style={{ padding: '0 5px', paddingBottom: '5px', width: '100%', overflow: 'hidden' }}>
                                    <table id="simple-board" style={{ backgroundColor: 'solid black', width: '100%' }}>
                                        <tbody key={'prefixTable_' + key} style={{}}>
                                            <tr key={'prefixRow_' + key}>
                                                <td>
                                                    <b>Prefix</b>
                                                </td>
                                                <td style={{ paddingLeft: '10px' }}>
                                                    <b>IRI</b>
                                                </td>
                                            </tr>
                                            {this.renderPrefixList(metaInformation[key])}
                                        </tbody>
                                    </table>
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

    renderMetaDescription = obj => {
        let keyIndex = 0;
        return Object.keys(obj).map(itemKey => {
            const metaDescriptionsItem = obj[itemKey];
            if (itemKey === 'description' || itemKey === 'title') {
                return Object.keys(metaDescriptionsItem).map(language => {
                    const itemPerLan = metaDescriptionsItem[language] + ' @' + language;
                    const itemValueInLang = metaDescriptionsItem[language];
                    return (
                        <tr style={{ fontSize: '12px' }} key={'description_title_' + itemKey + keyIndex++}>
                            <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                                <div style={{ float: 'left' }}>
                                    <b>{itemKey}:</b>
                                </div>
                            </td>
                            <td suppressContentEditableWarning={true} contentEditable={this.state.isEditing[itemKey]}>
                                {!this.state.isEditing[itemKey] ? itemPerLan : <Input defaultValue={itemValueInLang} />}
                            </td>
                        </tr>
                    );
                });
            } else if (itemKey === 'iri' || itemKey === 'version') {
                return (
                    <tr style={{ fontSize: '12px' }} key={'iri_version_' + itemKey + keyIndex++}>
                        <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                            <div style={{ float: 'left' }}>
                                <b>{itemKey}:</b>
                            </div>
                        </td>
                        <td suppressContentEditableWarning={true} contentEditable={this.state.isEditing[itemKey]}>
                            {!this.state.isEditing[itemKey] ? obj[itemKey] : <Input defaultValue={obj[itemKey]} />}
                        </td>
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
                    <tr key={'prefix_' + shortKey} style={{ borderBottom: '1px solid', width: '100%', fontSize: '12px' }}>
                        <td style={{ textAlign: 'left' }}>{shortKey}:</td>
                        <Tippy content={shortToLongValues[shortKey]}>
                            <td
                                style={{
                                    maxWidth: '94%',
                                    whiteSpace: 'nowrap',
                                    display: 'block',
                                    paddingLeft: '10px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
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

    render() {
        return (
            <ContentContainer
                id="RightSidebarContainer"
                expanded={this.state.expanded}
                width={this.props.width}
                initialRendering={this.state.initialRendering}
                style={{ width: this.props.width, position: 'absolute', height: this.props.height + 'px' }}
            >
                <Container
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderBottomRightRadius: '0',
                        borderBottomLeftRadius: '0',
                        height: '50px',
                        marginLeft: '5px',
                        color: 'white',
                        backgroundColor: PRIMARY.dark,
                        marginTop: '8px'
                    }}
                >
                    <h4 style={{ width: this.props.width - 10, textAlign: 'center' }}>{this.state.title}</h4>
                </Container>
                <ButtonContainer
                    size="sm"
                    className="btn-primary"
                    expanded={this.state.expanded}
                    initialRendering={this.state.initialRendering}
                    duration={500}
                    style={{
                        margin: '0 0',
                        flexGrow: '1',
                        display: 'flex',
                        alignSelf: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '30px',
                        padding: 0,
                        border: 'solid 1px',
                        borderColor: '#525252',
                        backgroundColor: SECONDARY.dark,
                        float: 'left',
                        position: 'relative',
                        top: '-15px',
                        left: '-8px',
                        zIndex: 100
                    }}
                    onClick={this.collapseSidebar}
                >
                    <Icon icon={faAngleLeft} rotation={180} className="align-self-center" style={{ marginLeft: '7px', fontSize: '28px' }} />
                </ButtonContainer>
                <Container
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderTopRightRadius: '0',
                        borderTopLeftRadius: '0',
                        marginLeft: '5px',
                        color: 'black',
                        backgroundColor: '#ffffff',
                        marginTop: '-1px',
                        height: this.props.height + 'px',
                        position: 'absolute'
                        // zIndex: -500
                    }}
                >
                    <div style={{ width: this.props.width - 5, marginTop: '20px', marginLeft: '15px', display: 'inline-block' }}>
                        <span style={{ fontSize: '20px', fontWeight: 600 }}>Project Name: </span>
                        <span>{this.state.openProject.name}</span>
                        <br />
                        <span style={{ fontSize: '20px', fontWeight: 600 }}>Ontology Name: </span>
                        <span>{this.state.openOntology}</span>
                    </div>
                    <div style={{ width: this.props.width - 5, marginTop: '20px', marginLeft: '15px' }}>
                        <span style={{ fontSize: '20px', fontWeight: 600 }}>Git Hub </span>
                        <p>Git URL:</p>
                        <p>Licence:</p>
                        <p>Version:</p>
                    </div>
                    <div style={{ width: this.props.width - 5 }}>{this.renderMetaInformation()}</div>
                </Container>
            </ContentContainer>
        );
    }
}

RightSideBar.propTypes = {
    title: PropTypes.string,
    updateEvent: PropTypes.func.isRequired,
    initialState: PropTypes.bool.isRequired,
    heightUpdateEvent: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    metaInformation: PropTypes.object,
    ontologyName: PropTypes.string,
    project: PropTypes.object
};

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

export default connect(mapStateToProps)(RightSideBar);

const expandButtonAnimation = ({ expanded, initialRendering }) => {
    if (!initialRendering) {
        return keyframes`
  from {
    transform: rotate(${expanded ? -180 : 0}deg);
  }
  to {
    transform: rotate(${expanded ? 0 : 180}deg);
   
  }
`;
    }
    if (initialRendering) {
        return keyframes``;
    }
};

const ButtonContainer = styled.div`
    animation-name: ${expandButtonAnimation};
    animation-duration: 1000ms;
    cursor: pointer;
    transform: rotate(${props => (props.expanded ? 0 : 180)}deg);
`;

const expandContentContainerAnimation = ({ expanded, width, initialRendering }) => {
    if (initialRendering) {
        return keyframes``;
    } else {
        return keyframes`
  from {
    right: ${expanded ? -(width - 10) : 8}px;
  }
  to {
    right: ${expanded ? 8 : -(width - 10)}px;
   
  }
`;
    }
};

const ContentContainer = styled.aside`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    right: ${props => (props.expanded ? 8 : -(props.width - 10))}px;
`;
