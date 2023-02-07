import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getWidocoDocumentation } from '../network/GetOntologyData';
import styled from 'styled-components';

class WidocoDocumentation extends Component {
    constructor() {
        super();
        this.state = {
            html: '',
            isLoading: true
        };
    }

    componentDidMount() {
        if (this.props.file) {
            getWidocoDocumentation(this.props.file)
                .then(res => {
                    this.setState({ html: res, isLoading: false });
                })
                .catch(error => {
                    this.setState({ html: error, isLoading: false });
                });
        } else {
            this.setState({ html: 'Something went wrong, Please try again after Some time', isLoading: false });
        }
    }

    componentDidUpdate() {
        // html file contain script tag to make script tag run here we are using this method
        // Find all the script tags in the HTML file
        const scriptTags = this.state.html.match(/<script>([\s\S]+?)<\/script>/g);
        // Loop through each script tag
        scriptTags.forEach(scriptTag => {
            // Get the content of the script tag
            const scriptContent = scriptTag.match(/<script>([\s\S]+)<\/script>/);
            const scriptEl = document.createElement('script');
            scriptEl.innerHTML = scriptContent[1];
            document.body.appendChild(scriptEl);
        });
    }

    render() {
        return (
            <>
                {this.props.showDialog && (
                    <StyledDiv>
                        <div style={{ height: '8%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <span style={{ marginLeft: 'auto', marginTop: '1.3%', fontSize: '24px', fontWeight: '500' }}>Ontology Document</span>
                            <Button
                                onClick={this.props.toggle}
                                style={{
                                    marginLeft: 'auto',
                                    marginRight: '2%',
                                    fontSize: '21px',
                                    fontWeight: '500',
                                    background: 'none',
                                    color: '#000',
                                    border: 'none'
                                }}
                            >
                                X
                            </Button>
                        </div>
                        <hr className="mt-0 mb-0 ml-5 mr-5" />
                        {this.state.isLoading ? (
                            <div className="text-center text-primary">
                                <h2 className="h5">
                                    <span>
                                        <Icon icon={faSpinner} spin style={{ marginRight: '5px' }} />
                                    </span>
                                    Loading Document
                                </h2>
                            </div>
                        ) : (
                            <div
                                style={{ height: '84%', overflowY: 'auto', paddingLeft: '5%', paddingRight: '5%' }}
                                dangerouslySetInnerHTML={{ __html: this.state.html }}
                            />
                        )}
                        <hr className="mt-0 mb-3 ml-5 mr-5" />
                        <div style={{ height: '5%', width: '100%' }}>
                            <Button style={{ float: 'right', marginRight: '2%' }} onClick={this.props.toggle}>
                                Close
                            </Button>
                        </div>
                    </StyledDiv>
                )}
            </>
        );
    }
}

WidocoDocumentation.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    file: PropTypes.object.isRequired
};

export default WidocoDocumentation;

const StyledDiv = styled.div`
    width: 60%;
    height: 90%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
    border-radius: 8px;
`;
