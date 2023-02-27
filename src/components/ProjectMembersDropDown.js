import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SECONDARY } from '../styledComponents/styledComponents';
import AddProjectUserModal from './Modals/AddProjectUser';

function ProjectMembersDropdown(props, { ...args }) {
    const projectUsers = props.projectUsers;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addUserPopupOpen, setAddUserPopupOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

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
                                console.log('Add a user to the Project');
                                setAddUserPopupOpen(true);
                            }}
                        />
                        <AddProjectUserModal
                            toggleAddUserPopup={() => setAddUserPopupOpen(!addUserPopupOpen)}
                            showDialog={addUserPopupOpen}
                            callback={email => {
                                console.log('email is : ', email);
                                //TODO add code to add user to the project
                                setAddUserPopupOpen(!addUserPopupOpen);
                            }}
                        />
                    </DropdownItem>
                    {projectUsers.map((item, index) => (
                        <DropdownItem key={'key' + index} style={{ padding: '0.0rem 0.05rem' }}>
                            <hr />
                            <div style={{ marginLeft: '3%', float: 'left' }}>{item}</div>
                            <FontAwesomeIcon
                                icon={faTrash}
                                size={'1x'}
                                color={SECONDARY.darker}
                                title={'Click to add new user'}
                                style={{ float: 'right', marginRight: '3%' }}
                                onClick={() => {
                                    //TODO add code to remove the user from the project
                                    console.log('Remove user from Project');
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
    projectUsers: PropTypes.array.isRequired
};

export default ProjectMembersDropdown;
