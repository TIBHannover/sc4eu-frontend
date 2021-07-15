import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCaretDown, faCaretRight, faPen } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import { Collapse, Button, Card, CardBody } from 'reactstrap';
import { redux_editMetaInfo } from '../../redux/actions/rrm_actions';
import Tippy from '@tippyjs/react';

// import TabLikeHeader from './TabLikeHeader';

export class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.initialState,
            minHeight: 200,
            title: props.title,
            initialRendering: true,
            collapse: true,
            collapseMetaInfo: true,
            isEditing: { description: false, title: false, version: false, iri: false }
        };
    }

    componentDidMount() {}

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.expanded !== this.state.expanded) {
            this.setState({ initialRendering: false });
        }
    };

    collapseLeftSideBar = () => {
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

        const results = Object.keys(metaInformation).map(key => {
            if (key === 'metaDescriptions') {
                return (
                    <div key={'metaInformatin_' + key} className="root" style={{ paddingLeft: '-5px' }}>
                        <Button
                            color="primary"
                            onClick={() => this.toggleMetaInformation()}
                            style={{ marginTop: '5px', width: '100%', textAlign: 'left' }}
                        >
                            <Icon icon={this.state.collapseMetaInfo ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                            Meta Information
                        </Button>
                        <Collapse isOpen={!this.state.collapseMetaInfo}>
                            <Card>
                                <CardBody style={{ paddingLeft: '5px', width: '100%', overflow: 'hidden' }}>
                                    <table>
                                        <tbody>{this.renderMetaDescription(metaInformation[key])}</tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Collapse>
                    </div>
                );
                //return this.renderMetaDescription(metaInformation[key]);
            } else if (key === 'prefixList') {
                return (
                    <div key={'prefixList' + key} className="root" style={{ paddingLeft: '0px' }}>
                        <Button color="primary" onClick={() => this.toggle()} style={{ marginTop: '5px', width: '100%', textAlign: 'left' }}>
                            <Icon icon={this.state.collapse ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                            Prefix
                        </Button>
                        <Collapse isOpen={!this.state.collapse}>
                            <Card>
                                <CardBody style={{ paddingLeft: '5px', width: '100%', overflow: 'hidden' }}>
                                    <table id="simple-board" style={{ backgroundColor: 'solid black' }}>
                                        <tbody key={'prefixTable_' + key}>
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
                //return this.renderPrefixList(metaInformation[key]);
            } else {
                return <>No Meta Information Available</>;
            }
        });

        return results;
    };

    updateText = (event, itemKey, language) => {
        const metaInformation = { ...this.props.metaInformation };
        if (itemKey === 'iri' || itemKey === 'version') {
            metaInformation['metaDescriptions'][itemKey] = event.target.textContent;
            this.props.redux_editMetaInfo(metaInformation);
        } else if (itemKey === 'description' || itemKey === 'title') {
            //remove ' @en"
            const text = event.target.textContent.slice(0, -4);
            metaInformation['metaDescriptions'][itemKey][language] = text;
            this.props.redux_editMetaInfo(metaInformation);
        }
    };

    toggleEditButton = itemToToggle => {
        this.setState({ isEditing: { ...this.state.isEditing, [itemToToggle]: !this.state.isEditing[itemToToggle] } });
    };

    renderMetaDescription = obj => {
        let keyIndex = 0;
        const results = Object.keys(obj).map(itemKey => {
            const metaDescriptionsItem = obj[itemKey];
            if (itemKey === 'description' || itemKey === 'title') {
                return Object.keys(metaDescriptionsItem).map(language => {
                    const itemPerLan = metaDescriptionsItem[language] + ' @' + language;
                    return (
                        <tr style={{ fontSize: '12px' }} key={'description_title_' + itemKey + keyIndex++}>
                            <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                                <div style={{ float: 'left' }}>
                                    <Button
                                        title="Edit Relation"
                                        color="black"
                                        size="sm"
                                        style={{ padding: '0px', paddingRight: '5px' }}
                                        onClick={() => {
                                            this.toggleEditButton(itemKey);
                                        }}
                                    >
                                        <Icon icon={faPen} color={this.state.isEditing[itemKey] ? 'black' : 'gray'} />
                                    </Button>
                                    <b>{itemKey}:</b>
                                </div>
                            </td>
                            <td
                                suppressContentEditableWarning={true}
                                contentEditable={this.state.isEditing[itemKey]}
                                onBlur={event => this.updateText(event, itemKey, language)}
                            >
                                {itemPerLan}
                            </td>
                        </tr>
                    );
                });
            } else if (itemKey === 'iri' || itemKey === 'version') {
                return (
                    <tr style={{ fontSize: '12px' }} key={'iri_version_' + itemKey + keyIndex++}>
                        <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                            <div style={{ float: 'left' }}>
                                <Button
                                    title="Edit Relation"
                                    color="black"
                                    size="sm"
                                    style={{ padding: '0px', paddingRight: '5px' }}
                                    onClick={() => {
                                        this.toggleEditButton(itemKey);
                                    }}
                                >
                                    <Icon icon={faPen} color={this.state.isEditing[itemKey] ? 'black' : 'gray'} />
                                </Button>
                                <b>{itemKey}:</b>
                            </div>
                        </td>
                        <td
                            suppressContentEditableWarning={true}
                            contentEditable={this.state.isEditing[itemKey]}
                            onBlur={event => this.updateText(event, itemKey)}
                        >
                            {obj[itemKey]}
                        </td>
                    </tr>
                );
            }
        });
        return results;
    };

    renderPrefixList = obj => {
        const results = Object.keys(obj).map(itemKey => {
            const prefixList = obj[itemKey];
            if (itemKey === 'shortToLong') {
                return Object.keys(prefixList).map(shortKey => {
                    const shortToLong = shortKey + ':' + prefixList[shortKey];
                    return (
                        <tr key={'prefix_' + shortKey} style={{ borderBottom: '1px solid', width: '100%', fontSize: '12px' }}>
                            <td style={{ textAlign: 'left' }}>{shortKey}:</td>
                            <Tippy content={prefixList[shortKey]}>
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
                                    {prefixList[shortKey]}
                                </td>
                            </Tippy>
                        </tr>
                    );
                });
            }
            /*else if (itemKey === 'longToShort') {
                return Object.keys(prefixList).map(longKey => {
                    const longToShort = longKey + ':' + prefixList[longKey];
                    return <div>{longToShort}</div>;
                });
            }*/
            //return <div key={'empty2_' + itemKey} />;
        });

        return results;
    };

    render() {
        return (
            <ContentContainer
                id="LeftSidebarContainer"
                expanded={this.state.expanded}
                initialRendering={this.state.initialRendering}
                width={this.props.width}
                style={{ width: this.props.width, height: this.props.height + 'px', float: 'left', position: 'absolute' }}
            >
                <Container
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderWidth: '1px',
                        borderColor: 'rgb(219,221,229)',
                        borderStyle: 'solid',
                        borderBottomRightRadius: '0',
                        borderBottomLeftRadius: '0',
                        height: '40px',
                        marginLeft: '5px',
                        color: 'white',
                        backgroundColor: '#67a0d0'
                    }}
                >
                    <div style={{ width: this.props.width - 10, textAlign: 'center' }}>{this.state.title}</div>
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
                        backgroundColor: '#8a8a8a',
                        float: 'right',
                        position: 'relative',
                        top: '-11px',
                        left: '19px',
                        zIndex: 100
                    }}
                    onClick={this.collapseLeftSideBar}
                >
                    <Icon icon={faAngleLeft} className="align-self-center" style={{ marginLeft: '5px', fontSize: '28px' }} />
                </ButtonContainer>
                <Container
                    id="leftBodyContainer"
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-0 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderWidth: '1px',
                        borderColor: 'rgb(219,221,229)',
                        borderStyle: 'solid',
                        borderTopRightRadius: '0',
                        borderTopLeftRadius: '0',
                        marginLeft: '5px',
                        color: 'black',
                        backgroundColor: '#ffffff',
                        marginTop: '-1px',
                        position: 'absolute',
                        height: this.props.height + 'px',
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}
                >
                    <div style={{ width: this.props.width - 2, textAlign: 'left' }}>{this.renderMetaInformation()}</div>
                </Container>
            </ContentContainer>
        );
    }
}

LeftSideBar.propTypes = {
    title: PropTypes.string,
    updateEvent: PropTypes.func.isRequired,
    initialState: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    metaInformation: PropTypes.object,
    redux_editMetaInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};
const mapDispatchToProps = dispatch => ({
    redux_editMetaInfo: data => dispatch(redux_editMetaInfo(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(LeftSideBar);

/** CREATE A GREEN LINE**/
/* gray */

const expandButtonAnimation = ({ expanded, initialRendering }) => {
    if (!initialRendering) {
        return keyframes`
  from {
    transform: rotate(${expanded ? 180 : 0}deg);
  }
  to {
    transform: rotate(${expanded ? 0 : -180}deg);
   
  }
`;
    } else {
        return keyframes``;
    }
};

const ButtonContainer = styled.div`
    animation-name: ${expandButtonAnimation};
    animation-duration: 1000ms;
    transform: rotate(${props => (props.expanded ? 0 : 180)}deg);
    cursor: pointer;
`;

const expandContentContainerAnimation = ({ expanded, width, initialRendering }) => {
    if (initialRendering) {
        return keyframes``;
    } else {
        return keyframes`
  from {
    left: ${expanded ? -width : 0}px;
  }
  to {
    left: ${expanded ? 0 : -width}px;
   
  }
`;
    }
};

const ContentContainer = styled.div`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    // opacity: 0.5;
    left: ${props => (props.expanded ? 0 : -props.width)}px;
`;
