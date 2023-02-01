import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import { SECONDARY, TEXTCOLOR } from '../styledComponents/styledComponents';

const SliderText = [
    {
        id: 0,
        value:
            'You are visiting the SC3 portal for the first time, you can get a brief overview of the portal by reading our\n' +
            '                            documentation page. If you want to try out the portal yourself, you should first register with your e-mail address.'
    },
    {
        id: 1,
        value:
            ' If you register successfully than it will allow you to browse our test projects (sandbox) and try out the functionality\n' +
            '                            with pre-installed or custom ontologies. To select the sandbox project, simply click on the menu icon (three bars in the\n' +
            '                            upper left corner) and select "Projects from". In the list of all projects, select the "Sandbox project". In the sandbox\n' +
            '                            project you can load your own ontology or select one of the preloaded ontologies.Once you have selected an ontology, new\n' +
            '                            visualization options will appear in the menu for you to choose from.'
    },
    {
        id: 2,
        value:
            ' All ontologies loaded from a Git repository can also be compared in terms of changes to all other commits (Ontology\n' +
            '                            Comparison).\n' +
            '                            By the way, the SC3 portal also includes a WebProtégé installation. You can use it to collaboratively edit your\n' +
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
        const visited = sessionStorage['alreadyVisited'];
        if (visited) {
            this.setState({ firstModal: false });
            //do not view Popup
        } else {
            //this is the first time
            sessionStorage['alreadyVisited'] = true;
            this.setState({ firstModal: true });
        }
    }

    goToNextSlide = () => {
        const isLastSlide = this.state.sliderIndex === SliderText.length - 1;
        if (!isLastSlide) {
            const newIndex = isLastSlide ? 0 : this.state.sliderIndex + 1;
            this.setState({ sliderIndex: newIndex });
            if (newIndex === 2) {
                this.setState({ buttonText: 'I Understand' });
            } else {
                this.setState({ buttonText: 'Next' });
            }
        } else {
            this.setState({ firstModal: !this.state.firstModal });
        }
    };

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.firstModal}
                    style={{ maxWidth: '80%', width: '100%', marginLeft: '10%', marginRight: '10%', borderRadius: '15px', overflow: 'hidden' }}
                >
                    <ModalBody style={{ backgroundColor: 'rgba(214, 230, 242, .3)' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h4 style={{ marginLeft: 'auto' }}>
                                <i>Thank you for visiting our portal</i>
                            </h4>
                            <Button
                                onClick={() => this.setState({ firstModal: !this.state.firstModal })}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: TEXTCOLOR,
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
                        <span style={{ fontSize: '18px', color: TEXTCOLOR }}>{SliderText[this.state.sliderIndex].value}</span>
                        <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                            <Button onClick={this.goToNextSlide} style={{ backgroundColor: SECONDARY.dark }}>
                                {this.state.buttonText}
                            </Button>
                        </div>
                        <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex' }}>
                            {Array.from({ length: 3 }).map((item, index) => (
                                <div
                                    key={index}
                                    style={
                                        this.state.sliderIndex === index
                                            ? {
                                                  width: '15px',
                                                  height: '15px',
                                                  borderRadius: '50%',
                                                  border: `3px solid ${SECONDARY.dark}`,
                                                  margin: '0 5px',
                                                  backgroundColor: '#f1f1f1'
                                              }
                                            : {
                                                  width: '15px',
                                                  height: '15px',
                                                  borderRadius: '50%',
                                                  border: `3px solid ${SECONDARY.dark}`,
                                                  margin: '0 5px',
                                                  backgroundColor: SECONDARY.dark
                                              }
                                    }
                                />
                            ))}
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default IntroductoryPopUp;
