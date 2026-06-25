import React, { Component } from 'react';
import UserRole from '../assets/images/UserRole.jpg';
import { withTheme } from '@emotion/react';
import { StyledDataProtectionText, StyledDocumentationsDiv } from 'styledComponents/styledComponents';
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
        this.setState(prevState => ({ isreadmore: !prevState.isreadmore }));
    };

    toggleReadmoreFrameworkText = () => {
        this.setState(prevState => ({ isreadmoreFrameworkText: !prevState.isreadmoreFrameworkText }));
    };

    toggleReadmoreUserGuidance = () => {
        this.setState(prevState => ({ isreadmoreUserGuidance: !prevState.isreadmoreUserGuidance }));
    };

    render() {
        const { theme } = this.props;

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
            'Ontologies, taxonomies, and vocabularies provide a machine-readable representation of the domain knowledge, which is a component of the Semantic Web. ' +
            'Ontologies are difficult to model because of how they involve conceptualizing processes and their relationships. ' +
            'Further, it is important that the specifications of a knowledge domain meet the needs of different stakeholders.\n' +
            'To accomplish so, as well as to assure successful application in specific use cases, various stakeholders must agree on the conceptualization. ' +
            'Visualizations serve as an abstraction layer for underlying data and a suitable beginning point for exploration and comprehension. ' +
            'As a result, they lower the entry barrier to ontology modeling Visualizations that are appropriate for specific use cases and user groups are, nevertheless, ' +
            'very dependent. To allow users to adapt visual representations to their needs, flexible and adjustable techniques are required.';

        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingBottom: '3%' }}>
                <StyledDocumentationsDiv>
                    <h3 style={{ textAlign: 'center', paddingBottom: '2%', paddingTop: '2%', color: theme.palette.text.primary}}>
                        What the Portal will do for you
                    </h3>
                    <h5 style={{ color: theme.palette.text.primary}}>Connecting Domain Experts with Knowledge Engineers</h5>
                    <StyledDataProtectionText>
                        {this.state.isreadmoreUserGuidance ? (
                            <>
                                {UserGuidance}
                                <div style={{ textAlign: 'center' }}>
                                    <img src={UserRole} alt="UserRole" style={{ maxWidth: '100%' }} />
                                    <StyledDataProtectionText>
                                        We identified that the most crucial requirement for ontology development is to serve users' needs from various
                                        audiences with diverse backgrounds and in different contexts. We have therefore introduced several modes of
                                        operations.
                                    </StyledDataProtectionText>
                                </div>
                            </>
                        ) : (
                            UserGuidance.substring(0, 300)
                        )}
                        <button style={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.paper, cursor: 'pointer' }} onClick={this.toggleReadmoreUserGuidance}>
                            {this.state.isreadmoreUserGuidance ? 'Read Less' : ' ...Read More'}
                        </button>
                    </StyledDataProtectionText>
                    <h5 style={{ color: theme.palette.text.primary}}>About SC4EU Ontology Curation Portal</h5>
                    <StyledDataProtectionText>
                        <span>
                            SC4EU Ontology Curation Portal establishes a standard language for comprehensive collaboration between humans and
                            machines, as machines, as well as all other partners.The key objective of this platform is to implement data documentation
                            of an actionable ontology-based ecosystem that consists of a top-level ontology, adapted from existing domain ontologies,
                            and complemented by new ones for other subdomains to ensure interoperability of data. "Further information about the
                            project you can find on our
                        </span>
                        <a
                            style={{ color: theme.palette.primary.main }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://sc3-project.automotive.oth-aw.de/"
                        >
                            SC4EU webpage
                        </a>
                        <span>, on our </span>
                        <a
                            style={{ color: theme.palette.primary.main }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.youtube.com/channel/UCkP7Qi9G9uHDLdyATT7tKow/featured?view_as=subscriber"
                        >
                            YouTube chanel
                        </a>
                        <span>, or </span>
                        <a
                            style={{ color: theme.palette.primary.main }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/sc3-project-886b56209/?originalSubdomain=de"
                        >
                            via LinkedIn.
                        </a>
                    </StyledDataProtectionText>
                    <h5 style={{ color: theme.palette.text.primary}}>Framework for Collaborative Ontology Development</h5>
                    <p
                        style={{
                            whiteSpace: 'pre-wrap',
                            cursor: 'text',
                            textAlign: 'justify',
                            color: theme.palette.text.primary
                        }}
                    >
                        {this.state.isreadmoreFrameworkText ? FrameworkText : FrameworkText.substring(0, 200)}
                        <button style={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.paper, cursor: 'pointer' }} onClick={this.toggleReadmoreFrameworkText}>
                            {this.state.isreadmoreFrameworkText ? ' Read Less' : ' ...Read More'}
                        </button>
                    </p>

                    <h5 style={{ color: theme.palette.text.primary}}>Be part of the SC4EU Community and Collaborate with us </h5>
                    <StyledDataProtectionText>
                        SC4EU is a{' '}
                        <a style={{ color: theme.palette.primary.main }} target="_blank" rel="noopener noreferrer" href="https://www.kdt-ju.europa.eu/">
                            KDT JU
                        </a>{' '}
                        funded project to build a community and to foster the take up of the Digital Reference Ontology. Everyone is invited to
                        participate in the project development.
                        <br />
                        If you would like to setup your own SC4EU Portal or if you would like to contribute to our codebase, please visit:&nbsp;
                        <a
                            style={{ color: theme.palette.primary.main }}
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://gitlab.com/TIBHannover/sc3-project/"
                        >
                            SC4EU Project GitLab
                        </a>
                        <br />
                        You will find all our code under MIT licence, instructions. Check it out!
                    </StyledDataProtectionText>
                    <h5 style={{ color: theme.palette.text.primary}}>Hybrid Modes of Operation</h5>
                    <p
                        style={{
                            whiteSpace: 'pre-wrap',
                            cursor: 'text',
                            textAlign: 'justify',
                            color: theme.palette.text.primary
                        }}
                    >
                        {this.state.isreadmore ? HybridTEXT : HybridTEXT.substring(0, 200)}
                        <button style={{ color: theme.palette.text.primary, backgroundColor: theme.palette.background.paper, cursor: 'pointer' }} onClick={this.toggleReadmore}>
                            {this.state.isreadmore ? ' Read Less' : ' ...Read More'}
                        </button>
                    </p>
                </StyledDocumentationsDiv>
            </div>
        );
    }
}

Documentations.propTypes = {};

export default withTheme(Documentations);
