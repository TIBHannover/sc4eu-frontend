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
        const HybridTEXT =
            "We identified that the most crucial requirement for the approach is to serve user's needs from various audiences with " +
            'diverse backgrounds and in different contexts. Because web-based approaches are ready-to-use without the need to install ' +
            'additional software, they reduce entrance barriers and engage different user groups more directly.\n' +
            'Having defined the above-mentioned domain experts (non-experts as to ontology modelling) and the knowledge engineers (expert users) as the two ' +
            'relevant user groups in the project, we describes the individual requirements as follows:\n' +
            '“For domain experts the approach should be easy-to-learn/easy-to-use with a least complex OWL modelling, providing guidance and best-practice ' +
            'suggestions during the modelling. The approach should support all modelling features of the commonly used open source ontology editor Protégé for ' +
            'expert users. Additionally, visual modelling paradigms in the form of node-link diagrams can address the requirements of easy-to-use and low complexity.\n' +
            'However, they have to provide additional customizations for the visual representation to facilitate understanding. ' +
            'The requirements guidance and best practices can be addressed using auto-complete functionalities to align the created nodes and ' +
            'links with existing terms of ontologies, reducing manual labor to transform high-level conceptualizations to OWL elements.\n' +
            'To support all OWL modelling features, we envision the use and extension of the OWL-API (Java Application Programming Interface), the backbone of Protégé. ' +
            'Additionally, to engage diverse groups in the modelling process, we envision three modes of modelling operation: textual (for expert users), ' +
            'widget-based (for intermediate users) and visual or Graph (for novel users).\n' +
            'For a successful adoption and broad use, we define additional requirements for a collaborative ontology development framework ' +
            'which allows to create and to share different views, thus enabling and fostering communication on all abstraction levels and between various stakeholders.\n' +
            'Since the created ontologies and their conceptualizations thrive from discussions and joint agreement upon their definitions and their usage, block chain ' +
            'technologies providing the means for versioning and history of changes should be part of the solution. Integrating them with ontology ' +
            'development will foster trust and validation of ontologies and enable long term support for downward compatible systems using old ontology versions”.';

        const FrameworkText =
            'A machine-readable conceptualization of the semiconductor domain and related supply chains requires standardize ontologies of high quality and a common ' +
            'set of conceptualizations in order to apply Semantic Web technologies widely to the semiconductor domain. Knowledge engineers and domain experts usually work ' +
            'together on ontology development. ' +
            'The latter have less expertise in a specific domain, whereas domain experts often struggle to understand logical notations used in OWL (Web Ontology Language). ' +
            'It is necessary to reduce the complexity of OWL formalization for domain experts in order to more directly involve them in ontology modelling and foster ' +
            'communication with knowledge engineers. ' +
            'However, they must maintain full OWL modelling capabilities for knowledge engineers. Because of this, we are developing a user-centered approach to ' +
            'collaborative ontology development, addressing the needs and backgrounds of different user groups.';

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
