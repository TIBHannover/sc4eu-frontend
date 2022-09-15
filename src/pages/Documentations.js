import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { PRIMARY, SECONDARY, TEXTCOLOR } from '../styledComponents/styledComponents';
import UserRole from '../assets/images/UserRole.jpg';

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
            "We identified that the most crucial requirement for the approach is to serve users' needs from various audiences with " +
            'diverse backgrounds and in different contexts. Because web-based approaches are ready-to-use without the need to install ' +
            'additional software they reduce entrance barriers and engage different user groups more directly.\n' +
            'Having defined the above-mentioned domain experts (non-experts as to ontology modelling) and the knowledge engineers (expert users) as the two ' +
            'relevant user groups in the project, we describes the individual requirements as follows:\n' +
            '“For domain experts the approach should be easy-to-learn/easy-to-use with a least complex OWL modelling, providing guidance and best-practice ' +
            'suggestions during the modelling. For expert users in turn the approach should support all modelling features of the commonly used open source ontology editor Protégé; ' +
            'and visual modelling paradigms in the form of node-link diagrams can address the requirements easy-to-use and low complexity.\n' +
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
            <div style={{ width: '100%', height: '100%', backgroundColor: PRIMARY.lighter }}>
                <div style={{ width: '100%', height: '90%', overflowY: 'auto', paddingBottom: '30px' }}>
                    <h2 style={{ textAlign: 'center', paddingBottom: '20px', paddingTop: '10px' }}>What Portal will do for you</h2>
                    <div style={{ paddingLeft: '300px', paddingRight: '300px' }}>
                        <h4>Connecting domain experts with knowledge engineers</h4>
                        <p style={{ whiteSpace: 'pre-wrap', textAlign: 'justify', color: TEXTCOLOR }}>
                            {this.state.isreadmoreUserGuidance ? (
                                <>
                                    {UserGuidance}
                                    <div style={{ textAlign: 'center' }}>
                                        <img src={UserRole} alt="UserRole" />
                                        <p style={{ textAlign: 'justify' }}>
                                            We identified that the most crucial requirement for ontology development is to serve users' needs from
                                            various audiences with diverse backgrounds and in different contexts. We have therefore introduced several
                                            modes of operations.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                UserGuidance.substring(0, 300)
                            )}
                            <span style={{ color: SECONDARY.link, cursor: 'pointer' }} onClick={this.toggleReadmoreUserGuidance}>
                                {this.state.isreadmoreUserGuidance ? 'Read Less' : ' ...Read More'}
                            </span>
                        </p>
                        <h4>About SC3</h4>
                        <p style={{ textAlign: 'justify', color: TEXTCOLOR }}>
                            SC3 establishes a standard language for comprehensive collaboration between humans and machines, as well as all other
                            partners.The key objective of this platform is to implement data documentation of an actionable ontology-based ecosystem
                            that consists of a top-level ontology, adapted from existing domain ontologies, and complemented by new ones for other
                            subdomains to ensure interoperability of data. "Further information about the project you can find on our &nbsp;
                            <a
                                style={{ color: SECONDARY.link }}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://sc3-project.automotive.oth-aw.de/"
                            >
                                SC3 webpage
                            </a>
                            , on our&nbsp;
                            <a
                                style={{ color: SECONDARY.link }}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.youtube.com/channel/UCkP7Qi9G9uHDLdyATT7tKow/featured?view_as=subscriber"
                            >
                                YouTube chanel
                            </a>
                            , or&nbsp;
                            <a
                                style={{ color: SECONDARY.link }}
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/in/sc3-project-886b56209/?originalSubdomain=de"
                            >
                                via LinkedIn.
                            </a>
                        </p>
                        <h4>Framework for collaborative ontology development</h4>
                        <p style={{ whiteSpace: 'pre-wrap', cursor: 'pointer', textAlign: 'justify', color: TEXTCOLOR }}>
                            {this.state.isreadmoreFrameworkText ? FrameworkText : FrameworkText.substring(0, 200)}
                            <span style={{ color: SECONDARY.link }} onClick={this.toggleReadmoreFrameworkText}>
                                {this.state.isreadmoreFrameworkText ? ' Read Less' : ' ...Read More'}
                            </span>
                        </p>

                        <h4>Be part of the SC3 Community and collaborate with us </h4>
                        <p style={{ textAlign: 'justify', color: TEXTCOLOR }}>
                            SC3 is an ECSEL funded project to build a community and to foster the take up of the Digital Reference Ontology. Everyone
                            are invited to participate in the project development.
                            <br />I Would like to setup your own SC3 Portal or if you like to contribute to our codebase, please visit:&nbsp;
                            <a style={{ color: SECONDARY.link }} href="https://gitlab.com/TIBHannover/sc3-project/">
                                https://gitlab.com/TIBHannover/sc3-project/
                            </a>
                            <br />
                            You will find all our code under a MIT licence, instructions. Check it out!
                        </p>
                        <h4>Hybrid modes of operation</h4>
                        <p style={{ whiteSpace: 'pre-wrap', cursor: 'pointer', textAlign: 'justify', color: TEXTCOLOR }}>
                            {this.state.isreadmore ? HybridTEXT : HybridTEXT.substring(0, 200)}
                            <span style={{ color: SECONDARY.link }} onClick={this.toggleReadmore}>
                                {this.state.isreadmore ? ' Read Less' : ' ...Read More'}
                            </span>
                        </p>
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <iframe
                            width="750"
                            height="350"
                            src={`https://www.youtube.com/embed/R-lJrUgmZJc`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

Documentations.propTypes = {};

export default Documentations;
