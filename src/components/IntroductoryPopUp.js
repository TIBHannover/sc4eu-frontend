import React, { Component } from 'react';
import { ModalBody, Button } from 'reactstrap';
import Cookies from 'js-cookie';
import { withTheme } from '@emotion/react';
import { StyledRootDiv, StyledModal } from 'styledComponents/styledComponents';
const SliderText = [
    {
        id: 0,
        value:
            'You are visiting the Ontology Curation portal for the first time, you can get a brief overview of the portal by reading our\n' +
            '                            training page. If you want to try out the portal yourself, you should first register with your e-mail address.'
    },
    {
        id: 1,
        value:
            ' If you register successfully than it will allow you to browse our test projects (sandbox) and try out the functionality\n' +
            '                            with pre-installed or custom ontologies. To select the sandbox project, simply click on the sidebar bar "projects" tab. In the list of all projects, select the "Sandbox Collection". In the sandbox\n' +
            '                            project you can load your own ontology or select one of the preloaded ontologies.Once you have selected an ontology, new\n' +
            '                            visualization options will appear in the menu for you to choose from.'
    },
    {
        id: 2,
        value:
            ' All ontologies loaded from a Git repository can also be compared in terms of changes to all other commits (Ontology\n' +
            '                            Comparison).\n' +
            '                            By the way, the Ontology Curation portal also includes a WebProtégé installation. You can use it to collaboratively edit your\n' +
            '                            ontologies. This WebProtégé instance has been extended by us so that you can load your ontologies directly from Git and\n' +
            '                            restore changes. Currently our extended WebProtege installation still requires a separate registration.'
    }
];

class IntroductoryPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstModal: false,
            sliderIndex: 0,
            buttonText: 'Next'
        };
    }

    componentDidMount() {
        const value = Cookies.get('alreadyVisited');
        if (value) {
            this.setState({ firstModal: false });
            //do not view Popup
        } else {
            //this is the first time
            Cookies.set('alreadyVisited', true);
            this.setState({ firstModal: true });
        }
    }

    goToNextSlide = () => {
        this.setState(prevState => {
            const isLastSlide = prevState.sliderIndex === SliderText.length - 1;
            if (!isLastSlide) {
                const newIndex = prevState.sliderIndex + 1;
                return {
                    sliderIndex: newIndex,
                    buttonText: newIndex === 2 ? 'I understand' : 'Next'
                };
            } else {
                return {
                    firstModal: !prevState.firstModal
                };
            }
        });
    };

    render() {
        const { theme } = this.props;
        return (
            <StyledRootDiv>
                <StyledModal isOpen={this.state.firstModal}>
                    <ModalBody style={{ backgroundColor: theme.palette.background.paper }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h4 style={{ marginLeft: 'auto' }}>
                                <p>Thank you for visiting our portal</p>
                            </h4>
                            <Button
                                onClick={() => this.setState(prevState => ({ firstModal: !prevState.firstModal }))}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: theme.palette.secondary.contrastText,
                                    fontWeight: 600,
                                    marginLeft: 'auto',
                                    marginRight: '10px',
                                    fontSize: '18px',
                                    outline: 'none'
                                }}
                            >
                                X
                            </Button>
                        </div>
                        <br />
                        <span
                            style={{
                                fontSize: '18px',
                                color: theme.palette.text.secondary
                            }}
                        >
                            {SliderText[this.state.sliderIndex].value}
                        </span>
                        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <Button onClick={this.goToNextSlide} style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}>
                                {this.state.buttonText}
                            </Button>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex'
                            }}
                        >
                            {Array.from({ length: 3 }).map((item, index) => (
                                <div
                                    key={index}
                                    style={
                                        this.state.sliderIndex === index
                                            ? {
                                                  width: '15px',
                                                  height: '15px',
                                                  borderRadius: '50%',
                                                  border: `3px solid ${theme.palette.secondary.main}`,
                                                  margin: '0 5px',
                                                  backgroundColor: theme.palette.background.paper
                                              }
                                            : {
                                                  width: '15px',
                                                  height: '15px',
                                                  borderRadius: '50%',
                                                  border: `3px solid ${theme.palette.secondary.main}`,
                                                  margin: '0 5px',
                                                  backgroundColor: theme.palette.secondary.main
                                              }
                                    }
                                />
                            ))}
                        </div>
                    </ModalBody>
                </StyledModal>
            </StyledRootDiv>
        );
    }
}

export default withTheme(IntroductoryPopUp);


