import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCaretDown, faCaretRight, faPen } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

import { Collapse, Button, Card, CardBody, Input } from 'reactstrap';
import { redux_editMetaInfo } from '../../redux/actions/rrm_actions';
import Tippy from '@tippyjs/react';
import { reverse } from 'named-urls';
import { Link } from 'react-router-dom';
import ROUTES from '../../constants/routes';

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
            //addIrIModal: false,
            //prefix: '',
            //iri: ''
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

    /* reverselongtoShort(obj) {
         const values = Object.values(obj);
         const keys = Object.keys(obj);
         const result = {};
         values.forEach((value, index) => {
             if (!result.hasOwnProperty(value)) {
                 // create new entry
                 result[value] = keys[index];
             } else {
                 // duplicate property, create array
                 const temp = [];
                 // get first value
                 temp.push(result[value]);
                 // add second value
                 temp.push(keys[index]);
                 // set value
                 result[value] = temp;
             }
         });
         console.log(result);
         return result;
     }
  handleAddIrI = () => {
         const newShortToLong = { shortToLong: { [this.state.prefix]: this.state.iri } };
         const newLongToShort = { longToShort: this.reverselongtoShort(newShortToLong.shortToLong) };
         const newprefixList = $.extend({}, newShortToLong, newLongToShort);
         const newMetaInformation = { metaDescriptions: {}, prefixList: newprefixList };
         this.props.redux_addMetaInfo(newMetaInformation);
     }; */

    renderMetaInformation = () => {
        const metaInformation = this.props.metaInformation;
        //const addIrItoggle = () => this.setState({ addIrIModal: !this.state.addIrIModal });

        return Object.keys(metaInformation).map(key => {
            if (key === 'metaDescriptions') {
                return (
                    <div key={'metaInformation_' + key} className="root" style={{ padding: '0 10px' }}>
                        <Button
                            color="primary"
                            onClick={() => this.toggleMetaInformation()}
                            style={{ marginTop: '5px', width: '100%', textAlign: 'left' }}
                        >
                            <Icon icon={this.state.collapseMetaInfo ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
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
                //return this.renderMetaDescription(metaInformation[key]);
            } else if (key === 'prefixList') {
                return (
                    <div key={'prefixList' + key} className="root" style={{ padding: '0 10px' }}>
                        <Button color="primary" onClick={() => this.toggle()} style={{ marginTop: '5px', width: '100%', textAlign: 'left' }}>
                            <Icon icon={this.state.collapse ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                            Prefix List
                        </Button>
                        <Collapse isOpen={!this.state.collapse}>
                            <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginLeft: '1%', width: '98%' }}>
                                <CardBody style={{ padding: '0 5px', paddingBottom: '5px', width: '100%', overflow: 'hidden' }}>
                                    {/*  <Button style={{ float: 'right', marginTop: '10px' }} color="primary" onClick={addIrItoggle}>
                                         Add IRI
                                     </Button>
                                     <Modal isOpen={this.state.addIrIModal} toggle={addIrItoggle}>
                                         <ModalHeader toggle={addIrItoggle}>Add New IRI</ModalHeader>
                                         <ModalBody>
                                             <Form>
                                                 <label>Prefix</label>
                                                 <Input
                                                     type="text"
                                                     placeholder="ex"
                                                     name="prefix"
                                                     value={this.state.prefix}
                                                     onChange={event => this.setState({ prefix: event.target.value })}
                                                 />
                                                 <label>IRI</label>
                                                 <Input
                                                     type="text"
                                                     placeholder="http://purl.org/dc/elements/1.1/"
                                                     name="iri"
                                                     value={this.state.iri}
                                                     onChange={event => this.setState({ iri: event.target.value })}
                                                 />
                                             </Form>
                                         </ModalBody>
                                         <ModalFooter>
                                             <Button color="primary" onClick={this.handleAddIrI}>
                                                 Add
                                             </Button>
                                             <Button color="primary" onClick={addIrItoggle}>
                                                 Close
                                             </Button>
                                         </ModalFooter>
                                     </Modal>*/}
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
                //return this.renderPrefixList(metaInformation[key]);
            } else {
                return <>No Meta Information Available</>;
            }
        });
    };

    updateText = (event, itemKey, language) => {
        const metaInformation = { ...this.props.metaInformation };
        if (itemKey === 'iri' || itemKey === 'version') {
            metaInformation['metaDescriptions'][itemKey] = event.target.value;
            this.props.redux_editMetaInfo(metaInformation);
        } else if (itemKey === 'description' || itemKey === 'title') {
            //remove ' @en"
            metaInformation['metaDescriptions'][itemKey][language] = event.target.value;
            console.log('THIS SHOULD UPDATE THE REDUX', metaInformation);
            this.props.redux_editMetaInfo(metaInformation);
        }
    };

    toggleEditButton = itemToToggle => {
        this.setState({ isEditing: { ...this.state.isEditing, [itemToToggle]: !this.state.isEditing[itemToToggle] } });
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
                                    {/*  <Button
                                        title="Edit Relation"
                                        color="black"
                                        size="sm"
                                        style={{ padding: '0px', paddingRight: '5px' }}
                                        onClick={() => {
                                            this.toggleEditButton(itemKey);
                                        }}
                                    >
                                        <Icon icon={faPen} color={this.state.isEditing[itemKey] ? 'black' : 'gray'} />
                                    </Button> */}
                                    <b>{itemKey}:</b>
                                </div>
                            </td>
                            <td
                                suppressContentEditableWarning={true}
                                contentEditable={this.state.isEditing[itemKey]}
                                onBlur={event => this.updateText(event, itemKey, language)}
                            >
                                {!this.state.isEditing[itemKey] ? (
                                    itemPerLan
                                ) : (
                                    <Input
                                        defaultValue={itemValueInLang}
                                        onChange={event => {
                                            this.updateText(event, itemKey, language);
                                        }}
                                    />
                                )}
                            </td>
                        </tr>
                    );
                });
            } else if (itemKey === 'iri' || itemKey === 'version') {
                return (
                    <tr style={{ fontSize: '12px' }} key={'iri_version_' + itemKey + keyIndex++}>
                        <td style={{ paddingRight: '5px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                            <div style={{ float: 'left' }}>
                                {/*  <Button
                                    title="Edit Relation"
                                    color="black"
                                    size="sm"
                                    style={{ padding: '0px', paddingRight: '5px' }}
                                    onClick={() => {
                                        this.toggleEditButton(itemKey);
                                    }}
                                >
                                    <Icon icon={faPen} color={this.state.isEditing[itemKey] ? 'black' : 'gray'} />
                                </Button>*/}
                                <b>{itemKey}:</b>
                            </div>
                        </td>
                        <td
                            suppressContentEditableWarning={true}
                            contentEditable={this.state.isEditing[itemKey]}
                            onBlur={event => this.updateText(event, itemKey)}
                        >
                            {!this.state.isEditing[itemKey] ? (
                                obj[itemKey]
                            ) : (
                                <Input
                                    defaultValue={obj[itemKey]}
                                    onChange={event => {
                                        this.updateText(event, itemKey);
                                    }}
                                />
                            )}
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

    renderCurrentProjectAndOntology = () => {
        const openProject = this.props.projectName;
        const openOntology = this.props.ontologyName;
        return (
            <div>
                <table className="table table-bordered hover">
                    <thead>
                        <tr>
                            <th>Current Project Name</th>
                            <th>Current Ontology Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Link to={reverse(ROUTES.ONTOLOGY)}>{openProject}</Link>
                            </td>
                            <td>{openOntology}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
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
                    <div style={{ marginTop: '20px', width: '106%', textAlign: 'left', marginLeft: '15px' }}>
                        <div>{this.renderCurrentProjectAndOntology()}</div>
                    </div>
                    <div style={{ width: this.props.width - 2, textAlign: 'left' }}>{this.renderMetaInformation()}</div>
                </Container>
            </ContentContainer>
        );
    }
}

LeftSideBar.propTypes = {
    projectName: PropTypes.string.isRequired,
    ontologyName: PropTypes.string.isRequired,
    title: PropTypes.string,
    updateEvent: PropTypes.func.isRequired,
    initialState: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    metaInformation: PropTypes.object,
    redux_editMetaInfo: PropTypes.func.isRequired
    //redux_addMetaInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};
const mapDispatchToProps = dispatch => ({
    redux_editMetaInfo: data => dispatch(redux_editMetaInfo(data))
    //redux_addMetaInfo: data => dispatch(redux_addMetaInfo(data))
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
