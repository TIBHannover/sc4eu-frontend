import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatISOntology from '../assets/images/WhatIsOntology.png';
import EstablishMaintainOnto from '../assets/images/Establish&MaintainOnto.png';
import SemanticWeb from '../assets/images/SemanticWeb.png';
import SpoSemantic from '../assets/images/SPOSemanticWeb.png';
import WEBPROTEGEIMAGE from '../assets/images/WEBPROTEGEImage.png';
import { Page, PageTitle, PageContent, StyledTrainingLink, MobileTOC, LeftSidebar, RightSidebar, RootDiv } from 'styledComponents/styledComponents';
import { withTheme } from '@emotion/react';

// ---------------------------------------------------------------------------
// Table of Contents grouping
// ---------------------------------------------------------------------------
// The flat `documentData` list above stays untouched (ids are used as anchors
// and lookup keys everywhere). For the sidebar/mobile navigation we instead
// describe *how the ids should be grouped* into collapsible sections, so
// users can close the topics ("OCP" / "Vocabulary") - or the "For All Users"
// and "For Administrators" sub-topics - they are not interested in.
const OCP_IDS = ['OCP - Using the Portal', 'OCP - Collect Ontologies', 'OCP - Import Ontology', 'OCP - Ontology Overview', 'OCP - Ontology Details', 'OCP - WebProtege', 'OCP - Ontology Documentation', 'OCP - Ontology Differences'];
const VOCAB_INTRO_IDS = ['Vocabulary - Service', 'Vocabulary - Start', 'Vocabulary - Roles', 'Vocabulary - Term Status', 'Vocabulary - Agreement', 'Vocabulary - App', 'Vocabulary - Best Practices'];
const FOR_ALL_USERS_IDS = [
    'Vocabulary (Users) - New Term',
    'Vocabulary (Users) - Term Edit',
    'Vocabulary (Users) - Align Terms',
    'Vocabulary (Users) - Term Vote',
    'Vocabulary (Users) - Consensus Activity',
    'Vocabulary (Users) - Notification'
];
const FOR_ADMINISTRATORS_IDS = ['Vocabulary (Admin) - Start Consensus', 'Vocabulary (Admin) - Threshold', 'Vocabulary (Admin) - Stop Vote', 'Vocabulary (Admin) - Week Term'];
const INTRO_IDS = ['Welcome', 'SC4EU Motivation', 'Ontology', 'Digital Reference', 'Semantic Web', 'Bosch Demonstrator', 'Portal Use Case', 'Establish Ontology'];
const OUTRO_IDS = ['Presentation Material', 'Scientific Publication'];

const documentData = [
    {
        id: 'Welcome',
        heading: 'Welcome to the Ontology Curation Portal Training section',
        content:
            `This Ontology Curation Portal (OCP) is a solution that has emerged from the <a href="https://sc3-project.automotive.oth-aw.de/" target="_blank">Semantically Connected Semiconductor Supply Chains</a> project funded by the <a href="https://cordis.europa.eu/project/id/101007312/de" target="_blank">European Commission</a>. The portal is intended to be used by anyone involved in implementing processes or tools to support accurate information exchange and validation. Not only between humans, but also between machines, without human involvement, applying ontologies. In the next sections we give a brief overview and introduction to the general challenge we are addressing, what an ontology is and how it can be created and maintained, collection, visualization and authoring of ontologies.<br>` +
            '<br>' +
            'All sections of this training are as much as possible independent from other sections but interconnected. You can therefore read them randomly if you are only interested in certain topics. However, if you read them in our suggested order, you will get a good introduction to the features of the portal and the thinking behind them. <br><br>' +
            'Have fun :-)\n'
    },
    {
        id: 'SC4EU Motivation',
        heading: 'SC4EU Project Motivation: Consistent Communication in Complex Semiconductor Supply Chains',
        content:
            'The semiconductor production industry is a highly intricate field. It involves complex supply chains characterized by short product cycles, strong interdependencies with other industries, and numerous partners. Clear communication plays a crucial role in achieving success within this environment.<br><br>' +
            'Similar to other domains, the semiconductor industry possesses its own body of knowledge, encompassing specialized concepts and their relationships, along with the necessary vocabulary for effective communication. Hence, having a well-defined terminology is paramount for collaboration among experts, enabling them to articulate requirements, technical or non-technical specifications, and reports, among other things. To fulfill this requirement, a common language is essential, encompassing precise definitions of terms and resolving synonyms by establishing their interdependencies.<br><br>' +
            'Moreover, communication in the semiconductor industry often occurs between machines themselves. For instance, machines may automatically verify production workflows or establish consistency in delivery agreements. This requirement adds further complexity, necessitating the utilization of machine-readable and interpretable terminologies, commonly referred to as ontologies. The Digital Reference Ontology serves as the designated ontology for describing and comprehending the semiconductor industry.'
    },
    {
        id: 'Ontology',
        heading: 'What is Ontology?',
        content:
            'In the field of computer science, ontologies offer a robust solution for effectively organizing complex facts in a manner that facilitates clear communication between machines. They enable machines to comprehend and exchange information about various aspects, such as the manufacturing process of a semiconductor component, the necessary materials, involved machinery, and human expertise. Coordinating and defining the combination of these resources becomes crucial, spanning across different departments and organizations.<br><br>' +
            'Away from any technical details, on a very general level, an ontology can be understood and represented as a graph, with labeled connections. The example below is a very general visual representation of Ontology. It essentially describes that a process has input and output of type Data and that a certain software is needed with a specific version property. This visual representation of the introduced description of a process can be understood by humans, because it shows the involved concepts (Like Process or Software) and its interrelation through labeled arcs. However, such a representation can only be used to define the ontology and to use processes where humans are involved. For machine based processing of ontologies, a different representation is required that transports the information in a machine consumable format. Various formats have been proposed by the <a href="https://www.w3.org/standards/semanticweb/ontology" target="_blank"> W3C standardization body </a>. A snippet how it can look you can see aside the graphical representation.<br><br>' +
            '<img src="' +
            WhatISOntology +
            ' " alt="ScreenShot" style="width: 100%; height: 100%; margin-right: 10px; margin-top: 10px; border: 1px solid black;"/>'
    },
    {
        id: 'Digital Reference',
        heading: 'Digital Reference – a holistic ontology for the semiconductor supply chains and supply chains containing semiconductors',
        content:
            'Digital Reference ontology reflects the supply chain-related Semantic Web of the semiconductor industry and the corresponding supply chains. It combines different supply chain structures and semiconductor production concepts and entities, like Supply Chain Networks, Digital Production and Product Lifecycle Management. Digital Reference can be seen as an enabler for industry digitalization. In the Semantic Web, the well-defined and structured information enables computers and people to work in cooperation and to automate industrial, collaborative B2B processes, e.g. in supply chain management and product development.<br/>' +
            '<br>' +
            'Digital Reference is the current emerging standard of ontologies for semiconductor and supply chains containing semiconductors. Various organizations can use it as a standard to represent their supply chain, in part or in full. This ontology can be used as a base to connect different data sources for semiconductor companies and connected supply chains. It has also been recognized by <a href="https://www.semi.org/en/" target="_blank">SEMI</a> ,  the industry association serving the global electronics manufacturing and design supply chain, as one of the solutions to better withstand supply chain disruptions and to advance and agile global electronics supply chain.  <br><br>' +
            'Within the <a href="https://www.semi.org/en/industry-groups/supply-chain-management" target="_blank">Supply Chain Management (SCM) Initiative</a>, of which Infineon Technologies is a founding member and leader of German and European activities, Digital Reference has been introduces as a key component to mitigate the bullwhip effect by obtaining high-quality, reliable data for semiconductor demand forecasting. In the proposed solution, data should be gathered via an anonymous survey based on Multi-Party Computation technology. Anonymity and security of data flow will encourage business partners to share their true demand data. Then, the gathered data will be mapped onto the Digital Reference and processed with AI tools for demand breakdown of fine granularity.<br/><br/>' +
            'The Digital Reference consists of thematic clusters, covering all stages of the supply chain and providing both human and machine with a concise knowledge base. It contains approximately 1000 classes, which enable to define several concepts in different domains. Based on the structure of the human brain, parts of the ontology are represented as lobes, i.e. taxonomies for classes and properties clusters: Cloud, Organization, Planning, Power, Process, Product, Semiconductor Development, Semiconductor Production, Sensor, Sensor, Supply Chain, Sustainability, System, Time, and Wired Communication.' +
            '<br><br>' +
            `<iframe
                width="100%"
                height="500"
                src="https://docs.google.com/presentation/d/1EHcWTO4t-FjX81S4k_DEDfZGWIL4HWK3/embed"
                allowFullScreen
    />`
    },
    {
        id: 'Semantic Web',
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
        id: 'Bosch Demonstrator',
        heading: 'Bosch Demonstrator (Requirements Gatherings & Use Case Definition ) ',
        content:
            'Integrating Generic Data Model Updates with Domain Ontology: Elevating Digital References\n' +
            '\n' +
            'Efficient digital reference systems rely on accurate information retrieval. By seamlessly incorporating updates from a generic data model into a domain ontology, we can enhance the precision and relevance of digital references. This fusion of data structure and domain-specific semantics aims to close the gap between raw data and user queries, promising a new era of improved digital reference experiences.' +
            '<br><br>' +
            `<VideoWrapper>
                <iframe
                    title="gitVersionComparison"
                    width="100%"
                    height="425"
                    src="https://www.youtube.com/embed/ioDXJezVgq0?controls=0&loop=1&playlist=ioDXJezVgq0&vq=highest"
                    allowFullScreen
                    
                />
            </VideoWrapper>`
    },
    {
        id: 'Portal Use Case',
        heading: 'Portal Use Case',
        content:
            'This use case illustrates the process of introducing a new team member to the work on the Digital Reference ontology.<br><br>' +
            "To provide a more detailed scope, the new team member is external to my organization and operates from a different city. As a Knowledge Worker unfamiliar with the Digital Reference Ontology, I begin by requesting the new member to acquaint themselves with the ontology and other relevant ontologies through our platform's SC4EU collection. To facilitate this, I guide them to register in our system (Using the Portal with or without Registration). Following successful registration, the new member gains access to all public projects (Collect Relevant Ontologies in Projects) available on the platform.<br><br>" +
            'Next, I invite the new team member to a virtual meeting to delve into the intricacies of the DR ontology. To prepare for this, I import (Import an Ontology in the Portal) the latest version of the DR ontology directly from GitHub into our SC4EU collection on the platform.<br><br>' +
            "During our virtual meeting, I aim to provide an overview of the complexity of the DR ontology. To achieve this, we utilize the SC4EU Platform's Graph View (Visualize Details of an Ontology), which presents a comprehensive visualization of all classes, properties, and their interconnections.<br><br>" +
            'To focus the introduction, I highlight various ontology modules. We employ color-coding in the Graph View to indicate existing modules and their positions within the overall ontology.<br><br>' +
            'Following the general introduction, I assign the new team member the task of addressing inconsistencies in the modeling of a "Person" and their "Roles" within the DR ontology. To facilitate this, I open the widget-based view, search for the "Person" concept, and engage in discussions about its recent modeling.<br><br>' +
            'After our introductory session, the new member accesses the DR ontology through the WebProtege application on the platform (WebProtege for Collaborative Work on the Ontology). They clone the latest version of the DR ontology from GitHub within WebProtege and proceed to make necessary modifications. To facilitate collaboration and discussion with other colleagues, they push their changes via WebProtege to a feature branch in GitHub.<br><br>' +
            'In the subsequent meeting, the team discusses the proposed changes by visualizing the differences at the textual level. Additionally, the Hybrid view is utilized to showcase direct connections and further aid the discussion.'
    },
    {
        id: 'Establish Ontology',
        heading: 'Establish and Maintain Ontology\n',
        content:
            'As a basic best practice, an ontology should be created and maintained from the beginning in a version control system. Like <a href="https://github.com/" target="_blank">GitHub</a> or <a href="https://gitlab.com/" target="_blank">GitLab</a>. This is important to track all changes to the ontology in terms of who made which change and when. For the Digital Reference Ontology we use the version control system <a href="https://github.com/tibonto/dr/tree/master" target="_blank">GitHub</a>.<br><br>' +
            'Although only a few defined authors have write access to the GitHub repository of the Digital Reference, it is openly accessible to everyone (e.g. to download the latest stable version). Just have a look.\n' +
            '<img src="' +
            EstablishMaintainOnto +
            ' " alt="ScreenShot" style="width: 100%; height: 100%; margin-right: 10px; margin-top: 10px; border: 1px solid black;"/>'
    },
    {
        id: 'OCP - Using the Portal',
        heading: 'Using the Portal with or without a Registration',
        content:
            'Our portal can basically be used with and without registration. Without registration, many functionalities can already be used in the public projects. However, some functionalities are only available for registered users. These include uploading ontologies to the portal, managing collaborators in projects, but also customizing the project description.\n' +
            'During registration, only the user name and email address are requested, and a password must be entered. No other information is requested. Registration can either be done manually or via an existing GitLab or GitHub account. Every registration needs to be validated by confirming the email that you receive from our portal.\n' +
            '<br><br>' +
            `<VideoWrapper>
                <iframe
                    title="portalNoAuth"
                    width="100%"
                    height="425"
                    src="https://www.youtube.com/embed/plWfMm_Pf8g?mute=1&controls=0&loop=1&playlist=plWfMm_Pf8g&vq=highest"
                    allowFullScreen
                    
                />
            </VideoWrapper>`
    },
    {
        id: 'OCP - Collect Ontologies',
        heading: 'Collect Relevant Ontologies in Projects',
        content:
            'The Ontology Curation Portal manages ontologies in Collections and Projects. A collection can be understood as a general filtering criteria. By now we have four collections: <br><br>' +
            '<ul>' +
            '<li>SC4EU Collection: here you find all projects that relates to SC4EU</li>' +
            '<li>SandBox is our playground that can be used to get familiar with the OCP</li>' +
            '<li>Public: all public projects \n</li>' +
            '<li>Private: all private projects </li>' +
            '</ul>' +
            'As such a collection is a bundle of projects. A project itself is a collection of ontologies on a specific topic. This makes it possible to individually compile all relevant ontologies on a topic and to have them available in one place for collaborative work with your team members. There are two types of projects. Public projects are visible and can be viewed by everyone and can be modified by all registered users. Private projects on the other hand can only be viewed and edited by members of that project. Depending on the framework conditions, the administrator of a project can also change this setting afterwards. If you would like to be invited to a private project, you can send the administrator an email directly using the letter symbol. from the project view you can as well delete the ontology from the project or download it as a file to your local computer. \n' +
            '<br><br>' +
            `<VideoWrapper>
                <iframe
                    title="listofCollection"
                    width="100%"
                    height="425"
                    src="https://www.youtube.com/embed/8f43SqntMNk?mute=1&controls=0&loop=1&playlist=8f43SqntMNk&vq=highest"
                    allowFullScreen
                    
                />
            </VideoWrapper>`
    },
    {
        id: 'OCP - Import Ontology',
        heading: 'Import an Ontology in the Portal\n',
        content:
            'Before you can visualize and work with your ontology, you have to import them into our portal. The import functionality is accessible in any project in the upper left corner and can be used by users with Project Admin or System Admin roles. The portal provides two ways for you to import (make available) your ontologies in your portal projects.<br><br>' +
            '1. Local import <br>' +
            '2. Import from Git<br><br>' +
            'If your ontology is imported from an Git version control system, we provide information about its current version status. Essentially, we provide the information if you are looking at the latest Ontology version or a version behind the latest changes.\n' +
            '<br><br>' +
            `<VideoWrapper>
                <iframe
                    title="uploadontologyfromGithub"
                    width="100%"
                    height="425"
                    src="https://www.youtube.com/embed/wcCjj0aYS3U?mute=1&controls=0&loop=1&playlist=wcCjj0aYS3U&vq=highest"
                    allowFullScreen
                    
                />
            </VideoWrapper>`
    },
    {
        id: 'OCP - Ontology Overview',
        heading: 'Get an Overview-Visualisation of an Ontology',
        content:
            'To get a general overview of your ontology, you can use the graph-based visualization. \n' +
            'You access this visualization with the "Graph" tab on the flyout menu. The graph-based visualization represents each concept of an ontology as a labeled circle, all relationships between concepts are visualized by labeled (dashed) lines. This type of visualization builds up dynamically and can be adjusted interactively as desired.<br><br>' +
            'Using the flyout menu in the upper right corner, you can color certain parts of the ontology to better highlight them.<br><br>' +
            'If you need a static image for your further work, you can use the screenshot function. This allows you to either capture a single section or the entire screen. \n' +
            '<br><br>' +
            `<VideoWrapper>
                <iframe
                    width="100%"
                    title="graphvisulization"
                    height="425"
                    src="https://www.youtube.com/embed/Wj9oJ2ysC4Q?mute=1&controls=0&loop=1&playlist=Wj9oJ2ysC4Q&vq=highest"
                    allowFullScreen
                    
                />
            </VideoWrapper>`
    },
    {
        id: 'OCP - Ontology Details',
        heading: 'Visualize Details of an Ontology',
        content:
            'If you are interested in certain details of your ontology you can use the hybrid mode of operation, that can be accessed via the "Hybrid" tab from the fly out menu. in this view you find the ontologie splitted in Ressources, Relations and metadata. Ressources are all the concepts of your ontology and relations are all the connections (properties) between the concepts. For ressources and relations, the portal provides the same set of functionality: <br><br>' +
            '<ul>' +
            '<li>The "Text" button shows any Annotation, Axioms and Descreption as textual representation</li>' +
            '<li>The "Graph" button provides a visualization of the concepts with its direct connected concepts with a graph based visualization. </li>' +
            '</ul>' +
            'Furthermore, the Metadata tab provides further information about the ontology itself, like some Gitlab related information, used namespaces and prefixes.<br><br>' +
            'Further information and functionality of theMetadata tab is provided in sections Create Ontology Documentation and Visualise differences between Ontology Versions.' +
            '<br><br>' +
            `<VideoWrapper>
                <iframe
                    title="graphvisulization"
                    width="100%"
                    height="425"
                    src="https://www.youtube.com/embed/uY-8Tgnhji0?mute=1&controls=0&loop=1&playlist=uY-8Tgnhji0&vq=highest"
                    allowFullScreen
                    
                />
            </VideoWrapper>`
    },
    {
        id: 'OCP - WebProtege',
        heading: 'WebProtege for Collaborative Work on the Ontology',
        content:
            'WebProtege is the web-based software of the widely used <a href="https://protege.stanford.edu/" target="_blank">Protege</a> tool from <a href="https://www.stanford.edu/" target="_blank">Stanford University</a>. TIB hosts its own WebProtege service for research projects. This service is a further development of the standard software and is currently loosely integrated into the OCP. Due to the loose coupling, a new registration or login is currently still required. A closer coupling of the two systems is being sought.<br>' +
            'In principle, we offer the WebProtege in the OCP to support the collaborative creation and editing of ontologies. An introduction to the tool itself would be too extensive. Interested readers are referred to the Stanford introduction. Please register and have a look about all the various functions and solutions that come with WebProtege.<br><br>' +
            'OCP Motivation and Outlook:  In the portal we plan to use WebProtege as follows: By default, WebProtege only allows the creation of projects from scratch or from locally available ontologies. With our extension, it is now also possible to clone Git-based ontology projects directly from Git (GitHub or GitLab) and load them into WebProtege for editing. After successful editing, the adapted ontology can then also be fed back into Git via WebProtege and then loaded back into OCP from there to close the loop.<br>' +
            'WARNING: this feature is not working yet in the loosely coupled portal integration. A fully working installation is available here. You can use it with the description below:<br><br>' +
            'If a Git-based ontology project is to be loaded into WebProtege, access must first be ensured. This is done by creating a Git Access Token for the repository and assigning in.<br><br>' +
            'To do so, first of all, please login into either your GitHub or GitLab account (depending on where the ontology is that you would like to import in WebProtege)<br><br>' +
            '1. Git<br><br>' +
            'A. GitHub:<br>' +
            '<ul>' +
            '<li>Go to: <a href="https://github.com/settings/tokens" target="_blank">Settings / Developer Settings</a></li>' +
            '<li>Choose: Tokens (classic)</li>' +
            '<li>Tick: repo, admin:public_key, aufit_log, codespace, project, admin:gpg_key, admin:ssh_signing_key</li>' +
            '<li>Generate Token</li>' +
            '<li>ATTENTION: it is important to copy and save the displayed token in a secured place because it will never be shown again</li>' +
            '</ul>' +
            'B. GitLab:<br>' +
            '<ul>' +
            '<li>Go to your <a href="https://gitlab.com/-/profile/personal_access_tokens" target="_blank">profile personal access tokens</a></li>' +
            '<li>Provide a Token name and an Expiration date</li>' +
            '<li>Tick: api</li>' +
            '</ul>' +
            '2. In WebProtege open your account to Change Personal Access Token<br>' +
            'Please copy your token here and save it.<br><br>' +
            '<img src="' +
            WEBPROTEGEIMAGE +
            '" alt="ScreenShot" style="width:100%; height: 100%; border: 1px solid black;" /><br><br>' +
            'Next, you have to Create a New Project and enter some Git Details: for the DR Ontology it is:<br>' +
            '<ul>' +
            '<li>Git Repo URI: <a href="https://github.com/tibonto/dr" target="_blank">https://github.com/tibonto/dr</a></li>' +
            '<li>Relative Path in repo: DigitalReference.ttl</li>' +
            '</ul>' +
            'Your project will automatically be created. For further interaction from WebProtege to Git, you have to use the menus on the WebProtege Project List view.'
    },
    {
        id: 'OCP - Ontology Documentation',
        heading: 'Create Ontology Documentation',
        content:
            'If you want to automatically create a documentation of the ontology of interest you can in the hybrid view Metadata tab, use the Widoco Documentation functionality. If you press on the Widoco Documentation tab the ontology will be processed into a document that is structured in Release information, Abstract, Table of content, and the specification of all concepts and relations. From this documentation you can as well download various serialization formats (JSON LD, RDF/XML, N Triple, and TTL) of your ontology to your local computer.'
    },
    {
        id: 'OCP - Ontology Differences',
        heading: 'Visualize Differences Between Ontology Versions',
        content:
            'In some cases it is important to understand what the differences between two ontology versions are. For such use cases the portal provides in the Hybrid view, in the metadata tab the “Ontology Comparison”.  Here for the given ontologie you find two selection boxes. The first box provides you with proposals for the ontology version you want to see changes made the second selection box the ontology version to compare against.' +
            '<br><br>' +
            `<VideoWrapper>
            <iframe
                title="gitVersionComparison"
                width="100%"
                height="425"
                src="https://www.youtube.com/embed/mFgI6fufHYc?mute=1&controls=0&loop=1&playlist=mFgI6fufHYc&vq=highest"
                allowFullScreen
            />
            </VideoWrapper>`
    },
    {
        id: '18',
        heading: 'How to participate in a consensus (video)',
        content:
            'Discover how to review terms, join ongoing consensuses, and vote using our majority-decision system to shape shared expectations.' +
            '<br><br>' +
            `<VideoWrapper>
                <iframe
                    title="vocabulary_consensus"
                    width="100%"
                    height="425"
                    src="https://www.youtube.com/embed/dS8nmqGKgeg"
                    allowFullScreen
                />
            </VideoWrapper>`
    },
    {
        id: 'Vocabulary - Service',
        heading: 'About Service',
        content:
            'The Vocabulary Development Support Service helps communities collaboratively develop, discuss, agree on, and maintain a shared terminology.<br><br>' +
            'Users can propose new terms, refine definitions together, comment on terms, vote on proposed terminology, and integrate accepted terms into a shared vocabulary. The service keeps discussions, edits, votes, and decisions traceable so that the development of each term remains transparent.<br><br>' +
            'This documentation uses the following terms:<br><br>' +
            '<ul>' +
            '<li><b>Service</b> refers to the overall Vocabulary Development Support Service and its functionality.</li>' +
            '<li><b>Portal</b> refers to the web interface that users access in a browser.</li>' +
            '<li><b>App</b> refers to the installed Progressive Web App version of the portal.</li>' +
            '<li><b>Term</b> refers to an entry in the vocabulary, usually consisting of a label, definition, and optional metadata.</li>' +
            '<li><b>Shared vocabulary</b> refers to the collection of terms that have been proposed, discussed, and, where applicable, accepted by the community.</li>' +
            '</ul>' +
            '<br>' +
            '<b>Why the Service Matters</b><br>' +
            'Shared vocabularies support communication across disciplinary, organizational, and technical boundaries. They help communities define and align the terms they use to describe a shared domain.<br><br>' +
            'A key benefit of the service is that it supports a shared understanding of concepts. A term label and its definition should be understood consistently by the community using them. By discussing, refining, and voting on terms, differences in interpretation become visible and can be resolved.<br><br>' +
            'This is especially important when building formal knowledge structures such as ontologies. Ontologies often rely on clearly defined concepts, labels, definitions, and relationships. The service helps connect community knowledge with formal knowledge representation by allowing domain experts to review, validate, and refine terminology before or after it is used in an ontology.<br><br>' +
            '<b>Build the Vocabulary</b><br>' +
            'A shared terminology helps a community communicate more clearly and consistently. The service allows users to collect, define, discuss, and agree on terms needed for internal and external communication.'
    },
    {
        id: 'Vocabulary - Start',
        heading: 'Quick Start & Typical Workflow',
        content:
            'A typical terminology development process works as follows:<br><br>' +
            '<ol>' +
            '<li>Log in to the portal.</li>' +
            '<li>Open the Vocabulary Tool.</li>' +
            '<li>Propose a new term or reuse an existing suggested term.</li>' +
            '<li>Discuss the term with other users.</li>' +
            '<li>Edit the term if improvements are needed.</li>' +
            '<li>Wait for an administrator to start a consensus vote.</li>' +
            '<li>Vote to accept or reject the term.</li>' +
            '<li>Once the required participation threshold and majority are reached, the decision is recorded.</li>' +
            '<li>Accepted terms become part of the shared vocabulary.</li>' +
            '<li>Use the Timeline, Information Hub, and Activity Widget to monitor progress and review changes.</li>' +
            '</ol>' +
            '<br>' +
            '<b>Typical Workflow</b><br>' +
            'The following workflow summarizes the complete vocabulary development process in more detail:' +
            '<ol>' +
            '<li>A user proposes a new term.</li>' +
            '<li>The service suggests existing terminology for possible reuse.</li>' +
            '<li>Users discuss the term.</li>' +
            '<li>Users refine the label, definition, and metadata.</li>' +
            '<li>The Timeline records all changes.</li>' +
            '<li>An administrator starts a consensus vote.</li>' +
            '<li>The term is locked for editing.</li>' +
            '<li>Users vote Accept or Reject.</li>' +
            '<li>Users may change their vote while the vote is active.</li>' +
            '<li>A decision is reached when the participation threshold and 75% majority condition are met.</li>' +
            '<li>Accepted terms are added to the shared vocabulary.</li>' +
            '<li>The full history remains available in the Timeline.</li>' +
            '<li>The accepted terminology can be used for further formalization, for example in an ontology.</li>' +
            '</ol>'
    },
    {
        id: 'Vocabulary - Roles',
        heading: 'Access and User Roles',
        content:
            'To use the service, you must be logged in to the portal. You can log in using:<br><br>' +
            '<ul>' +
            '<li>an existing GitHub account</li>' +
            '<li>an existing GitLab account</li>' +
            '<li>or an existing email address</li>' +
            '</ul>' +
            'There are two user roles in the service.<br><br>' +
            '<b>Users can:</b><br>' +
            '<ul>' +
            '<li>propose new terms</li>' +
            '<li>reuse suggested existing terms</li>' +
            '<li>edit terms</li>' +
            '<li>comment on terms</li>' +
            '<li>reply to comments</li>' +
            '<li>mention other users</li>' +
            '<li>react to comments</li>' +
            '<li>vote in consensus votes</li>' +
            '<li>search for terms and activity</li>' +
            '<li>monitor changes and discussions</li>' +
            '</ul>' +
            '<b>Administrators have all user permissions. In addition, they can:</b><br>' +
            '<ul>' +
            '<li>start consensus votes</li>' +
            '<li>define the participation threshold for a vote</li>' +
            '<li>close or stop active votes if changes are needed</li>' +
            '<li>highlight the Term of the Week</li>' +
            '</ul>' +
            'All users can contribute to terminology development. Administrators manage the formal consensus process.'
    },
    {
        id: 'Vocabulary (Users) - New Term',
        heading: 'Propose a New Term',
        content:
            'Use this function when you want to add a term to the vocabulary process.<br><br>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Log in to the portal.</li>' +
            '<li>Open the Vocabulary Tool.</li>' +
            '<li>Select Create New Term.</li>' +
            '<li>Choose one of the following options:</li>' +
            '</ol>' +
            '<b>Option 1: Search Existing Terminology</b>' +
            '<ol>' +
            '<li>Type the label of the term you want to include.</li>' +
            '<li>Review the suggested terms.</li>' +
            '<li>Select a fitting suggested term to include it in your vocabulary.</li>' +
            '</ol>' +
            'The auto-suggest feature uses the TIB Terminology Service to check for existing labels and propose terms for reuse.<br><br>' +
            '<b>Option 2: Manual Entry</b>' +
            '<ol>' +
            '<li>Enter the term label.</li>' +
            '<li>Enter a clear definition.</li>' +
            '<li>Add metadata, if applicable.</li>' +
            '<li>Submit the term.</li>' +
            '</ol>' +
            '<b>Result:</b> The new term is added to the vocabulary process and can be discussed, edited, and later brought to a consensus vote.<br><br>' +
            '<i><b>Best Practice:</b> Always review suggested terms before creating a new entry. Reuse an established term whenever it matches the intended meaning. This helps avoid duplicates and conflicting definitions.</i>'
    },
    {
        id: 'Vocabulary (Users) - Term Edit',
        heading: 'Edit a Term',
        content:
            'Users can edit existing terms as long as the term is not part of an active consensus vote.<br><br>' +
            'You may edit a term to:<br>' +
            '<ul>' +
            '<li>improve its definition</li>' +
            '<li>correct wording</li>' +
            '<li>add or update metadata</li>' +
            '<li>align the term with feedback from the discussion</li>' +
            '<li>clarify the intended meaning</li>' +
            '</ul>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Open the term in the portal.</li>' +
            '<li>Select the edit option.</li>' +
            '<li>Update the label, definition, or metadata.</li>' +
            '<li>Save the changes.</li>' +
            '</ol>' +
            '<b>Result:</b> The updated version is stored. The change is recorded in the Timeline, so users can review how the term has evolved over time.<br><br>' +
            '<i><b>Important Note:</b> Terms cannot be edited while an active consensus vote is running. This ensures that all participants vote on the same version of the label, definition, and metadata. If changes are needed during a vote, an administrator must close or stop the active vote before the term can be revised.</i>'
    },
    {
        id: 'Vocabulary (Users) - Align Terms',
        heading: 'Discuss, Comment, Reply, and Mention',
        content:
            'Each term has its own discussion area. This allows users to discuss meaning, wording, scope, relevance, and possible improvements directly in the context of the term.<br><br>' +
            'Users can:<br>' +
            '<ul>' +
            '<li>write comments</li>' +
            '<li>reply to existing comments</li>' +
            '<li>react with emojis</li>' +
            '<li>mention other users</li>' +
            '</ul>' +
            '<br>' +
            '<b>Comment on a Term</b><br>' +
            'Use comments to ask questions, suggest improvements, explain concerns, or support a proposed definition.<br><br>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Open the term in the portal.</li>' +
            '<li>Go to the discussion area.</li>' +
            '<li>Enter your comment.</li>' +
            '<li>Submit the comment.</li>' +
            '</ol>' +
            '<b>Result:</b> Your comment is added to the discussion thread of the term and becomes part of the traceable discussion history.<br><br>' +
            '<b>Reply to a Comment</b><br>' +
            'Replies help keep related discussion points together. Use a reply when you are responding to a specific comment instead of starting a separate discussion thread.<br><br>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Open the term.</li>' +
            '<li>Go to the relevant comment.</li>' +
            '<li>Select the reply option.</li>' +
            '<li>Enter your response.</li>' +
            '<li>Submit the reply.</li>' +
            '</ol>' +
            '<b>Mention Other Users</b><br>' +
            'You can mention another user when their input is needed.<br><br>' +
            '<b>How to Mention a User:</b> Type @ followed by the user’s name.<br><br>' +
            '<i>Example: @Maria Could you review this definition?</i><br><br>' +
            '<b>Result:</b> Mentioned users are tracked by the service and can navigate directly to the relevant term or comment. Depending on their notification settings, they may also receive a notification.'
    },
    {
        id: 'Vocabulary (Users) - Term Vote',
        heading: 'Vote on Terms & Consensus',
        content:
            'After a term has been discussed and refined, an administrator can start a formal consensus vote. All users can participate in active consensus votes.<br><br>' +
            'During a vote, users can choose one of two options:<br>' +
            '<ul>' +
            '<li>Accept – the term should be used in the vocabulary.</li>' +
            '<li>Reject – the term should not be included in the vocabulary in its current form.</li>' +
            '</ul>' +
            'A rejected term may be revised, discussed further, or removed from the vocabulary process, depending on the community’s decision and the administrative handling of the term.<br><br>' +
            '<b>Participate in a Consensus Vote</b><br>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Open the term with an active consensus vote.</li>' +
            '<li>Review the current label, definition, and metadata.</li>' +
            '<li>Review the discussion if needed.</li>' +
            '<li>Select one of the voting options: Accept or Reject.</li>' +
            '<li>Submit your vote.</li>' +
            '</ol>' +
            '<b>Result:</b> Your vote is counted as part of the consensus process.<br><br>' +
            '<b>Change Your Vote</b><br>' +
            'You can change your vote while the vote is still active. For example, you may first vote Reject and later change your vote to Accept if the discussion has clarified the meaning of the term.<br><br>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Open the term with the active vote.</li>' +
            '<li>Select the alternative voting option.</li>' +
            '<li>Confirm or submit the changed vote.</li>' +
            '</ol>' +
            '<b>Result:</b> Your previous vote is replaced by your new vote.<br><br>' +
            '<b>Consensus Conditions</b><br>' +
            'A decision is reached when both of the following conditions are met:<br>' +
            '<ol>' +
            '<li>The minimum participation threshold has been reached.</li>' +
            '<li>One option receives a majority of at least 75% of the submitted votes.</li>' +
            '</ol>' +
            'The participation threshold is defined by the administrator when setting up the vote.<br><br>' +
            'There is no fixed deadline for consensus votes. A vote remains active until the required participation threshold and majority condition are met, or until an administrator takes further action.<br><br>' +
            '<b>Editing During a Vote</b><br>' +
            'Terms cannot be edited while an active consensus vote is running. This ensures that all participants vote on the same version of the term.<br><br>' +
            'If changes are needed, an administrator must close or stop the active vote before the term can be revised.'
    },
    {
        id: 'Vocabulary (Users) - Consensus Activity',
        heading: 'Track Activity and Progress',
        content:
            'The service provides several tools to help users monitor current activity and review the history of vocabulary development.<br><br>' +
            'The most important tools are:<br>' +
            '<ul>' +
            '<li>Activity Widget</li>' +
            '<li>Information Hub</li>' +
            '<li>Timeline</li>' +
            '</ul>' +
            '<br>' +
            '<b>Activity Widget</b><br>' +
            'The Activity Widget provides a quick overview of terms that may require attention. You can find it above the term collection, on the left side of the page.<br><br>' +
            'The Activity Widget may highlight terms with:<br>' +
            '<ul>' +
            '<li>new discussion replies</li>' +
            '<li>newly added terms</li>' +
            '<li>unresolved discussions</li>' +
            '<li>recent mentions</li>' +
            '<li>active consensus votes</li>' +
            '</ul>' +
            'Use the Activity Widget to quickly identify where input, review, or action is needed.<br><br>' +
            '<b>Information Hub</b><br>' +
            'The Information Hub provides an overview of activity across the vocabulary. It lists ongoing discussions and related activity around terms.<br><br>' +
            'Users can search and filter activity by:<br>' +
            '<ul>' +
            '<li>comment</li>' +
            '<li>author</li>' +
            '<li>term label</li>' +
            '<li>mentioned user</li>' +
            '<li>date range</li>' +
            '</ul>' +
            'Search results can be sorted by:<br>' +
            '<ul>' +
            '<li>recency</li>' +
            '<li>alphabet</li>' +
            '<li>number of votes</li>' +
            '<li>number of comments</li>' +
            '</ul>' +
            'Use the Information Hub to find active discussions, review previous contributions, or identify terms that require attention.<br><br>' +
            '<b>Timeline</b><br>' +
            'The Timeline shows the chronological history of changes made to the vocabulary. It allows users to trace when a term was:<br>' +
            '<ul>' +
            '<li>added</li>' +
            '<li>edited</li>' +
            '<li>discussed</li>' +
            '<li>brought to a vote</li>' +
            '<li>accepted through consensus</li>' +
            '</ul>' +
            'Because all term edits are recorded in the Timeline, users can review how a term has changed over time.<br><br>' +
            'Use the Timeline to understand how a term developed and how agreement was reached.'
    },
    {
        id: 'Vocabulary (Users) - Notification',
        heading: 'Notifications',
        content:
            'The service includes a notification mechanism to help users stay informed about relevant activity.<br><br>' +
            'Notifications may be triggered when:<br>' +
            '<ul>' +
            '<li>you are mentioned in a comment</li>' +
            '<li>someone replies to your comment</li>' +
            '<li>there is new activity in relevant discussions</li>' +
            '<li>a term you are involved with receives updates</li>' +
            '</ul>' +
            'Notifications are delivered through the regular notification mechanisms of your device, browser, or operating system. This may include mobile notifications or desktop notifications, depending on your settings.<br><br>' +
            '<i><b>Tip:</b> To receive notifications, make sure that notifications are allowed in your browser and system settings.</i>'
    },
    {
        id: 'Vocabulary (Admin) - Start Consensus',
        heading: 'Start a Consensus Vote',
        content:
            'An administrator can start a consensus vote after a term has been discussed and refined.<br><br>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Open the term.</li>' +
            '<li>Review the current label, definition, metadata, and discussion.</li>' +
            '<li>Select the option to start a consensus vote.</li>' +
            '<li>Define the minimum participation threshold.</li>' +
            '<li>Start the vote.</li>' +
            '</ol>' +
            '<b>Result:</b> The vote becomes active. All users can vote Accept or Reject. The term is locked for editing while the vote is active.'
    },
    {
        id: 'Vocabulary (Admin) - Threshold',
        heading: 'Define the Participation Threshold',
        content:
            'The participation threshold specifies how many users must participate before a decision can be reached.<br><br>' +
            'When defining the threshold, consider:<br>' +
            '<ul>' +
            '<li>the size of the community</li>' +
            '<li>the importance of the term</li>' +
            '<li>the expected number of active participants</li>' +
            '<li>whether broad agreement is required</li>' +
            '</ul>' +
            'A decision can only be reached if the participation threshold is met and one voting option receives at least 75% of the submitted votes.'
    },
    {
        id: 'Vocabulary (Admin) - Stop Vote',
        heading: 'Close or Stop a Vote',
        content:
            'An administrator may need to close or stop an active vote if the term requires further changes or if the vote cannot be resolved in its current form.<br><br>' +
            '<b>Typical Reasons</b> — a vote may need to be stopped if:<br>' +
            '<ul>' +
            '<li>users identify a problem in the definition</li>' +
            '<li>important metadata is missing</li>' +
            '<li>the term label needs to be changed</li>' +
            '<li>the discussion shows that the term is not ready for a decision</li>' +
            '<li>the community needs more time for clarification</li>' +
            '</ul>' +
            '<b>Result:</b> Once the active vote is closed or stopped, the term can be edited again. After revision, the term may be brought to a new consensus vote.'
    },
    {
        id: 'Vocabulary (Admin) - Week Term',
        heading: 'Highlight the Term of the Week',
        content:
            'Administrators can highlight a Term of the Week to focus the community’s attention on a selected term.<br><br>' +
            'A term may be highlighted because it:<br>' +
            '<ul>' +
            '<li>needs more discussion</li>' +
            '<li>is currently under consideration</li>' +
            '<li>has recently reached consensus</li>' +
            '<li>is especially important for the community</li>' +
            '<li>requires expert input</li>' +
            '</ul>' +
            '<b>Steps</b>' +
            '<ol>' +
            '<li>Select the relevant term.</li>' +
            '<li>Choose the option to highlight it as Term of the Week.</li>' +
            '<li>Confirm the selection.</li>' +
            '</ol>' +
            '<b>Result:</b> The selected term becomes more visible to users. Highlighting a term does not change its status. It only increases visibility and encourages participation.'
    },
    {
        id: 'Vocabulary - Term Status',
        heading: 'Term Status and Development',
        content:
            'A term may go through several stages during vocabulary development. Depending on the configuration and use of the service, terms may be understood as being in one of the following stages:<br><br>' +
            '<ul>' +
            '<li><b>Proposed</b> – A user has added the term to the vocabulary process.</li>' +
            '<li><b>In Discussion</b> – Users are commenting on the term, suggesting changes, or discussing its meaning.</li>' +
            '<li><b>Revised</b> – The term has been edited based on discussion or feedback.</li>' +
            '<li><b>In Consensus Vote</b> – An administrator has started a formal vote. The term is locked for editing.</li>' +
            '<li><b>Accepted</b> – The term has reached the required participation threshold and at least 75% majority for acceptance. It becomes part of the shared vocabulary.</li>' +
            '<li><b>Rejected</b> – The term has reached the required participation threshold and at least 75% majority for rejection. It is not included in the vocabulary in its current form.</li>' +
            '<li><b>Unresolved</b> – The term has not yet reached the required consensus conditions or still requires further discussion.</li>' +
            '</ul>'
    },
    {
        id: 'Vocabulary - Agreement',
        heading: 'Turn Agreement into Knowledge',
        content:
            'Once a term reaches consensus, its agreed label, definition, and metadata are added to the shared vocabulary.<br><br>' +
            'The history of the term remains traceable, including:<br>' +
            '<ul>' +
            '<li>creation</li>' +
            '<li>edits</li>' +
            '<li>comments</li>' +
            '<li>replies</li>' +
            '<li>mentions</li>' +
            '<li>vote start</li>' +
            '<li>submitted votes</li>' +
            '<li>consensus decision</li>' +
            '</ul>' +
            'This makes it possible to understand how the term evolved and how agreement was reached.<br><br>' +
            'Accepted terms can later be used as a basis for further formalization in an ontology or another knowledge representation system. The service therefore connects collaborative terminology development with formal knowledge representation.'
    },
    {
        id: 'Vocabulary - App',
        heading: 'Install the Portal as an App',
        content:
            'The portal is available as an installable Progressive Web App. This allows you to use the portal like a native application without installing it from an app store.<br><br>' +
            '<b>Desktop Installation</b> — on desktop browsers such as Chrome or Edge:' +
            '<ol>' +
            '<li>Open the portal in the browser.</li>' +
            '<li>Click the install icon in the address bar, if available.</li>' +
            '<li>Alternatively, open the browser menu.</li>' +
            '<li>Select Install.</li>' +
            '<li>Confirm the installation dialog.</li>' +
            '</ol>' +
            '<b>Result:</b> The app is added to your desktop or start menu and opens in its own window.<br><br>' +
            '<b>Android Installation</b> — on Android:' +
            '<ol>' +
            '<li>Open the portal in Chrome.</li>' +
            '<li>Tap the menu icon ⋮.</li>' +
            '<li>Select Install app or Add to Home screen.</li>' +
            '<li>Confirm the installation.</li>' +
            '</ol>' +
            '<b>Result:</b> The app can be launched from the home screen like a regular app.<br><br>' +
            '<b>iOS Installation</b> — on iOS:' +
            '<ol>' +
            '<li>Open the portal in Safari.</li>' +
            '<li>Tap the Share icon.</li>' +
            '<li>Select Add to Home Screen.</li>' +
            '<li>Confirm the installation.</li>' +
            '</ol>' +
            '<b>Result:</b> The app is added to the home screen and can be opened like a regular app.<br><br>' +
            'An installation banner may also appear directly in the portal, allowing the app to be installed with a single tap or click.'
    },
    {
        id: 'Vocabulary - Best Practices',
        heading: 'Best Practices',
        content:
            'To support effective terminology development, follow these recommendations:<br>' +
            '<ul>' +
            '<li><b>Reuse existing terms</b> whenever possible.</li>' +
            '<li>Check <b>suggested terms</b> before creating a new entry.</li>' +
            '<li>Provide <b>clear and precise definitions</b>.</li>' +
            '<li><b>Avoid ambiguous wording</b>.</li>' +
            '<li>Use <b>comments</b> to explain disagreements or suggestions.</li>' +
            '<li><b>Reply</b> to specific comments to keep discussions structured.</li>' +
            '<li><b>Mention colleagues</b> when their expertise is needed.</li>' +
            '<li>Review the <b>Activity Widget</b> regularly.</li>' +
            '<li>Use the <b>Information Hub</b> to find ongoing discussions.</li>' +
            '<li>Use the <b>Timeline</b> to understand how and why a term changed.</li>' +
            '<li>Review the current version of a term before <b>voting</b>.</li>' +
            '<li>Do not start a vote before the term has been <b>sufficiently discussed</b>.</li>' +
            '<li>Remember that terms <b>cannot be edited</b> while a consensus vote is active.</li>' +
            '<li>Use the <b>Term of the Week</b> to draw attention to important or unresolved terminology work.</li>' +
            '</ul>'
    },
    {
        id: 'Presentation Material',
        heading: ' Presentation Material',
        content: `<VideoWrapper>
                <iframe
                src="https://docs.google.com/presentation/d/154vcWKt-ei4W5b6LdTEeRhO26WPGQ0z1A5OO_UBStnw/embed"
                width="100%"
                height="500"
                allowFullScreen
                />
            </VideoWrapper>`
    },
    {
        id: 'Scientific Publication',
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

class Training extends Component {
    constructor(props) {
        super(props);

        const hashId = window.location.hash.replace('#', '');
        const initialSection = (hashId && documentData.find(d => d.id === hashId)) || null;

        this.state = {
            selectedSection: initialSection
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

    renderLink = item => {
        const { selectedSection } = this.state;
        return (
            <li key={item.id}>
                <StyledTrainingLink
                    to={`#${item.id}`}
                    onClick={() => this.SelectedSection(item)}
                    className={selectedSection?.id === item.id ? 'active' : ''}
                >
                    {item.heading}
                </StyledTrainingLink>
            </li>
        );
    };

    renderLinks = ids =>
        ids
            .map(id => documentData.find(d => d.id === id))
            .filter(Boolean)
            .map(this.renderLink);

    renderTopicAccordion = (title, ids, options = {}) => {
        const { theme } = this.props;
        const { nested, children } = options;

        return (
            <Accordion
                key={title}
                defaultExpanded
                disableGutters
                sx={{
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    marginLeft: nested ? '12px' : 0,
                    '&:before': { display: 'none' }
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.text.primary }} />}
                    sx={{
                        minHeight: '36px',
                        padding: 0,
                        '.MuiAccordionSummary-content': { margin: '6px 0' }
                    }}
                >
                    <Typography
                        variant={nested ? 'body2' : 'subtitle1'}
                        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                    >
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                    {children || <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{this.renderLinks(ids)}</ul>}
                </AccordionDetails>
            </Accordion>
        );
    };

    renderTableOfContents = () => (
        <>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{this.renderLinks(INTRO_IDS)}</ul>

            {this.renderTopicAccordion('OCP – Ontology Curation Portal', OCP_IDS)}

            {this.renderTopicAccordion('Vocabulary Development Support Service', null, {
                children: (
                    <>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{this.renderLinks(VOCAB_INTRO_IDS)}</ul>
                        {this.renderTopicAccordion('For All Users', FOR_ALL_USERS_IDS, { nested: true })}
                        {this.renderTopicAccordion('For Administrators', FOR_ADMINISTRATORS_IDS, { nested: true })}
                    </>
                )
            })}

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{this.renderLinks(OUTRO_IDS)}</ul>
        </>
    );

    renderMobileOptions = ids =>
        documentData
            .filter(item => ids.includes(item.id))
            .map(item => (
                <option key={item.id} value={item.id}>
                    {item.heading}
                </option>
            ));

    renderMobileTOC = () => (
        <MobileTOC
            value={this.state.selectedSection?.id || ''}
            onChange={e => {
                const section = documentData.find(d => d.id === e.target.value);
                this.setState({ selectedSection: section });
            }}
        >
            {this.renderMobileOptions(INTRO_IDS)}

            <optgroup label="OCP – Ontology Curation Portal">{this.renderMobileOptions(OCP_IDS)}</optgroup>

            <optgroup label="Vocabulary Development Support Service">{this.renderMobileOptions(VOCAB_INTRO_IDS)}</optgroup>
            <optgroup label="Vocabulary » For All Users">{this.renderMobileOptions(FOR_ALL_USERS_IDS)}</optgroup>
            <optgroup label="Vocabulary » For Administrators">{this.renderMobileOptions(FOR_ADMINISTRATORS_IDS)}</optgroup>

            {this.renderMobileOptions(OUTRO_IDS)}
        </MobileTOC>
    );

    render() {
        const { theme } = this.props;
        return (
            <RootDiv>
                <LeftSidebar>
                    <Scrollbars style={{ height: '100%' }}>
                        <h3 style={{ textAlign: 'center', color: theme.palette.text.primary }}>Table of Contents</h3>
                        {this.renderTableOfContents()}
                    </Scrollbars>
                </LeftSidebar>

                <RightSidebar>
                    {this.renderMobileTOC()}
                    {this.renderDocument()}
                </RightSidebar>
            </RootDiv>
        );
    }
}

export default withTheme(Training);
