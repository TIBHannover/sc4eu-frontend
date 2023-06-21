import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import WhatISOntology from '../assets/images/WhatIsOntology.png';
import EstablishMaintainOnto from '../assets/images/Establish&MaintainOnto.png';
import SemanticWeb from '../assets/images/SemanticWeb.png';
import SpoSemantic from '../assets/images/SPOSemanticWeb.png';
import WEBPROTEGEIMAGE from '../assets/images/WEBPROTEGEImage.png';

const items = [
    {
        name: 'System Admin',
        role:
            '· Read and write permission  on all ontologies\n' +
            '<br>' +
            '· Can create/remove Projects\n' +
            '<br>' +
            '· Add/remove all other users to projects\n' +
            '<br>' +
            '· Can grant to another user Project Admin rights\n' +
            '<br>' +
            '· Mark ontologies Public, or Not-Public'
    },
    {
        name: 'Project Admin',
        role:
            '· Read and write permission  on project content\n' +
            '<br>' +
            '· Can add and remove *Users to his projects\n' +
            '<br>' +
            '· Mark ontologies Public, or Not-Public'
    },
    {
        name: 'Public User',
        role: '· Read permission on all public content' + '<br>' + '· Write ontologies in public Projects'
    },
    {
        name: 'Member',
        role: '· Has read and write permission in his projects '
    }
];

const documentData = [
    {
        id: '1',
        heading: 'Welcome to the Ontology Curation Portal Training section',
        content:
            'This Ontology Curation Portal (OCP) is a solution that has emerged from the <a href="https://sc3-project.automotive.oth-aw.de/" target="_blank">Semantically Connected Semiconductor Supply Chains</a> project funded by the <a href="https://cordis.europa.eu/project/id/101007312/de" target="_blank">European Commission</a>. The portal is intended to be used by anyone involved in implementing processes or tools to support accurate information exchange and validation. Not only between humans, but also between machines, without human involvement, applying ontologies. In the next sections we give a brief overview and introduction to the general challenge we are addressing, what an ontology is and how it can be created and maintained, collection, visualization and authoring of ontologies.<br>' +
            '<br>' +
            'All sections of this training are as much as possible independent from other sections but interconnected. You can therefore read them randomly if you are only interested in certain topics. However, if you read them in our suggested order, you will get a good introduction to the features of the portal and the thinking behind them. <br><br>' +
            'Have fun :-)\n'
    },
    {
        id: '2',
        heading: 'SC3 Project Motivation: Consistent Communication in Complex Semiconductor Supply Chains',
        content:
            'The semiconductor production industry is a highly intricate field. It involves complex supply chains characterized by short product cycles, strong interdependencies with other industries, and numerous partners. Clear communication plays a crucial role in achieving success within this environment.<br><br>' +
            'Similar to other domains, the semiconductor industry possesses its own body of knowledge, encompassing specialized concepts and their relationships, along with the necessary vocabulary for effective communication. Hence, having a well-defined terminology is paramount for collaboration among experts, enabling them to articulate requirements, technical or non-technical specifications, and reports, among other things. To fulfill this requirement, a common language is essential, encompassing precise definitions of terms and resolving synonyms by establishing their interdependencies.<br><br>' +
            'Moreover, communication in the semiconductor industry often occurs between machines themselves. For instance, machines may automatically verify production workflows or establish consistency in delivery agreements. This requirement adds further complexity, necessitating the utilization of machine-readable and interpretable terminologies, commonly referred to as ontologies. The Digital Reference Ontology serves as the designated ontology for describing and comprehending the semiconductor industry.'
    },
    {
        id: '3',
        heading: 'What is Ontology?',
        content:
            'In the field of computer science, ontologies offer a robust solution for effectively organizing complex facts in a manner that facilitates clear communication between machines. They enable machines to comprehend and exchange information about various aspects, such as the manufacturing process of a semiconductor component, the necessary materials, involved machinery, and human expertise. Coordinating and defining the combination of these resources becomes crucial, spanning across different departments and organizations.<br><br>' +
            'Away from any technical details, on a very general level, an ontology can be understood and represented as a graph, with labeled connections. The example below is a very general visual representation of Ontology. It essentially describes that a process has input and output of type Data and that a certain software is needed with a specific version property. This visual representation of the introduced description of a process can be understood by humans, because it shows the involved concepts (Like Process or Software) and its interrelation through labeled arcs. However, such a representation can only be used to define the ontology and to use processes where humans are involved. For machine based processing of ontologies, a different representation is required that transports the information in a machine consumable format. Various formats have been proposed by the <a href="https://www.w3.org/standards/semanticweb/ontology" target="_blank"> W3C standardization body </a>. A snippet how it can look you can see aside the graphical representation.<br><br>' +
            '<img src="' +
            WhatISOntology +
            ' " alt="ScreenShot" style="width: 100%; height: 100%; margin-right: 10px; margin-top: 10px; border: 1px solid black;"/>'
    },
    {
        id: '4',
        heading: 'The Semantic Web',
        content:
            'The Semantic Web enables the automatic processing of resources described by ontologies. For the description, dissemination and retrieval of resources described by ontologies, the Semantic Web provides a stack of technologies that build on each other.<br><br>' +
            '<img src="' +
            SemanticWeb +
            '" alt="ScreenShot" style="width: 100%; height: 50%; margin-right: 10px; margin-bottom: 10px; border: 1px solid black;"/>' +
            'Source: <a href="https://www.w3c.it/talks/2005/openCulture/slide7-0.html" target="_blank">Semantic web</a><br><br>' +
            'Within the following sections we will introduce some of the main specifications that are involved in the Semantic Web: <br><br>' +
            'The <b>Resource Description Framework (RDF)</b> is a <a href="https://www.w3.org/TR/rdf12-concepts/" target="_blank">W3C specification</a> that defines a simple graph-based data model for describing resources. A resource in RDF is any object of interest that can be identified by a URL (Unified Resource Locator) (e.g. a process or part of a semiconductor). A data model based on a graph is understood here to mean that the resources and the connection between resources can be represented in the form of nodes and edges of a directed graph.<br>' +
            'The basic element of the model is formed by the so-called triples, which can be used to express a statement about the resources under consideration. A triple (t) is composed of the elements subject (s), predicate (p) and object (o) and is formally expressed as t:=(s, p, o). In RDF terms, both the subject and the object are resources that are connected via the predicate.<br><br>' +
            '<div style="display: flex; justify-content: center; align-items: center;">' +
            '<img src="' +
            SpoSemantic +
            '" alt="ScreenShot" style="border: 1px solid black;" />' +
            '</div><br>' +
            'The <b>Resource Description Framework Schema (RDFS)</b> is a <a href="https://www.w3.org/TR/rdf12-schema/" target="_blank">W3C description language specification</a> that builds on the RDF Data Model specification documentation. RDFS is a description language that provides a vocabulary for grouping and linking resources. RDFS introduces classes (rdfs:Class) and properties of those classes. Classes are used in RDFS to group the resources described by RDF in a meaningful way. Resources belonging to an rdfs:Class are called instances of that class. Instances of classes have certain properties that link them together. One of the properties provided via RDFS is the subclass relationship, which states that a class C2 is a subclass of C1. This relationship is expressed as: C2 rdfs:subClassOf C1. The subclass relationship makes it possible to express hierarchical relationships between classes and their instances.<br>' +
            'In addition to the hierarchical order, other classification features can also be expressed for the systematic classification of resources. Properties in RDFS are restricted by specifying the so-called domain and range. The domain indicates that a property (R) is restricted to the application of instances of certain classes and is expressed as: R rdfs:domain C1. The range, in turn, specifies the instances to which this relation can be applied: R rdfs:range C2.<br>' +
            '<b>Web Ontology Language:</b> RDFS is limited in its expressiveness to the specification of classes and certain properties of relations. Other properties, such as the disjointness of classes, the combination of classes (union, intersection, complement of classes), restrictions on cardinality or certain peculiarities of properties such as their transitivity or uniqueness cannot be expressed in RDFS. The W3C therefore specifies the ontology language OWL. The OWL specification exists in three variants: OWL Lite, OWL DL and OWL Full. Based on the language scope of OWL Lite, the following two variants OWL DL and OWL Full build on each other in their expressive power in the order mentioned.'
    },
    {
        id: '5',
        heading: 'Portal Use Case',
        content:
            'This use case illustrates the process of introducing a new team member to the work on the Digital Reference ontology.<br><br>' +
            "To provide a more detailed scope, the new team member is external to my organization and operates from a different city. As a Knowledge Worker unfamiliar with the Digital Reference Ontology, I begin by requesting the new member to acquaint themselves with the ontology and other relevant ontologies through our platform's SC3 collection. To facilitate this, I guide them to register in our system (OCP: Using the Portal with or without Registration). Following successful registration, the new member gains access to all public projects (OCP: Collect Relevant Ontologies in Projects) available on the platform.<br><br>" +
            'Next, I invite the new team member to a virtual meeting to delve into the intricacies of the DR ontology. To prepare for this, I import (OCP: Import an Ontology in the Portal) the latest version of the DR ontology directly from GitHub into our SC3 collection on the platform.<br><br>' +
            "During our virtual meeting, I aim to provide an overview of the complexity of the DR ontology. To achieve this, we utilize the SC3 Platform's Graph View (OCP: Visualize Details of an Ontology), which presents a comprehensive visualization of all classes, properties, and their interconnections.<br><br>" +
            'To focus the introduction, I highlight various ontology modules. We employ color-coding in the Graph View to indicate existing modules and their positions within the overall ontology.<br><br>' +
            'Following the general introduction, I assign the new team member the task of addressing inconsistencies in the modeling of a "Person" and their "Roles" within the DR ontology. To facilitate this, I open the widget-based view, search for the "Person" concept, and engage in discussions about its recent modeling.<br><br>' +
            'After our introductory session, the new member accesses the DR ontology through the WebProtege application on the platform (OCP: WebProtege for Collaborative Work on the Ontology). They clone the latest version of the DR ontology from GitHub within WebProtege and proceed to make necessary modifications. To facilitate collaboration and discussion with other colleagues, they push their changes via WebProtege to a feature branch in GitHub.<br><br>' +
            'In the subsequent meeting, the team discusses the proposed changes by visualizing the differences at the textual level. Additionally, the Hybrid view is utilized to showcase direct connections and further aid the discussion.'
    },
    {
        id: '6',
        heading: 'Establish and Maintain Ontology\n',
        content:
            'As a basic best practice, an ontology should be created and maintained from the beginning in a version control system. Like <a href="https://github.com/" target="_blank">GitHub</a> or <a href="https://gitlab.com/" target="_blank">GitLab</a>. This is important to track all changes to the ontology in terms of who made which change and when. For the Digital Reference Ontology we use the version control system <a href="https://github.com/tibonto/dr/tree/master" target="_blank">GitHub</a>.<br><br>' +
            'Although only a few defined authors have write access to the GitHub repository of the Digital Reference, it is openly accessible to everyone (e.g. to download the latest stable version). Just have a look.\n' +
            '<img src="' +
            EstablishMaintainOnto +
            ' " alt="ScreenShot" style="width: 100%; height: 100%; margin-right: 10px; margin-top: 10px; border: 1px solid black;"/>'
    },
    {
        id: '7',
        heading: 'OCP: Using the Portal with or without a Registration',
        content:
            'Our portal can basically be used with and without registration. Without registration, many functionalities can already be used in the public projects. However, some functionalities are only available for registered users. These include uploading ontologies to the portal, managing collaborators in projects, but also customizing the project description.\n' +
            'During registration, only the user name and email address are requested, and a password must be entered. No other information is requested. Registration can either be done manually or via an existing GitLab or GitHub account. Every registration needs to be validated by confirming the email that you receive from our portal.\n' +
            '<br><br>' +
            `<iframe
                width="100%"
                title="test123"
                height="425"
                src="https://www.youtube.com/embed/plWfMm_Pf8g?autoplay=1&mute=1&controls=0&loop=1&playlist=plWfMm_Pf8g&vq=highest"
                allowFullScreen
                allow="autoplay"
            />`
    },
    {
        id: '8',
        heading: 'OCP: Collect Relevant Ontologies in Projects',
        content:
            'The Ontology Curation Portal manages ontologies in Collections and Projects. A collection can be understood as a general filtering criteria. By now we have four collections: <br><br>' +
            '<li>SC3 Collection: here you find all projects that relates to SC3</li>' +
            '<li>SandBox is our playground that can be used to get familiar with the OCP</li>' +
            '<li>Public: all public projects \n</li>' +
            '<li>Private: all private projects </li> <br>' +
            'As such a collection is a bundle of projects. A project itself is a collection of ontologies on a specific topic. This makes it possible to individually compile all relevant ontologies on a topic and to have them available in one place for collaborative work with your team members. There are two types of projects. Public projects are visible and can be viewed by everyone and can be modified by all registered users. Private projects on the other hand can only be viewed and edited by members of that project. Depending on the framework conditions, the administrator of a project can also change this setting afterwards. If you would like to be invited to a private project, you can send the administrator an email directly using the letter symbol. from the project view you can as well delete the ontology from the project or download it as a file to your local computer. \n' +
            '<br><br>' +
            `<iframe
                width="100%"
                title="listofCollection"
                height="425"
                src="https://www.youtube.com/embed/8f43SqntMNk?autoplay=1&mute=1&controls=0&loop=1&playlist=8f43SqntMNk&vq=highest"
                allowFullScreen
                allow="autoplay"
            />`
    },
    {
        id: '9',
        heading: 'OCP: Import an Ontology in the Portal\n',
        content:
            'Before you can visualize and work with your ontology, you have to import them into our portal. The import functionality is accessible in any project in the upper left corner and can be used by users with Project Admin or System Admin roles. The portal provides two ways for you to import (make available) your ontologies in your portal projects.<br><br>' +
            '1. Local import <br>' +
            '2. Import from Git<br><br>' +
            'If your ontology is imported from an Git version control system, we provide information about its current version status. Essentially, we provide the information if you are looking at the latest Ontology version or a version behind the latest changes.\n' +
            '<br><br>' +
            `<iframe
                width="100%"
                title="uploadontologyfromGithub"
                height="425"
                src="https://www.youtube.com/embed/wcCjj0aYS3U?autoplay=1&mute=1&controls=0&loop=1&playlist=wcCjj0aYS3U&vq=highest"
                allowFullScreen
                allow="autoplay"
            />`
    },
    {
        id: '10',
        heading: 'OCP: Get an Overview-Visualisation of an Ontology',
        content:
            'To get a general overview of your ontology, you can use the graph-based visualization. \n' +
            'You access this visualization with the "Graph" tab on the flyout menu. The graph-based visualization represents each concept of an ontology as a labeled circle, all relationships between concepts are visualized by labeled (dashed) lines. This type of visualization builds up dynamically and can be adjusted interactively as desired.<br><br>' +
            'Using the flyout menu in the upper right corner, you can color certain parts of the ontology to better highlight them.<br><br>' +
            'If you need a static image for your further work, you can use the screenshot function. This allows you to either capture a single section or the entire screen. \n' +
            '<br><br>' +
            `<iframe
                width="100%"
                title="graphvisulization"
                height="425"
                src="https://www.youtube.com/embed/Wj9oJ2ysC4Q?autoplay=1&mute=1&controls=0&loop=1&playlist=Wj9oJ2ysC4Q&vq=highest"
                allowFullScreen
                allow="autoplay"
            />`
    },
    {
        id: '11',
        heading: 'OCP: Visualize Details of an Ontology',
        content:
            'If you are interested in certain details of your ontology you can use the hybrid mode of operation, that can be accessed via the "Hybrid" tab from the fly out menu. in this view you find the ontologie splitted in Ressources, Relations and metadata. Ressources are all the concepts of your ontology and relations are all the connections (properties) between the concepts. For ressources and relations, the portal provides the same set of functionality: <br><br>' +
            '<li>The "Text" button shows any Annotation, Axioms and Descreption as textual representation</li>' +
            '<li>The "Graph" button provides a visualization of the concepts with its direct connected concepts with a graph based visualization. </li><br>' +
            'Furthermore, the Metadata tab provides further information about the ontology itself, like some Gitlab related information, used namespaces and prefixes.<br><br>' +
            'Further information and functionality of theMetadata tab is provided in sections Create Ontology Documentation and Visualise differences between Ontology Versions.' +
            '<br><br>' +
            `<iframe
                width="100%"
                title="graphvisulization"
                height="425"
                src="https://www.youtube.com/embed/uY-8Tgnhji0?autoplay=1&mute=1&controls=0&loop=1&playlist=uY-8Tgnhji0&vq=highest"
                allowFullScreen
                allow="autoplay"
            />`
    },
    {
        id: '12',
        heading: 'OCP: WebProtege for Collaborative Work on the Ontology',
        content:
            'WebProtege is the web-based software of the widely used <a href="https://protege.stanford.edu/" target="_blank">Protege</a> tool from <a href="https://www.stanford.edu/" target="_blank">Stanford University</a>. TIB hosts its own WebProtege service for research projects. This service is a further development of the standard software and is currently loosely integrated into the OCP. Due to the loose coupling, a new registration or login is currently still required. A closer coupling of the two systems is being sought.<br>' +
            'In principle, we offer the WebProtege in the OCP to support the collaborative creation and editing of ontologies. An introduction to the tool itself would be too extensive. Interested readers are referred to the Stanford introduction. Please register and have a look about all the various functions and solutions that come with WebProtege.<br><br>' +
            'OCP Motivation and Outlook:  In the portal we plan to use WebProtege as follows: By default, WebProtege only allows the creation of projects from scratch or from locally available ontologies. With our extension, it is now also possible to clone Git-based ontology projects directly from Git (GitHub or GitLab) and load them into WebProtege for editing. After successful editing, the adapted ontology can then also be fed back into Git via WebProtege and then loaded back into OCP from there to close the loop.<br>' +
            'WARNING: this feature is not working yet in the loosely coupled portal integration. A fully working installation is available here. You can use it with the description below:<br><br>' +
            'If a Git-based ontology project is to be loaded into WebProtege, access must first be ensured. This is done by creating a Git Access Token for the repository and assigning in.<br><br>' +
            'To do so, first of all, please login into either your GitHub or GitLab account (depending on where the ontology is that you would like to import in WebProtege)<br><br>' +
            '1. Git<br><br>' +
            'A. GitHub:<br>' +
            '<li>Go to: <a href="https://github.com/settings/tokens" target="_blank">Settings / Developer Settings</a></li>' +
            '<li>Choose: Tokens (classic)</li>' +
            '<li>Tick: repo, admin:public_key, aufit_log, codespace, project, admin:gpg_key, admin:ssh_signing_key</li>' +
            '<li>Generate Token</li>' +
            '<li>ATTENTION: it is important to copy and save the displayed token in a secured place because it will never be shown again</li><br>' +
            'B. GitLab:<br>' +
            '<li>Go to your <a href="https://gitlab.com/-/profile/personal_access_tokens" target="_blank">profile personal access tokens</a></li>' +
            '<li>Provide a Token name and an Expiration date</li>' +
            '<li>Tick: api</li><br>' +
            '2. In WebProtege open your account to Change Personal Access Token<br>' +
            'Please copy your token here and save it.<br><br>' +
            '<img src="' +
            WEBPROTEGEIMAGE +
            '" alt="ScreenShot" style="width:100%; height: 100%; border: 1px solid black;" /><br><br>' +
            'Next, you have to Create a New Project and enter some Git Details: for the DR Ontology it is:<br>' +
            '<li>Git Repo URI: <a href="https://github.com/tibonto/dr" target="_blank">https://github.com/tibonto/dr</a></li>' +
            '<li>Relative Path in repo: DigitalReference.ttl</li><br>' +
            'Your project will automatically be created. For further interaction from WebProtege to Git, you have to use the menus on the WebProtege Project List view.'
    },
    {
        id: '13',
        heading: 'OCP: Create Ontology Documentation',
        content:
            'If you want to automatically create a documentation of the ontology of interest you can in the hybrid view Metadata tab, use the Widoco Documentation functionality. If you press on the Widoco Documentation tab the ontology will be processed into a document that is structured in Release information, Abstract, Table of content, and the specification of all concepts and relations. From this documentation you can as well download various serialization formats (JSON LD, RDF/XML, N Triple, and TTL) of your ontology to your local computer.'
    },
    {
        id: '14',
        heading: 'OCP: Visualize Differences Between Ontology Versions',
        content:
            'In some cases it is important to understand what the differences between two ontology versions are. For such use cases the portal provides in the Hybrid view, in the metadata tab the “Ontology Comparison”.  Here for the given ontologie you find two selection boxes. The first box provides you with proposals for the ontology version you want to see changes made the second selection box the ontology version to compare against.' +
            '<br><br>' +
            `<iframe
                width="100%"
                title="gitVersionComparison"
                height="425"
                src="https://www.youtube.com/embed/mFgI6fufHYc?autoplay=1&mute=1&controls=0&loop=1&playlist=mFgI6fufHYc&vq=highest"
                allowFullScreen
                allow="autoplay"
            />`
    },
    {
        id: '15',
        heading: 'OCP: User Roles',
        content: `
      <table style="margin-top: 20px;" border="1" responsive>
        <thead>
          <tr style="height: 40px;">
            <th style="padding: 10px;">Name</th>
            <th style="padding: 10px;">Role</th>
          </tr>
        </thead>
        <tbody>
          ${items
              .map(
                  item => `
              <tr>
                <td style="font-weight: 600; padding: 10px;">${item.name}</td>
                <td style="padding: 10px;">${item.role}</td>
              </tr>
            `
              )
              .join('')}
        </tbody>
      </table>
    `
    },
    {
        id: '16',
        heading: ' Presentation Material',
        content: `<iframe
            src="https://docs.google.com/presentation/d/154vcWKt-ei4W5b6LdTEeRhO26WPGQ0z1A5OO_UBStnw/embed"
            width="100%"
            height="500"
            allowFullScreen
            />`
    },
    {
        id: '17',
        heading: 'Scientific Publication',
        content: `
            <div>
                <a href="https://ceur-ws.org/Vol-3376/paper10.pdf" />
                <div style={{ padding: '20px 20px 20px 20px' }}>
                    <li>
                        <a target="_blank" href="https://ceur-ws.org/Vol-3376/paper11.pdf" rel="noreferrer">
                            Collaborative and Cross-Stakeholder Ontology Engineering
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://ceur-ws.org/Vol-3376/paper10.pdf " rel="noreferrer">
                            Collaborative Work on Ontologies - A Report
                        </a>
                    </li>
                    <li>
                        <a
                            target="_blank"
                            href="https://www.researchgate.net/profile/Nour-Ramzy/publication/358523968_The_Digital_Reference_Semantically_Connecting_Semiconductor_Supply_Chains_to_Customers_-The_Open_Online_Sales_and_Marketing_Vision/links/620619e2634ff774f4c214cf/The-Digital-Reference-Semantically-Connecting-Semiconductor-Supply-Chains-to-Customers-The-Open-Online-Sales-and-Marketing-Vision.pdf"
                            rel="noreferrer"
                        >
                            The Digital Reference: Semantically Connecting Semiconductor Supply Chains to Customers -The Open Online Sales and
                            Marketing Vision
                        </a>
                    </li>
                </div>
            </div>
        `
    }
];

const RootDiv = styled.div`
    display: flex;
    height: 100%;
    overflow: hidden;
`;

const LeftSidebar = styled.div`
    width: 25%;
    padding: 20px;
    overflow: hidden;
    background-color: #f8f9fa;

    h3 {
        margin-bottom: 20px;
        color: #333;
        font-family: 'Roboto', sans-serif;
    }
`;

const RightSidebar = styled.div`
    flex-grow: 1;
    height: 100%;
    padding: 20px;
    width: calc(100% - 25%);
    background-color: #fff;
    overflow-x: hidden;
`;

const Page = styled.div`
    margin-bottom: 20px;
    margin-left: 5%;
    margin-right: 5%;
    padding: 10px;
    border-radius: 4px;
    overflow-x: hidden;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h3`
    margin-bottom: 10px;
    color: #333;
`;

const PageContent = styled.p`
    text-align: justify;
    color: #666;
`;

const StyledLink = styled(Link)`
    display: block;
    overflow: hidden;
    color: #333;
    text-decoration: none;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }

    &.active {
        background-color: #e9ecef;
        font-weight: bold;
    }
`;

class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSection: null
        };
    }

    SelectedSection = value => {
        this.setState({ selectedSection: value });
    };

    renderDocument = () => {
        const { selectedSection } = this.state;

        if (!selectedSection && documentData.length > 0) {
            const firstSection = documentData[0];
            this.setState({ selectedSection: firstSection });
            return (
                <Page>
                    <PageTitle>{firstSection.heading}</PageTitle>
                    <PageContent>{firstSection.content}</PageContent>
                    {/*{firstSection.image && <StyledImage src={firstSection.image} alt={'ScreenShot'} />}*/}
                </Page>
            );
        } else if (selectedSection) {
            return (
                <Page>
                    <PageTitle>{selectedSection.heading}</PageTitle>
                    <PageContent dangerouslySetInnerHTML={{ __html: selectedSection.content }} />
                    {/*{selectedSection.image && <StyledImage src={selectedSection.image} alt={'ScreenShot'} />}*/}
                </Page>
            );
        } else {
            return <p>No sections available.</p>;
        }
    };

    renderTableOfContents = () => {
        const { selectedSection } = this.state;

        return documentData.map(item => {
            return (
                <li key={item.id}>
                    <StyledLink
                        to={`#${item.id}`}
                        onClick={() => this.SelectedSection(item)}
                        className={selectedSection?.id === item.id ? 'active' : ''}
                    >
                        {item.heading}
                    </StyledLink>
                </li>
            );
        });
    };

    render() {
        return (
            <RootDiv>
                <LeftSidebar>
                    <Scrollbars style={{ height: '100%' }}>
                        <h3 style={{ textAlign: 'center' }}>Table of Contents</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{this.renderTableOfContents()}</ul>
                    </Scrollbars>
                </LeftSidebar>
                <RightSidebar>
                    <div>
                        <div style={{ paddingRight: '20px' }}>{this.renderDocument()}</div>
                    </div>
                </RightSidebar>
            </RootDiv>
        );
    }
}

export default Training;
