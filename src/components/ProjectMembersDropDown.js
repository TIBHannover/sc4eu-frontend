import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddProjectUserModal from './Modals/AddProjectUser';
import { Scrollbars } from 'react-custom-scrollbars-2';
import styled from 'styled-components';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';

function ProjectMembersDropdown(props, { ...args }) {
    const projectUsers = props.projectUsers;
    const projectUUID = props.projectUUID;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addUserPopupOpen, setAddUserPopupOpen] = useState(false);

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const togglePopup = () => {
        setAddUserPopupOpen(!addUserPopupOpen);
    };

    return (
        <div style={{ fontFamily: fontStyled.fontFamily }}>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret style={{ width: '100%' }}>
                    Project Members
                </DropdownToggle>
                <StyledDropdownMenu {...args}>
                    <DropdownItem style={{ padding: '0.5rem 0.1rem', width: '100%', backgroundColor: 'lightgray' }}>
                        <div style={{ marginLeft: '3%', float: 'left', fontWeight: 500, color: `${colorStyled.SECONDARY.dark}` }}>
                            Project Members
                        </div>
                        <FontAwesomeIcon
                            icon={faUserPlus}
                            size={'lg'}
                            color={colorStyled.SECONDARY.darker}
                            title={'Click to add new user'}
                            style={{ float: 'right', marginRight: '1%' }}
                            onClick={() => {
                                setAddUserPopupOpen(true);
                            }}
                        />
                        <AddProjectUserModal
                            toggleAddUserPopup={togglePopup}
                            showDialog={addUserPopupOpen}
                            callback={(email, userUUID) => {
                                props.addUserCallBack(projectUUID, userUUID);
                                togglePopup();
                            }}
                        />
                    </DropdownItem>
                    <Scrollbars style={{ height: '50vh' }}>
                        {projectUsers.map((item, index) => (
                            <div key={'key' + index}>
                                <hr style={{ margin: '0px 0px 0px 0px' }} />
                                <DropdownItem key={'key' + index} style={{ padding: '10px 0px 10px 0px' }}>
                                    <div style={{ marginLeft: '3%', float: 'left' }}>{item.name}</div>
                                    {!(item.role.toLowerCase() === 'System Admin'.toLowerCase() || item.UUID === props.currentUser?.userId) && (
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size={'1x'}
                                            color={colorStyled.SECONDARY.darker}
                                            title={'Click to unregister this user from this Project'}
                                            style={{ float: 'right', marginRight: '3%' }}
                                            onClick={() => {
                                                props.callBack(projectUUID, item.UUID, item.name, item);
                                            }}
                                        />
                                    )}
                                </DropdownItem>
                            </div>
                        ))}
                    </Scrollbars>
                </StyledDropdownMenu>
            </Dropdown>
        </div>
    );
}

ProjectMembersDropdown.propTypes = {
    projectUsers: PropTypes.array.isRequired,
    projectUUID: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
    addUserCallBack: PropTypes.func.isRequired,
    currentUser: PropTypes.object
};

export default ProjectMembersDropdown;

const StyledDropdownMenu = styled(DropdownMenu)`
    padding: 0 !important;
    width: 100%;
    margin: 0 !important;
`;
