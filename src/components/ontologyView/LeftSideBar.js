import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
// import TabLikeHeader from './TabLikeHeader';

export default class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            minHeight: 200,
            title: props.title,
            initialRendering: true
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

    render() {
        return (
            <ContentContainer
                id="LeftSidebarContainer"
                expanded={this.state.expanded}
                initialRendering={this.state.initialRendering}
                width={this.props.width}
                style={{ width: this.props.width, height: '200px', float: 'left', position: 'absolute' }}
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
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 clearfix"
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
                        position: 'relative',
                        height: '100%' // todo make this using calc function off css or compute window size
                    }}
                >
                    <div style={{ width: this.props.width - 10, textAlign: 'center' }}>Left side meta info</div>
                </Container>
            </ContentContainer>
        );
    }
}

LeftSideBar.propTypes = {
    title: PropTypes.string,
    updateEvent: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
};

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
    }
    if (initialRendering) {
        return keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(0deg);
   
  }
`;
    }
};

const ButtonContainer = styled.div`
    animation-name: ${expandButtonAnimation};
    animation-duration: 1000ms;
    transform: rotate(${props => (props.expanded ? 0 : 180)}deg);
    cursor: pointer;
`;

const expandContentContainerAnimation = ({ expanded, width }) => {
    return keyframes`
  from {
    left: ${expanded ? -width : 0}px;
  }
  to {
    left: ${expanded ? 0 : -width}px;
   
  }
`;
};

const ContentContainer = styled.div`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    // opacity: 0.5;
    left: ${props => (props.expanded ? 0 : -props.width)}px;
`;
