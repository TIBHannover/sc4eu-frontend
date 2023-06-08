import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { getAllProjects } from '../../network/projectIndexing';
import { getAllUsers, getUserProjects } from '../../network/UserProfileCalls';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ProjectSideBarCard from '../ProjectSideBarCard';
import { colorStyled } from '../../styledComponents/styledColor';
import { fontStyled } from '../../styledComponents/styledFont';

class RightSideProjectBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            results: [],
            flipflop: false,
            isLoading: true
        };
    }

    componentDidMount = async () => {
        await this.getProjectsFromBackend();
        await getAllUsers().then(allUsers => {
            const onlyProjectAdmins = [];
            allUsers.forEach(user => {
                if (user.role === 'Project Admin') {
                    onlyProjectAdmins.push(user);
                }
            });

            this.state.results.forEach(project => {
                project.projectAdmins = [];
                onlyProjectAdmins.forEach(projectAdmin => {
                    getUserProjects(projectAdmin.uuid).then(thisAdminProjects => {
                        if (thisAdminProjects.some(adminProject => adminProject === project.uuid)) {
                            project.projectAdmins.push({ name: projectAdmin.display_name, email: projectAdmin.email_address });
                        }
                    });
                });
            });
        });
    };

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.updateFlipFlop !== this.props.updateFlipFlop) {
            // this.setState({ initialRendering: false });
            this.getProjectsFromBackend();
        }
        if (prevProps.user !== this.props.user) {
            await this.getProjectsFromBackend();
        }
    };

    getProjectsFromBackend = async () => {
        await getAllProjects().then(allProjects => {
            allProjects.reverse().forEach(singleProject => {
                singleProject.unlock = false;
                if (singleProject.access_type === 'Public' || singleProject.access_type === 'public') {
                    singleProject.unlock = true;
                }
                if (this.props.user) {
                    if (this.props.user.role === 'System Admin' || this.props.user.role === 'system admin') {
                        singleProject.unlock = true;
                    }
                    getUserProjects(this.props.user.userId).then(userProjectsUUID => {
                        userProjectsUUID.forEach(userProjectID => {
                            if (singleProject.uuid === userProjectID) {
                                singleProject.unlock = true;
                            }
                        });
                        this.setState({ flipflop: !this.state.flipflop, isLoading: false });
                    });
                }
            });
            this.getOnlySideBarProjects(allProjects).then(sortedSideBarProjects => {
                this.setState({ results: sortedSideBarProjects });
            });

            // const sortProjects = [...allProjects].sort((p1, p2) => (p1.name.toLowerCase() > p2.name.toLowerCase() ? 1 : -1));
            // this.setState({ results: sortProjects });
        });
    };

    getOnlySideBarProjects = async allProjects => {
        const sideBarProjects = [];
        await allProjects.forEach(item => {
            if (item.unlock === false) {
                sideBarProjects.push(item);
            }
        });

        const sortSideBarProjects = [...sideBarProjects].sort((p1, p2) => (p1.name.toLowerCase() > p2.name.toLowerCase() ? 1 : -1));
        return sortSideBarProjects;
    };

    getProjectsForUser = async admin => {
        const userProjects = await getUserProjects(admin.uuid);
        return userProjects;
    };

    render() {
        return (
            <StyledRootDiv id="RightSidebarContainer" initialRendering={this.state.initialRendering}>
                <StyledHeadingDiv>
                    <h4 style={{ width: '100%', margin: '0 auto' }}>{this.state.title}</h4>
                </StyledHeadingDiv>
                <StyledInfoDiv>
                    <p style={{ padding: '10px 10px 5px 5px' }}>
                        {this.props.user ? (
                            <>Click on the email icon to request permission to a project you are interested to join</>
                        ) : (
                            <>Please log in to apply for approval for a project you are interested in.</>
                        )}
                    </p>
                </StyledInfoDiv>
                <StyledScrollbarDiv>
                    <Scrollbars style={{ borderTop: `0.01rem solid ${colorStyled.SCROLLBAR_BORDER_COLOR}` }}>
                        <div style={{ textAlign: 'left', marginRight: '1.5%' }}>
                            {this.state.results.length > 0 ? (
                                this.state.results.map(item => {
                                    if (item.unlock === false) {
                                        return (
                                            <ProjectSideBarCard
                                                key={'ProjectCard_' + item.name}
                                                inputData={item}
                                                callback={param => {
                                                    this.reloadAfterUpdate(param);
                                                }}
                                            />
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            ) : (
                                <StyledInfoSpan>No Available Projects</StyledInfoSpan>
                            )}
                        </div>
                    </Scrollbars>
                </StyledScrollbarDiv>
            </StyledRootDiv>
        );
    }
}

RightSideProjectBar.propTypes = {
    title: PropTypes.string,
    reloadAfterUpdate: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    updateFlipFlop: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(RightSideProjectBar);

const StyledRootDiv = styled.div`
    width: 25%;
    margin-top: 0.5%;
    height: 95%;
    background-color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    font-family: ${fontStyled.fontFamily};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        width: 22%;
    }
`;

const StyledHeadingDiv = styled.div`
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background-color: ${colorStyled.PRIMARY.dark};
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StyledInfoSpan = styled.span`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledInfoDiv = styled.div`
    font-size: ${fontStyled.fontSize.NormalText};
    float: left;
    text-align: center;
    height: 75px;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledScrollbarDiv = styled.div`
    height: calc(100% - 135px);
`;
