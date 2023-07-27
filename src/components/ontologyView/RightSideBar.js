import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { colorStyled } from '../../styledComponents/styledColor';
import { Scrollbars } from 'react-custom-scrollbars-2';

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
                <StyledScrollbarDiv>
                    <Scrollbars>
                        <div>data</div>
                    </Scrollbars>
                </StyledScrollbarDiv>
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

const StyledHeadingDiv = styled.div`
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background-color: ${colorStyled.PRIMARY.dark};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const OpenCloseButton = styled(Button)`
    display: flex;
    width: 28px;
    border-radius: 30px;
    padding: 0;
    background-color: ${colorStyled.SECONDARY.dark};
    position: relative;
    top: -15px;
    left: -20px;
`;

const StyledScrollbarDiv = styled.div`
    height: calc(100% - 65px);
    margin-top: -15px;
`;
