import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import styled from 'styled-components';
import { connect } from 'react-redux';
import { PRIMARY } from '../../styledComponents/styledComponents';
import { getAllProjects } from '../../network/projectIndexing';
import { getAllUsers, getUserProjects } from '../../network/UserProfileCalls';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ProjectSideBarCard from '../ProjectSideBarCard';

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
            <div
                id="RightSidebarContainer"
                initialRendering={this.state.initialRendering}
                style={{ width: '22%', marginTop: '0.5%', height: '100%', backgroundColor: 'white' }}
            >
                <div
                    style={{
                        borderRadius: '10px',
                        borderBottomRightRadius: '0',
                        borderBottomLeftRadius: '0',
                        color: 'white',
                        backgroundColor: PRIMARY.dark,
                        height: '6%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <h4 style={{ width: '100%', margin: '0 auto' }}>{this.state.title}</h4>
                </div>
                <div
                    style={{
                        color: 'black',
                        backgroundColor: 'white',
                        height: '90%'
                    }}
                >
                    <div>
                        <p style={{ float: 'left', margin: '0px 10px 5px 5px', textAlign: 'center', fontStyle: 'italic', height: '5%' }}>
                            {this.props.user ? (
                                <>Click on the email icon to request permission to a project you are interested to join</>
                            ) : (
                                <>Please log in to apply for approval for a project you are interested in.</>
                            )}
                        </p>
                    </div>
                    <Scrollbars style={{ borderTop: '0.01rem solid #e7e9eb', height: '95%' }}>
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
                                    }
                                })
                            ) : (
                                <p style={{ margin: '10px 10px 5px 5px', textAlign: 'center', fontStyle: 'italic' }}>No Available Projects</p>
                            )}
                        </div>
                    </Scrollbars>
                </div>
            </div>
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
