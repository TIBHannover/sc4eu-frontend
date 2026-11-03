import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from '@material-ui/lab';
import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Link,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    styled,
    useTheme
} from '@mui/material';
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { marked } from 'marked';
import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import { LARGE_SCREEN_SIZE } from '../../styledComponents/styledComponents';
import { useMediaQuery } from '@material-ui/core';

const MARKDOWN_FILE_START_REGEX = /# Ontology comparison\n\n## Left\n- Ontology IRI: .+\n- Version IRI: .+\n- Loaded from: .+\n\n## Right\n- Ontology IRI: .+\n- Version IRI: .+\n- Loaded from: .+\n\n/;

const renderer = {
    link(href, title, text) {
        return `<a href="${href}" style="font-size: 14px;">${text}</a>`;
    },
    heading(text, level) {
        const FONT_SIZES = { 1: '24px', 2: '20px' };
        const fontSize = FONT_SIZES[level] ?? '16px';
        return `<h${level} style="font-size: ${fontSize}; font-weight: bold">${text}</h${level}>`;
    }
};

marked.use({
    async: true,
    renderer
});

export const StyledGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRight: '1px solid',
    borderLeft: '1px solid',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column'
}));

export const StyledRootPair = styled('div')(({ theme }) => ({
    marginLeft: '24px',
    minHeight: '82vh',
    backgroundColor: theme.palette.background.paper, // was hardcoded white
    borderRadius: '10px',
    border: '1px solid'
}));

export const StyledTimeline = styled(Timeline)({
    maxHeight: '82vh',
    overflowY: 'auto',
    '@media (max-width: 900px)': {
        maxHeight: 'unset',
        overflowY: 'visible'
    }
});

export const StyledTimelineItem = styled(TimelineItem)({
    marginBottom: '160px',
    '@media (max-width: 900px)': {
        marginBottom: '40px'
    }
});

export const StyledTimelineContent = styled(TimelineContent)({
    paddingTop: '20px',
    cursor: 'pointer'
});

export const StyledCommitMessage = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

const DIFF_API = `${process.env.REACT_APP_DIFF_BACKEND_URL}/api/ondet/sdiffs`;
const LOADING_MESSAGE = 'Loading';
const CALCULATING_MESSAGE = 'Ontology is not in Tracker. It will take some time to calculate all differences';

const getCommitInfo = item => {
    const isGitCommit = Object.prototype.hasOwnProperty.call(item, 'commit');
    return {
        date: new Date(isGitCommit ? item.commit.committer.date : item.date).toLocaleString(),
        message: (isGitCommit ? item.commit.message : item.message) ?? ''
    };
};

const fetchCommits = async fileUrl => {
    const response = await fetch(`${DIFF_API}/commits?uri=${fileUrl}`);
    if (!response.ok) throw new Error(`Failed to fetch commits: ${response.status}`);
    return response.json();
};

/**
 * Makes sure the ontology is tracked (posting it when missing) and returns its commits.
 */
const loadOntologyCommits = async (fileUrl, onCalculating) => {
    const check = await fetch(`${DIFF_API}/checkUrl?uri=${fileUrl}`);
    if (check.status === 404) {
        onCalculating();
        const post = await fetch(`${DIFF_API}?uri=${fileUrl}`, { method: 'POST' });
        if (!post.ok) throw new Error(`Failed to register ontology: ${post.status}`);
    } else if (!check.ok) {
        throw new Error(`Failed to check ontology: ${check.status}`);
    }
    return fetchCommits(fileUrl);
};

const ChangesTimeline = ({ id }) => {
    const theme = useTheme();

    const [ontology, setOntology] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [html, setHtml] = useState(null);
    const [semanticHtml, setSemanticHtml] = useState('');
    const [gitHtml, setGitHtml] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGE);
    const [diffLoading, setDiffLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const isMobile = useMediaQuery(`(max-width:${LARGE_SCREEN_SIZE})`);

    useEffect(() => {
        let cancelled = false;
        loadOntologyCommits(new URL(id), () => !cancelled && setLoadingMessage(CALCULATING_MESSAGE))
            .then(data => !cancelled && setOntology(data))
            .catch(e => !cancelled && setError(e))
            .finally(() => !cancelled && setInitialLoading(false));

        return () => {
            cancelled = true;
        };
    }, [id]);

    const timelineOptions = ontology.slice(1).map((diff, i) => ({
        index: i + 1,
        sha: diff.sha,
        item: ontology[i],
        ...getCommitInfo(ontology[i])
    }));

    const handleItemClick = async (item, index) => {
        setDiffLoading(true);
        setSelectedItem(item);
        setSelectedIndex(index);
        const response = await fetch(`${process.env.REACT_APP_DIFF_BACKEND_URL}/api/ondet/sdiffs/${item.sha}`);
        let data = await response.json();
        let robotDiff = '';
        let contoDiff = [];
        if (data.difference.hasOwnProperty('error')) {
            contoDiff = data.difference.error;
        } else if (data.difference.changes.length !== 0) {
            let formattedMarkdown = formatDataForMarkdown(data.difference);
            contoDiff = await marked(formattedMarkdown);
        } else {
            contoDiff = await marked('### COnto was not able to calculate the differences');
        }

        setHtml(contoDiff);

        if (data.markdown.hasOwnProperty('file')) {
            robotDiff = await marked(data.markdown.file.split(MARKDOWN_FILE_START_REGEX)[1]);
        } else {
            robotDiff = await marked('### Robot failed to provide any result');
        }

        const diffHtml = Diff2Html.html(data.gitDiff, {});

        setSemanticHtml(robotDiff);
        setGitHtml(diffHtml);
        setDiffLoading(false);
    };

    const formatUriFragment = uri => {
        const fragments = uri.split('/');
        let lastFragment = fragments[fragments.length - 1];
        if (lastFragment.includes('#')) {
            lastFragment = lastFragment.split('#')[1];
        }

        return `[${lastFragment}](${uri})`;
    };

    const formatDataForMarkdown = data => {
        let markdownContent = '';

        const groupedChanges = {};

        data.changes.forEach(change => {
            const parts = change.split(' ');

            const ppLabel = parts[0];
            const s = formatUriFragment(parts[1]);
            const p = formatUriFragment(parts[2]);
            const o = formatUriFragment(parts[3]);

            if (!groupedChanges[ppLabel]) {
                groupedChanges[ppLabel] = [];
            }

            groupedChanges[ppLabel].push({ s, p, o });
        });

        Object.entries(groupedChanges).forEach(([ppLabel, triples]) => {
            markdownContent += `### ${ppLabel}\n`;

            triples.forEach(triple => {
                markdownContent += `- ${triple.s} ${triple.p} ${triple.o}\n`;
            });

            markdownContent += '\n';
        });

        return markdownContent;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={2}>
            {error && (
                <Grid item xs={12}>
                    <Typography variant="h5">Some error happened while searching for an ontology in Ontology Development Tracker</Typography>
                </Grid>
            )}
            {initialLoading && (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h5">{loadingMessage}</Typography>
                    <CircularProgress size={100} />
                </Grid>
            )}
            {!initialLoading && !error && (
                <>
                    {!isMobile && (
                        <StyledGrid item xs={3}>
                            <StyledTimeline>
                                {timelineOptions.map(({ index, sha, item, date, message }) => (
                                    <StyledTimelineItem key={sha} onClick={() => handleItemClick(item, index)}>
                                        <TimelineOppositeContent>
                                            <Typography variant="body2" color="textSecondary">
                                                {date}
                                            </Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator sx={{ minHeight: '200px' }}>
                                            <TimelineDot />
                                            <TimelineConnector sx={{ width: '2px', height: '50px' }} />
                                        </TimelineSeparator>
                                        <StyledTimelineContent>
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    p: 2,
                                                    width: '10vw',
                                                    ...(selectedIndex === index && { backgroundColor: theme.palette.primary.light })
                                                }}
                                            >
                                                <StyledCommitMessage variant="h6" component="h6">
                                                    {message}
                                                </StyledCommitMessage>
                                            </Paper>
                                        </StyledTimelineContent>
                                    </StyledTimelineItem>
                                ))}
                            </StyledTimeline>
                        </StyledGrid>
                    )}
                    {isMobile && (
                        <Grid item xs={12} padding={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="version-select-label">Select version</InputLabel>
                                <Select
                                    labelId="version-select-label"
                                    label="Select version"
                                    value={selectedIndex ?? ''}
                                    onChange={e => handleItemClick(ontology[e.target.value - 1], e.target.value)}
                                    sx={{ backgroundColor: theme.palette.background.paper }}
                                >
                                    {timelineOptions.map(({ index, date, message }) => (
                                        <MenuItem key={index} value={index}>
                                            <Box>
                                                <Typography variant="body2" fontWeight={600} noWrap>
                                                    {message}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {date}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={12} xl={9}>
                        {selectedItem && diffLoading && (
                            <div>
                                <Typography variant="body2">{LOADING_MESSAGE}</Typography>
                                <CircularProgress />
                            </div>
                        )}
                        {!selectedItem && (
                            <Typography>
                                {isMobile
                                    ? 'Select a version above from the drop-down menu to see its semantic difference.'
                                    : 'Choose an item from the timeline on the left to see its diff here.'}
                            </Typography>
                        )}
                        {selectedItem && !diffLoading && (
                            <>
                                <Typography variant="body1" align="center" marginBottom="8px">
                                    This view displays semantic differences calculated by COntoDiff and ROBOT DIFF.
                                    <br />
                                    If you want
                                    <Link href="#" onClick={handleClickOpen}>
                                        {' '}
                                        see syntax differences
                                    </Link>
                                </Typography>
                                <div style={{ display: 'flex' }}>
                                    <div id="semanticHtml" style={{ flex: 1, overflow: 'auto' }}>
                                        <Typography
                                            variant="h6"
                                            style={{
                                                position: 'sticky',
                                                top: 0,
                                                backgroundColor: theme.palette.background.paper,
                                                zIndex: 1,
                                                textAlign: 'center',
                                                paddingBottom: '20px'
                                            }}
                                        >
                                            ROBOT Diff
                                        </Typography>
                                        <div dangerouslySetInnerHTML={{ __html: semanticHtml }} style={{ lineHeight: '1.5' }} />
                                    </div>
                                    {/*<div*/}
                                    {/*    id="renderedHtml"*/}
                                    {/*    style={{ flex: 1, overflow: "auto", position: "relative" }}*/}
                                    {/*>*/}
                                    {/*    <Typography*/}
                                    {/*        variant="h6"*/}
                                    {/*        style={{*/}
                                    {/*            position: "sticky",*/}
                                    {/*            top: 0,*/}
                                    {/*            backgroundColor: "white",*/}
                                    {/*            zIndex: 1,*/}
                                    {/*            textAlign: "center",*/}
                                    {/*            paddingBottom: "20px",*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        COnto Diff*/}
                                    {/*    </Typography>*/}
                                    {/*    <div*/}
                                    {/*        dangerouslySetInnerHTML={{ __html: html }}*/}
                                    {/*        style={{ lineHeight: "2.0" }}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                </div>
                            </>
                        )}
                    </Grid>
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
                        <DialogTitle>Git Diff</DialogTitle>
                        <DialogContent>
                            <div style={{ position: 'relative' }} dangerouslySetInnerHTML={{ __html: gitHtml }} />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </Grid>
    );
};

ChangesTimeline.propTypes = {
    id: PropTypes.string.isRequired
};

export default ChangesTimeline;
