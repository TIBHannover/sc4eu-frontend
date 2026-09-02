import React, { Component } from 'react';
import { withTheme } from '@emotion/react';
import { StyledDataProtectionText, StyledDocumentationsDiv } from 'styledComponents/styledComponents';

const INTRO_TEXT =
    'The Vocabulary Development Support Service helps communities develop and maintain a shared terminology ' +
    'collaboratively. Users can propose terms, discuss and refine their meaning, reach consensus, and integrate ' +
    'agreed terms into a shared vocabulary.';

// Shared inline styles, parameterized by theme where needed
const styles = {
    paragraph: (theme) => ({
        whiteSpace: 'pre-wrap',
        cursor: 'text',
        textAlign: 'justify',
        color: theme.palette.text.primary,
        margin: '0 0 0.75em 0'
    }),
    list: (theme) => ({
        margin: '0 0 0.75em 0',
        paddingLeft: '1.75em',
        color: theme.palette.text.primary
    }),
    listItem: {
        marginBottom: '0.35em'
    },
    callout: (theme) => ({
        margin: '0 0 0.75em 0',
        paddingLeft: '1em',
        marginLeft: '0.25em',
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        color: theme.palette.text.primary,
        fontStyle: 'italic'
    })
};

// Each section owns a `body(theme)` render function so different sections
// can mix paragraphs, lists, bold/italic emphasis and indented callouts
// as appropriate to their content, rather than forcing everything into
// a single plain-text shape.
const SECTIONS = [
    {
        id: 'buildVocabulary',
        title: 'Build the Vocabulary',
        body: (theme) => (
            <>
                <p style={styles.paragraph(theme)}>
                    A commonly agreed terminology is essential for efficient communication between everyone
                    contributing to a shared domain or community.
                </p>
                <p style={styles.paragraph(theme)}>
                    The Vocabulary Development Support Service lets users collect the terms required for consistent
                    internal and external information exchange.
                </p>
                <p style={styles.paragraph(theme)}>
                    Users can propose a new term by providing a <strong>label</strong>, a <strong>definition</strong>{' '}
                    and additional metadata. While a term is being entered, an <em>auto-suggest</em> feature uses the
                    TIB Terminology Service to check for existing labels and propose them for reuse. This supports
                    the best practice of reusing established terms instead of creating duplicate or conflicting
                    entries.
                </p>
                <p style={styles.callout(theme)}>
                    <strong>Best practice:</strong> Check the suggested terms before creating a new entry and reuse
                    an established term whenever it matches the intended meaning.
                </p>
            </>
        )
    },
    {
        id: 'discussAlign',
        title: 'Discuss & Align',
        body: (theme) => (
            <>
                <p style={styles.paragraph(theme)}>
                    Every term collected in the portal has its own discussion thread. Users can comment on a term,
                    reply to existing comments to keep related points together, and react with emojis for a quick,
                    lightweight response.
                </p>
                <p style={styles.paragraph(theme)}>
                    Type <strong>@</strong> followed by a name to mention a colleague directly in a comment. This can
                    be used to draw someone&apos;s attention to an open question or request their input. Mentioned
                    users are tracked so they can see which terms they were mentioned in and jump directly to the
                    relevant reply.
                </p>
                <p style={styles.paragraph(theme)}>
                    Comments and mentions are also aggregated in an <em>activity widget</em> located above and to the
                    left of the term collection. The widget surfaces urgent terms, terms with new discussion
                    replies, and newly added terms, helping reviewers quickly identify items that require their
                    attention.
                </p>
                <p style={styles.paragraph(theme)}>
                    The discussion process allows participants to compare definitions, clarify meanings and
                    harmonize diverging views into a shared understanding.
                </p>
            </>
        )
    },
    {
        id: 'agreeOnTerms',
        title: 'Agree on Terms',
        body: (theme) => (
            <>
                <p style={styles.paragraph(theme)}>
                    Once a term has been thoroughly discussed and refined, an administrator can start a formal
                    consensus vote. Participants can cast one of two votes:
                </p>
                <ul style={styles.list(theme)}>
                    <li style={styles.listItem}>
                        <strong>Accept</strong> — the term should be used in the vocabulary.
                    </li>
                    <li style={styles.listItem}>
                        <strong>Reject</strong> — the term should be removed from the vocabulary.
                    </li>
                </ul>
                <p style={styles.paragraph(theme)}>
                    A decision is reached once the minimum participation threshold has been met and one of the two
                    options has received a majority of <strong>75%</strong>.
                </p>
                <p style={styles.paragraph(theme)}>
                    To keep the vocabulary active and encourage participation, a <em>&quot;Term of the Week&quot;</em>{' '}
                    can be highlighted. This draws attention to a term that is currently being discussed or has
                    recently reached consensus.
                </p>
            </>
        )
    },
    {
        id: 'turnAgreementIntoKnowledge',
        title: 'Turn Agreement into Knowledge',
        body: (theme) => (
            <>
                <p style={styles.paragraph(theme)}>
                    Once a term reaches consensus, its agreed <strong>label</strong>, <strong>definition</strong> and{' '}
                    <strong>metadata</strong> are committed back into the shared vocabulary. The history of how the
                    term evolved remains traceable throughout this process.
                </p>
                <p style={styles.paragraph(theme)}>
                    This closes the loop between collaborative terminology development and the formal ontology.
                    Approved terms become part of the common terminology on which the ontology is built and can
                    subsequently be picked up by knowledge engineers for further formalization.
                </p>
            </>
        )
    },
    {
        id: 'keepTrackOfProgress',
        title: 'Keep Track of Progress',
        body: (theme) => (
            <>
                <p style={styles.paragraph(theme)}>
                    The <strong>Information Hub</strong> provides an overview of activity across the vocabulary. It
                    lists ongoing discussions and active reviews in separate tabs and can be searched by comment,
                    author or term label.
                </p>
                <p style={styles.paragraph(theme)}>Search results can be filtered and sorted by:</p>
                <ul style={styles.list(theme)}>
                    <li style={styles.listItem}>Items mentioning a specific user</li>
                    <li style={styles.listItem}>A specific date range</li>
                    <li style={styles.listItem}>
                        <em>Recency</em>, <em>alphabet</em>, <em>number of votes</em> or{' '}
                        <em>number of comments</em>
                    </li>
                </ul>
                <p style={styles.paragraph(theme)}>
                    The <strong>Timeline</strong> complements the Information Hub by showing the chronological
                    history of changes committed to the vocabulary. It makes it possible to trace when a term was
                    added, edited, discussed or brought to consensus.
                </p>
                <p style={styles.paragraph(theme)}>
                    Together, the Information Hub and Timeline provide an overview of current activity as well as
                    the history of how the vocabulary has evolved.
                </p>
            </>
        )
    },
    {
        id: 'installAsAnApp',
        title: 'Install as an App',
        body: (theme) => (
            <>
                <p style={styles.paragraph(theme)}>
                    The portal is also available as an installable app (<em>Progressive Web App</em>), allowing it
                    to be used like a native application without going through an app store.
                </p>
                <ul style={styles.list(theme)}>
                    <li style={styles.listItem}>
                        <strong>Desktop (Chrome, Edge):</strong> click the install icon in the address bar, or open
                        the browser menu and choose <strong>&quot;Install&quot;</strong>, then confirm in the dialog
                        that appears. The app is added to your desktop or start menu and opens in its own window.
                    </li>
                    <li style={styles.listItem}>
                        <strong>Android:</strong> open the site in Chrome, tap the menu (⋮) and choose{' '}
                        <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                    </li>
                    <li style={styles.listItem}>
                        <strong>iOS:</strong> open the site in Safari, tap the Share icon and choose{' '}
                        <strong>&quot;Add to Home Screen&quot;</strong>.
                    </li>
                </ul>
                <p style={styles.paragraph(theme)}>
                    Once installed, a banner may also appear directly in the portal, offering to install the app
                    with a single tap.
                </p>
            </>
        )
    }
];

class Documentations extends Component {
    renderSection = (section) => {
        const { theme } = this.props;

        return (
            <React.Fragment key={section.id}>
                <h5 style={{ color: theme.palette.text.primary }}>{section.title}</h5>
                {section.body(theme)}
            </React.Fragment>
        );
    };

    render() {
        const { theme } = this.props;

        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingBottom: '3%' }}>
                <StyledDocumentationsDiv>
                    <h3 style={{ textAlign: 'center', paddingBottom: '2%', paddingTop: '2%', color: theme.palette.text.primary }}>
                        Vocabulary Development Support Service
                    </h3>
                    <StyledDataProtectionText>{INTRO_TEXT}</StyledDataProtectionText>

                    {SECTIONS.map(this.renderSection)}
                </StyledDocumentationsDiv>
            </div>
        );
    }
}

Documentations.propTypes = {};

export default withTheme(Documentations);