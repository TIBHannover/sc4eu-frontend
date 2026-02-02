import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from "@material-ui/lab";
import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Link,
    Paper,
    Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import PropTypes from "prop-types";
import styled from "styled-components";
import { marked } from "marked";
import * as Diff2Html from "diff2html";
import "diff2html/bundles/css/diff2html.min.css";

const CustomTimelineSeparator = styled(TimelineSeparator)({
    minHeight: "200px",
});

const MARKDOWN_FILE_START_REGEX = new RegExp(
    "# Ontology comparison\\n\\n## Left\\n- Ontology IRI: .+\\n- Version IRI: .+\\n- Loaded from: .+\\n\\n## Right\\n- Ontology IRI: .+\\n- Version IRI: .+\\n- Loaded from: .+\\n\\n",
);

const renderer = {
    link(href, title, text) {
        return `<a href="${href}" style="font-size: 14px;">${text}</a>`;
    },
    heading(text, level) {
        const fontSize = level === 1 ? "24px" : level === 2 ? "20px" : "16px";
        return `<h${level} style="font-size: ${fontSize}; font-weight: bold">${text}</h${level}>`;
    },
};

marked.use({
    async: true,
    renderer,
});

const useStyles = makeStyles((theme) => ({
    cont: {
        minHeight: "calc(100vh - 405px)",
    },
    grid: {
        backgroundColor: "white",
        borderRight: "1px solid",
        borderLeft: "1px solid",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
    },
    rootPair: {
        marginLeft: '24px',
        minHeight: "82vh",
        backgroundColor: "white",
        borderRadius: " 10px 10px 10px 10px",
        border: "1px solid",
    },
    timeline: {
        maxHeight: "82vh",
        overflowY: "auto",
    },
    timelineItem: {
        marginBottom: "160px",
    },
    timelineContent: {
        paddingTop: "20px",
        cursor: "pointer",
    },
    commitMessage: {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
}));

const ChangesTimeline = ({ id }) => {
    const [ontology, setOntology] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [html, setHtml] = useState(null);
    const [semanticHtml, setSemanticHtml] = useState("");
    const [gitHtml, setGitHtml] = useState("");
    const classes = useStyles();
    const [commitsFetched, setCommitsFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchOntology() {
            try {
                const fileUrl = new URL(id);
                setCommitsFetched(true);
                const response = await fetch(
                    `${process.env.REACT_APP_DIFF_BACKEND_URL}/api/ondet/sdiffs/commits?uri=${fileUrl}`,
                );
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

    const handleItemClick = async (item, index) => {
        setLoading(true);
        setSelectedItem(item);
        setSelectedIndex(index);
        const response = await fetch(
            `${process.env.REACT_APP_DIFF_BACKEND_URL}/api/ondet/sdiffs/${item.sha}`,
        );
        let data = await response.json();
        let robotDiff = "";
        let contoDiff = [];
        if (data.difference.hasOwnProperty("error")) {
            contoDiff = data.difference.error;
        } else if (data.difference.changes.length !== 0) {
            let formattedMarkdown = formatDataForMarkdown(data.difference);
            contoDiff = await marked(formattedMarkdown);
        } else {
            contoDiff = await marked(
                "### COnto was not able to calculate the differences",
            );
        }

        setHtml(contoDiff);

        if (data.markdown.hasOwnProperty("file")) {
            robotDiff = await marked(
                data.markdown.file.split(MARKDOWN_FILE_START_REGEX)[1],
            );
        } else {
            robotDiff = await marked("### Robot failed to provide any result");
        }

        const diffHtml = Diff2Html.html(data.gitDiff, {});

        setSemanticHtml(robotDiff);
        setGitHtml(diffHtml);
        setLoading(false);
    };

    const formatUriFragment = (uri) => {
        const fragments = uri.split("/");
        let lastFragment = fragments[fragments.length - 1];
        if (lastFragment.includes("#")) {
            lastFragment = lastFragment.split("#")[1];
        }

        return `[${lastFragment}](${uri})`;
    };

    const formatDataForMarkdown = (data) => {
        let markdownContent = "";

        const groupedChanges = {};

        data.changes.forEach((change) => {
            const parts = change.split(" ");

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

            triples.forEach((triple) => {
                markdownContent += `- ${triple.s} ${triple.p} ${triple.o}\n`;
            });

            markdownContent += "\n";
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
        <Grid container>
            {error && (
                <div>
                    <Typography variant="h5">Some error happened while searching for an ontology in Ontology Development Tracker</Typography>
                </div>
            )}
            {commitsFetched && (
                <CircularProgress sx={{ margin: "0 auto" }} size={100} />
            )}
            {!commitsFetched && !error && (
                <>
                    <Grid item xs={12} md={4} className={classes.grid}>
                        <Timeline className={classes.timeline}>
                            {ontology.map((diff, index, arr) => {
                                if (arr[index - 1] === undefined) {
                                    return null;
                                }

                                return (
                                    <TimelineItem
                                        key={index}
                                        onClick={() => handleItemClick(arr[index - 1], index)}
                                        className={classes.timelineItem}
                                    >
                                        <TimelineOppositeContent>
                                            <Typography variant="body2" color="textSecondary">
                                                {diff.hasOwnProperty("commit")
                                                    ? new Date(
                                                        arr[index - 1].commit.committer.date,
                                                    ).toLocaleString()
                                                    : new Date(arr[index - 1].date).toLocaleString()}
                                            </Typography>
                                        </TimelineOppositeContent>
                                        <CustomTimelineSeparator>
                                            <TimelineDot />
                                            <TimelineConnector
                                                sx={{ width: "2px", height: "50px" }}
                                            />
                                        </CustomTimelineSeparator>
                                        <TimelineContent className={classes.timelineContent}>
                                            <Paper
                                                elevation={3}
                                                className={classes.timelinePaper}
                                                sx={{ p: 2 }}
                                                style={
                                                    selectedIndex === index
                                                        ? {
                                                            backgroundColor: "lightblue",
                                                            width: "350px",
                                                        }
                                                        : { width: "350px" }
                                                }
                                            >
                                                <Typography
                                                    variant="h6"
                                                    component="h6"
                                                    className={classes.commitMessage}
                                                >
                                                    {arr[index - 1] !== undefined
                                                        ? `${diff.hasOwnProperty("commit") ? arr[index - 1].commit.message : arr[index - 1].message}`
                                                        : diff.hasOwnProperty("commit")
                                                            ? arr[index - 1].commit.message
                                                            : arr[index - 1].message}
                                                </Typography>
                                            </Paper>
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            })}
                        </Timeline>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.grid}>
                        {selectedItem && loading && (
                            <div>
                                <p>Loading...</p>
                                <CircularProgress />
                            </div>
                        )}
                        {!selectedItem && (
                            <div>
                                <p>
                                    After you choose one of the items from the timeline on the
                                    left
                                    <br />
                                    You will see it's value here.
                                </p>
                            </div>
                        )}
                        {selectedItem && !loading && (
                            <>
                                <Typography variant="body1" align="center" marginBottom="8px">
                                    This view displays semantic differences calculated by
                                    COntoDiff and ROBOT DIFF.
                                    <br />
                                    If you want
                                    <Link href="#" onClick={handleClickOpen}>
                                        {" "}
                                        see syntax differences
                                    </Link>
                                </Typography>
                                <div className={classes.timeline} style={{ display: "flex" }}>
                                    <div id="semanticHtml" style={{ flex: 1, overflow: "auto" }}>
                                        <Typography
                                            variant="h6"
                                            style={{
                                                position: "sticky",
                                                top: 0,
                                                backgroundColor: "white",
                                                zIndex: 1,
                                                textAlign: "center",
                                                paddingBottom: "20px",
                                            }}
                                        >
                                            ROBOT Diff
                                        </Typography>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: semanticHtml }}
                                            style={{ lineHeight: "1.5" }}
                                        />
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
                            <div
                                style={{ position: "relative" }}
                                dangerouslySetInnerHTML={{ __html: gitHtml }}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </Grid>
    );
};

ChangesTimeline.propTypes = {
    id: PropTypes.string.isRequired,
};

export default ChangesTimeline;
