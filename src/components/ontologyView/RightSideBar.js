import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { StyledHeadingDiv, OpenCloseButton, StyledRightSideBarScrollbarDiv } from 'styledComponents/styledComponents';
class RightSideBar extends Component {
    render() {
        return (
            <>
                <StyledHeadingDiv>
                    <h4 style={{ width: '100%', margin: '0 auto' }}>Metadata</h4>
                </StyledHeadingDiv>
                <OpenCloseButton onClick={this.props.toggleSidebar}>
                    <Icon
                        icon={this.props.isSidebarOpen ? faAngleRight : faAngleLeft}
                        className="align-self-center"
                        style={{ marginLeft: '5px', fontSize: '26px' }}
                    />
                </OpenCloseButton>
                <StyledRightSideBarScrollbarDiv>
                    <Scrollbars>
                        <div>data</div>
                    </Scrollbars>
                </StyledRightSideBarScrollbarDiv>
            </>
        );
    }
}

RightSideBar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(RightSideBar);

