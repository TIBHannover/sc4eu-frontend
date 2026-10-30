import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VocabMainTable from '../assets/images/Vocabulary/Main Table (About Service).jpg';
import VocabActivityWidgets from '../assets/images/Vocabulary/Activity Widgets.jpg';
import VocabAdminConsensus from '../assets/images/Vocabulary/Admin - initiate consensus.jpg';
import VocabInfoHub from '../assets/images/Vocabulary/Information Hub.jpg';
import VocabTermDetails from '../assets/images/Vocabulary/Term Details and Discussions.jpg';
import VocabTermCreate from '../assets/images/Vocabulary/Term Create.jpg';
import VocabTermOfTheWeek from '../assets/images/Vocabulary/Term of the Week.jpg';
import VocabTimeline from '../assets/images/Vocabulary/Timeline.jpg';
import VocabVoteView from '../assets/images/Vocabulary/Vote View.jpg';
import { Page, PageTitle, PageContent, StyledTrainingLink, MobileTOC, LeftSidebar, RightSidebar, RootDiv } from 'styledComponents/styledComponents';
import mediumZoom from 'medium-zoom';
import { withTheme } from '@emotion/react';

const VOCAB_INTRO_IDS = [
    'Vocabulary - Service',
    'Vocabulary - Start',
    'Vocabulary - Roles',
    'Vocabulary - Term Status',
    'Vocabulary - Agreement',
    'Vocabulary - App',
    'Vocabulary - Best Practices'
];
const FOR_ALL_USERS_IDS = [
    'Vocabulary (Users) - New Term',
    'Vocabulary (Users) - Term Edit',
    'Vocabulary (Users) - Align Terms',
    'Vocabulary (Users) - Term Vote',
    'Vocabulary (Users) - Consensus Activity',
    'Vocabulary (Users) - Notification'
];
const FOR_ADMINISTRATORS_IDS = [
    'Vocabulary (Admin) - Start Consensus',
    'Vocabulary (Admin) - Threshold',
    'Vocabulary (Admin) - Stop Vote',
    'Vocabulary (Admin) - Week Term'
];

const documentData = [
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
            'A shared terminology helps a community communicate more clearly and consistently. The service allows users to collect, define, discuss, and agree on terms needed for internal and external communication.<br><br>' +
            '<img src="' +
            VocabMainTable +
            '" alt="Vocabulary Main Table" style="width: 100%; height: auto; margin-top: 15px; margin-bottom: 15px; border: 1px solid black;"/>'
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
            '<i><b>Best Practice:</b> Always review suggested terms before creating a new entry. Reuse an established term whenever it matches the intended meaning. This helps avoid duplicates and conflicting definitions.</i>' +
            '<img src="' +
            VocabTermCreate +
            '" alt="Term Edit Screenshot" style="width: 100%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/>'
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
            '<i><b>Important Note:</b> Terms cannot be edited while an active consensus vote is running. This ensures that all participants vote on the same version of the label, definition, and metadata. If changes are needed during a vote, an administrator must close or stop the active vote before the term can be revised.</i><br><br>'
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
            '<b>Result:</b> Mentioned users are tracked by the service and can navigate directly to the relevant term or comment. Depending on their notification settings, they may also receive a notification.<br><br>' +
            '<img src="' +
            VocabTermDetails +
            '" alt="Term Details and Discussions" style="width: 100%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/>'
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
            'If changes are needed, an administrator must close or stop the active vote before the term can be revised.<br><br>' +
            '<img src="' +
            VocabVoteView +
            '" alt="Vote View" style="width: 100%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/>'
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
            '<img src="' +
            VocabActivityWidgets +
            '" alt="Activity Widget" style="width: 100%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/><br><br>' +
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
            '<img src="' +
            VocabInfoHub +
            '" alt="Information Hub" style="width: 100%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/><br><br>' +
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
            'Use the Timeline to understand how a term developed and how agreement was reached.<br><br>' +
            '<img src="' +
            VocabTimeline +
            '" alt="Timeline" style="width: 100%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/>'
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
            '<b>Result:</b> The vote becomes active. All users can vote Accept or Reject. The term is locked for editing while the vote is active.<br><br>' +
            '<img src="' +
            VocabAdminConsensus +
            '" alt="Admin - initiate consensus" style="width: 100%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/>'
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
            '<b>Result:</b> The selected term becomes more visible to users. Highlighting a term does not change its status. It only increases visibility and encourages participation.<br><br>' +
            '<img src="' +
            VocabTermOfTheWeek +
            '" alt="Term of the Week" style="width: 80%; height: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid black;"/>'
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

    componentDidMount() {
        this.initZoom();
    }

    componentDidUpdate(prevState) {
        if (prevState.selectedSection !== this.state.selectedSection) {
            this.initZoom();
        }
    }

    componentWillUnmount() {
        if (this.zoom) {
            this.zoom.detach();
        }
    }

    initZoom = () => {
        if (this.zoom) {
            this.zoom.detach();
        }
        setTimeout(() => {
            this.zoom = mediumZoom('.training-page-content img', {
                margin: 24,
                background: 'rgba(0, 0, 0, 0.9)',
                scrollOffset: 40
            });
        }, 0);
    };

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
                    <PageContent className="training-page-content" dangerouslySetInnerHTML={{ __html: selectedSection.content }} />
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
                    <Typography variant={nested ? 'body2' : 'subtitle1'} sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
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
            {this.renderTopicAccordion('Vocabulary Development Support Service', null, {
                children: (
                    <>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{this.renderLinks(VOCAB_INTRO_IDS)}</ul>
                        {this.renderTopicAccordion('For All Users', FOR_ALL_USERS_IDS, { nested: true })}
                        {this.renderTopicAccordion('For Administrators', FOR_ADMINISTRATORS_IDS, { nested: true })}
                    </>
                )
            })}
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
            <optgroup label="Vocabulary Development Support Service">{this.renderMobileOptions(VOCAB_INTRO_IDS)}</optgroup>
            <optgroup label="Vocabulary » For All Users">{this.renderMobileOptions(FOR_ALL_USERS_IDS)}</optgroup>
            <optgroup label="Vocabulary » For Administrators">{this.renderMobileOptions(FOR_ADMINISTRATORS_IDS)}</optgroup>
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
