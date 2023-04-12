import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { deleteProject } from '../network/projectIndexing';
import { reverse } from 'named-urls';
import ROUTES from '../constants/routes';
import EditProjectModal from './EditProjectModal';
import { MIN_WIDTH_FOR_MONITOR, PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import { withRouter } from 'react-router';
import ClampLines from 'react-clamp-lines';
import { redux_addProject, redux_removeAlreadyLoadedOntology, redux_removeOntology, redux_removeProject } from '../redux/actions/rrm_actions';
import { connect } from 'react-redux';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';

class ProjectIndexCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditProjectModal: false
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    deleteProject = async event => {
        //delete Project...
        event.preventDefault();
        event.stopPropagation();

        const isConfirmed = window.confirm('Are you sure you want to Delete this ontology?');
        if (!isConfirmed) {
            return;
        }

        try {
            const allows = await userIsAllowdToUploadOntology();
            if (allows.result === true) {
                if (this.props.inputData.unlock === true) {
                    deleteProject(this.props.inputData.uuid).then(res => {
                        if (res.success === true) {
                            this.props.callback(res.result);
                        }
                    });
                } else {
                    alert('You are not authorized to delete this project');
                }
            } else {
                alert('You are not authorized to delete this project');
            }
        } catch (rejectedValue) {
            console.log(rejectedValue);
        }
    };

    projectEdited = param => {
        if (param.result === true) {
            this.setState({ showEditProjectModal: false });
            this.props.callback();
        }
    };

    showOntologies = () => {
        // redux_removeProjects, redux_removeOntology and redux_removeAlreadyLoadedOntology will remove previous open project and ontology
        this.props.redux_removeProject();
        this.props.redux_removeOntology();
        this.props.redux_removeAlreadyLoadedOntology();
        //TODO Get all ontologies related Only to this Project
        if (this.props.inputData.unlock === true) {
            //change color of select card
            //StyledCardHeader.backgroundColor = 'black';
            this.props.redux_addProject(this.props.inputData);
            this.props.history.push(reverse(ROUTES.ONTOLOGY));
        } else {
            alert('This is Private Project You can not open it');
        }
    };

    render() {
        return (
            <div>
                <StyledCard onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledButton
                            color="none"
                            size="sm"
                            title="Delete Project"
                            onClick={this.deleteProject}
                            style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}
                        >
                            <StyledIcon icon={faTrash} />
                        </StyledButton>
                        <StyledButton
                            color="white"
                            size="sm"
                            title="Edit Project"
                            onClick={() => {
                                this.setState({ showEditProjectModal: true });
                            }}
                            style={{
                                float: 'right',
                                padding: '0px',
                                paddingLeft: '5px',
                                marginLeft: 'auto',
                                marginRight: '5px'
                            }}
                        >
                            <StyledIcon icon={faPen} />
                        </StyledButton>
                        <EditProjectModal
                            showDialog={this.state.showEditProjectModal}
                            projectData={this.props.inputData}
                            callback={param => {
                                this.projectEdited(param);
                            }}
                            toggle={() => {
                                this.setState({ showEditProjectModal: !this.state.showEditProjectModal });
                            }}
                        />
                        <StyledLink onClick={this.showOntologies} to="#" className="p-0 noSelect" onDragStart={this.preventDraggingOfItem}>
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                <div
                                    style={{
                                        overflowWrap: 'break-word',
                                        fontWeight: '500',
                                        width: '97%',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-all'
                                    }}
                                >
                                    {this.props.inputData.name}
                                </div>
                            </div>
                        </StyledLink>
                    </StyledCardHeader>
                    <StyledCardBody>
                        <ClampLines
                            text={this.props.inputData.description ? this.props.inputData.description : 'No description available'}
                            id="custom"
                            lines={2}
                            moreText="Read More"
                            lessText="Show less"
                            className="custom-class"
                        />
                    </StyledCardBody>
                </StyledCard>
            </div>
        );
    }
}

ProjectIndexCards.propTypes = {
    inputData: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    redux_addProject: PropTypes.func.isRequired,
    redux_removeProject: PropTypes.func.isRequired,
    redux_removeOntology: PropTypes.func.isRequired,
    redux_removeAlreadyLoadedOntology: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    redux_removeOntology: () => dispatch(redux_removeOntology()),
    redux_removeProject: () => dispatch(redux_removeProject()),
    redux_removeAlreadyLoadedOntology: () => dispatch(redux_removeAlreadyLoadedOntology()),
    redux_addProject: data => dispatch(redux_addProject(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectIndexCards));

const StyledButton = styled(Button)`
    :hover {
        color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    }
`;

const StyledCard = styled.div`
    margin: 5px;
    padding: 0 2.7% 0 2.7%;

    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const StyledLink = styled(Link)`
    padding: 10px;
    font-size: ${fontStyled.fontSize.NormalText};
    color: black;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    }
    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledCardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    border: 1px solid ${PRIMARY.dark};
    padding: 5px;
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background: ${PRIMARY.light};
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        background: ${SECONDARY.dark}; //00b4cc
    }
`;

const StyledCardBody = styled.div`
    padding: 5px;
    font-size: ${fontStyled.fontSize.NormalText};
    border: 1px solid ${PRIMARY.dark};
    border-top: none;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledIcon = styled(Icon)`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;
