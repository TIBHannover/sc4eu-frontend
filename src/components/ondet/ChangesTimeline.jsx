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

const MARKDOWN_FILE_START_REGEX = new RegExp(
    '# Ontology comparison\\n\\n## Left\\n- Ontology IRI: .+\\n- Version IRI: .+\\n- Loaded from: .+\\n\\n## Right\\n- Ontology IRI: .+\\n- Version IRI: .+\\n- Loaded from: .+\\n\\n'
);

const renderer = {
    link(href, title, text) {
        return `<a href="${href}" style="font-size: 14px;">${text}</a>`;
    },
    heading(text, level) {
        const fontSize = level === 1 ? '24px' : level === 2 ? '20px' : '16px';
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

const ChangesTimeline = ({ id }) => {
    const theme = useTheme();

    const [ontology, setOntology] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [html, setHtml] = useState(null);
    const [semanticHtml, setSemanticHtml] = useState('');
    const [gitHtml, setGitHtml] = useState('');
    const [commitsFetched, setCommitsFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const isMobile = useMediaQuery(`(max-width:${LARGE_SCREEN_SIZE})`);

    useEffect(() => {
        async function fetchOntology() {
            try {
                const fileUrl = new URL(id);
                setCommitsFetched(true);
                const response = await fetch(`${process.env.REACT_APP_DIFF_BACKEND_URL}/api/ondet/sdiffs/commits?uri=${fileUrl}`);
                if (response.ok) {
                    const data = await response.json();
                    setOntology(data);
                    setCommitsFetched(false);
                }
            } catch (error) {
                setError(error);
            }
        }

        fetchOntology();
    }, [id]);

    const timelineOptions = ontology
        .map((diff, index, arr) => {
            if (arr[index - 1] === undefined) return null;
            const item = arr[index - 1];
            const date = diff.hasOwnProperty('commit') ? new Date(item.commit.committer.date).toLocaleString() : new Date(item.date).toLocaleString();
            const message = diff.hasOwnProperty('commit') ? item.commit.message : item.message;
            return { index, date, message };
        })
        .filter(Boolean);

    const handleItemClick = async (item, index) => {
        setLoading(true);
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
        setLoading(false);
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
            {commitsFetched && <CircularProgress sx={{ margin: '0 auto' }} size={100} />}
            {!commitsFetched && !error && (
                <>
                    {!isMobile && (
                        <StyledGrid item xs={3}>
                            <StyledTimeline>
                                {ontology.map((diff, index, arr) => {
                                    if (arr[index - 1] === undefined) {
                                        return null;
                                    }

                                    return (
                                        <StyledTimelineItem key={index} onClick={() => handleItemClick(arr[index - 1], index)}>
                                            <TimelineOppositeContent>
                                                <Typography variant="body2" color="textSecondary">
                                                    {diff.hasOwnProperty('commit')
                                                        ? new Date(arr[index - 1].commit.committer.date).toLocaleString()
                                                        : new Date(arr[index - 1].date).toLocaleString()}
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
                                                        ...(selectedIndex === index && {
                                                            backgroundColor: theme.palette.primary.light
                                                        })
                                                    }}
                                                >
                                                    <StyledCommitMessage variant="h6" component="h6">
                                                        {arr[index - 1] !== undefined
                                                            ? `${
                                                                  diff.hasOwnProperty('commit')
                                                                      ? arr[index - 1].commit.message
                                                                      : arr[index - 1].message
                                                              }`
                                                            : diff.hasOwnProperty('commit')
                                                            ? arr[index - 1].commit.message
                                                            : arr[index - 1].message}
                                                    </StyledCommitMessage>
                                                </Paper>
                                            </StyledTimelineContent>
                                        </StyledTimelineItem>
                                    );
                                })}
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
                                    onChange={e => {
                                        const idx = e.target.value;
                                        const arr = ontology;
                                        handleItemClick(arr[idx - 1], idx);
                                    }}
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
                        {selectedItem && loading && (
                            <div>
                                <p>Loading...</p>
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
                        {selectedItem && !loading && (
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
