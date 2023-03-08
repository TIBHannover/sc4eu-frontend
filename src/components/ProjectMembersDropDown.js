import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SECONDARY } from '../styledComponents/styledComponents';
import AddProjectUserModal from './Modals/AddProjectUser';

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
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret style={{ width: '100%' }}>
                    Project Members
                </DropdownToggle>
                <DropdownMenu {...args} style={{ width: '100%' }}>
                    <DropdownItem header style={{ padding: '0rem 0.1rem', width: '100%' }}>
                        <div style={{ marginLeft: '3%', float: 'left' }}>Project Members</div>
                        <FontAwesomeIcon
                            icon={faUserPlus}
                            size={'lg'}
                            color={SECONDARY.darker}
                            title={'Click to add new user'}
                            style={{ float: 'right', marginRight: '5px' }}
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
                    {projectUsers.map((item, index) => (
                        <DropdownItem key={'key' + index} style={{ padding: '0.0rem 0.05rem' }}>
                            <hr />
                            <div style={{ marginLeft: '3%', float: 'left' }}>{item.name}</div>
                            <FontAwesomeIcon
                                icon={faTrash}
                                size={'1x'}
                                color={SECONDARY.darker}
                                title={'Click to unregister this user from this Project'}
                                style={{ float: 'right', marginRight: '3%' }}
                                onClick={() => {
                                    props.callBack(projectUUID, item.UUID, item.name);
                                }}
                            />
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

ProjectMembersDropdown.propTypes = {
    projectUsers: PropTypes.array.isRequired,
    projectUUID: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
    addUserCallBack: PropTypes.func.isRequired
};

export default ProjectMembersDropdown;
