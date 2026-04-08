import React, { Component } from 'react';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import UserRole from '../assets/images/UserRole.jpg';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

class Documentations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isreadmore: false,
            isreadmoreFrameworkText: false,
            isreadmoreUserGuidance: false
        };
    }

    toggleReadmore = () => {
        this.setState({ isreadmore: !this.state.isreadmore });
    };

    toggleReadmoreFrameworkText = () => {
        this.setState({ isreadmoreFrameworkText: !this.state.isreadmoreFrameworkText });
    };

    toggleReadmoreUserGuidance = () => {
        this.setState({ isreadmoreUserGuidance: !this.state.isreadmoreUserGuidance });
    };

    render() {

        const UserGuidance =
            'A commonly agreed terminology is essential for efficient communication in a project involving various stakeholders. ' +
            'In SC4EU, all project partners are therefore invited to collect relevant terms, required for consistent in- and external information exchange.';

        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingBottom: '3%' }}>
                <StyledDiv>
                    <h3 style={{ textAlign: 'center', paddingBottom: '2%', paddingTop: '2%', color: colorStyled.onSurface }}>
                        What the Portal will do for you
                    </h3>
                    <h5 style={{ color: colorStyled.onSurface }}>Connecting Domain Experts with Knowledge Engineers</h5>
                    <StyledText>
                        {this.state.isreadmoreUserGuidance ? (
                            <>
                                {UserGuidance}
                                <div style={{ textAlign: 'center' }}>
                                    <img src={UserRole} alt="UserRole" style={{ maxWidth: '100%' }} />
                                    <StyledText>
                                        We identified that the most crucial requirement for ontology development is to serve users' needs from various
                                        audiences with diverse backgrounds and in different contexts. We have therefore introduced several modes of
                                        operations.
                                    </StyledText>
                                </div>
                            </>
                        ) : (
                            UserGuidance.substring(0, 300)
                        )}
                        <button style={{ color: colorStyled.primary, cursor: 'pointer' }} onClick={this.toggleReadmoreUserGuidance}>
                            {this.state.isreadmoreUserGuidance ? 'Read Less' : ' ...Read More'}
                        </button>
                    </StyledText>
                    <h5 style={{ color: colorStyled.onSurface }}>About SC4EU Ontology Curation Portal</h5>
                    <StyledText>
                        <span>
                            SC4EU Ontology Curation Portal establishes a standard language for comprehensive collaboration between humans and
                            machines, as machines, as well as all other partners.The key objective of this platform is to implement data documentation
                            of an actionable ontology-based ecosystem that consists of a top-level ontology, adapted from existing domain ontologies,
                            and complemented by new ones for other subdomains to ensure interoperability of data. "Further information about the
                            project you can find on our
                        </span>
                        <a
                            style={{ color: colorStyled.primary }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://sc3-project.automotive.oth-aw.de/"
                        >
                            SC4EU webpage
                        </a>
                        <span>, on our </span>
                        <a
                            style={{ color: colorStyled.primary }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.youtube.com/channel/UCkP7Qi9G9uHDLdyATT7tKow/featured?view_as=subscriber"
                        >
                            YouTube chanel
                        </a>
                        <span>, or </span>
                        <a
                            style={{ color: colorStyled.primary }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/sc3-project-886b56209/?originalSubdomain=de"
                        >
                            via LinkedIn.
                        </a>
                    </StyledText>
                    <h5 style={{ color: colorStyled.onSurface }}>Framework for Collaborative Ontology Development</h5>
                    <p
                        style={{
                            whiteSpace: 'pre-wrap',
                            cursor: 'text',
                            textAlign: 'justify',
                            color: colorStyled.onSurfaceVariant
                        }}
                    >
                        {this.state.isreadmoreFrameworkText ? FrameworkText : FrameworkText.substring(0, 200)}
                        <button style={{ color: colorStyled.primary, cursor: 'pointer' }} onClick={this.toggleReadmoreFrameworkText}>
                            {this.state.isreadmoreFrameworkText ? ' Read Less' : ' ...Read More'}
                        </button>
                    </p>

                    <h5 style={{ color: colorStyled.onSurface }}>Be part of the SC4EU Community and Collaborate with us </h5>
                    <StyledText>
                        SC4EU is a{' '}
                        <a style={{ color: colorStyled.primary }} target="_blank" rel="noopener noreferrer" href="https://www.kdt-ju.europa.eu/">
                            KDT JU
                        </a>{' '}
                        funded project to build a community and to foster the take up of the Digital Reference Ontology. Everyone is invited to
                        participate in the project development.
                        <br />
                        If you would like to setup your own SC4EU Portal or if you would like to contribute to our codebase, please visit:&nbsp;
                        <a
                            style={{ color: colorStyled.primary }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://gitlab.com/TIBHannover/sc3-project/"
                        >
                            SC4EU Project GitLab
                        </a>
                        <br />
                        You will find all our code under MIT licence, instructions. Check it out!
                    </StyledText>
                    <h5 style={{ color: colorStyled.onSurface }}>Hybrid Modes of Operation</h5>
                    <p
                        style={{
                            whiteSpace: 'pre-wrap',
                            cursor: 'text',
                            textAlign: 'justify',
                            color: colorStyled.onSurfaceVariant
                        }}
                    >
                        {this.state.isreadmore ? HybridTEXT : HybridTEXT.substring(0, 200)}
                        <button style={{ color: colorStyled.primary, cursor: 'pointer' }} onClick={this.toggleReadmore}>
                            {this.state.isreadmore ? ' Read Less' : ' ...Read More'}
                        </button>
                    </p>
                </StyledDiv>
            </div>
        );
    }
}

Documentations.propTypes = {};

export default Documentations;

const StyledDiv = styled.div`
    padding-left: 20%;
    padding-right: 20%;
    font-family: ${fontStyled.fontFamily};

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 10%;
        padding-right: 10%;
    }
`;

const StyledText = styled.p`
    color: ${colorStyled.onSurfaceVariant};
    white-space: pre-wrap;
    text-align: justify;
    font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewNormalText};
    }
`;
