import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTheme } from '@emotion/react';
import { Box, Typography, Button, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import IntroductoryPopUp from '../components/IntroductoryPopUp';
import GoogleSurvey from '../components/GoogleSurvey';
import ROUTES from '../constants/routes';
import { openAuthDialog } from '../redux/actions/auth';
import { selectIsAuthenticated } from '../redux/reducers/auth';
import instance from '@instance/config';

/**
 * Home page of the vocabulary instances (vdst, sc4eu, nfdi4ing). Only the logo differs per instance:
 * `home` in src/instances/<name>/config.js. Selected through src/instances/<name>/Home.js.
 */

const CENTER_ROW = { display: 'flex', alignItems: 'center' };
const FEATURES = ['Creating relevant terms', 'Group discussion', 'A transparent voting process (consensus)'];
const FADE_MS = 500;

class VocabularyHome extends Component {
    state = { fading: false };

    handleToolOpen = () => {
        if (this.props.isAuthenticated) {
            this.setState({ fading: true });
            setTimeout(() => this.props.history.push(ROUTES.VOCABULARY_SUPPORT), FADE_MS);
        } else {
            this.props.openAuthDialog({ action: 'signin', redirectRoute: ROUTES.VOCABULARY_SUPPORT, signInRequired: true });
        }
    };

    renderLogo() {
        const { logo, logoDark, logoAlt, logoWidth } = instance.home;
        const src = this.props.theme.palette.mode === 'dark' && logoDark ? logoDark : logo;
        return (
            <Box sx={{ px: { xs: 3, md: 5, xl: 37 }, py: 2 }}>
                <Box component="img" src={src} alt={logoAlt} sx={{ width: logoWidth, height: 'auto' }} />
            </Box>
        );
    }

    renderIntro() {
        const { theme } = this.props;
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 3 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        color: theme.palette.text.secondary,
                        lineHeight: 1.15,
                        fontSize: { xs: '1.5rem', md: '2rem', xl: '3rem' },
                        maxWidth: '100%'
                    }}
                >
                    Develop clear and consistent terminology for research data in engineering
                </Typography>

                <Typography variant="body1" sx={{ color: theme.palette.secondary.onContainer, lineHeight: 1.7 }}>
                    The Vocabulary Service supports communities in building and documenting controlled vocabularies and providing them as a reliable
                    basis for interoperable research data
                </Typography>

                <Box sx={{ ...CENTER_ROW, gap: 3, flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={this.handleToolOpen}
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }
                        }}
                    >
                        Open tool
                    </Button>

                    <Link
                        component={RouterLink}
                        to={ROUTES.Documentation}
                        sx={{ ...CENTER_ROW, gap: 0.5, color: theme.palette.secondary.main, fontWeight: 600, textDecoration: 'none' }}
                    >
                        See documentation <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                    </Link>
                </Box>
            </Box>
        );
    }

    renderFeatures() {
        const { theme } = this.props;
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '40%' },
                    border: `1px solid ${theme.palette.primary.main}`,
                    p: 3,
                    boxShadow: 2
                }}
            >
                <Box sx={{ ...CENTER_ROW, justifyContent: 'space-between', my: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.text.secondary }}>
                        Vocabulary Tool
                    </Typography>
                </Box>

                {FEATURES.map(item => (
                    <Box
                        key={item}
                        sx={{
                            ...CENTER_ROW,
                            gap: 2,
                            py: 2,
                            pl: 2,
                            mb: 1.5,
                            borderLeft: `3px solid ${theme.palette.secondary.main}`,
                            backgroundColor: theme.palette.background.default,
                            borderRadius: '0 4px 4px 0'
                        }}
                    >
                        <Box
                            sx={{
                                width: '0.6rem',
                                height: '0.6rem',
                                minWidth: '0.6rem',
                                borderRadius: '50%',
                                backgroundColor: theme.palette.secondary.main
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: theme.palette.text.secondary, fontSize: { xs: '0.7rem', md: '0.8rem', xl: '1rem' } }}
                        >
                            {item}
                        </Typography>
                    </Box>
                ))}
            </Box>
        );
    }

    renderAppHint() {
        const { theme } = this.props;
        return (
            <Box sx={{ px: { xs: 3, md: 6, xl: 40 }, py: { xs: 3, xl: 0 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        p: 2,
                        backgroundColor: theme.palette.surface.containerLow,
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: 2
                    }}
                >
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            minWidth: 36,
                            borderRadius: 1,
                            backgroundColor: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mt: '2px'
                        }}
                    >
                        <AutoAwesomeOutlinedIcon sx={{ fontSize: '1.1rem', color: theme.palette.primary.contrastText }} />
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.secondary, mb: 0.5 }}>
                            Available as an app
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.primary.onContainer, lineHeight: 1.6 }}>
                            You can install this site on your desktop or phone — no app store needed.
                            <br />
                            <Link
                                href="https://blogs.phrase.trade/how-to-install-pwa"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ color: theme.palette.secondary.main, fontWeight: 600, textDecoration: 'none', fontSize: { xs: '0.9rem' } }}
                            >
                                What's a web app and how to install? <OpenInNewIcon sx={{ fontSize: { xs: '1rem' }, verticalAlign: 'middle' }} />
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    render() {
        return (
            <Box
                sx={{
                    overflow: 'auto',
                    transition: `opacity ${FADE_MS / 1000}s ease`,
                    opacity: this.state.fading ? 0 : 1,
                    minHeight: '100vh',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' }
                }}
            >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <IntroductoryPopUp />
                </Box>

                {this.renderLogo()}

                <Box
                    sx={{
                        ...CENTER_ROW,
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'stretch', md: 'center' },
                        px: { xs: 3, md: 6, xl: 40 },
                        py: { xs: 0, xl: 5 },
                        gap: { xs: 0, md: 8, xl: 15 }
                    }}
                >
                    {this.renderIntro()}
                    {this.renderFeatures()}
                </Box>

                {this.renderAppHint()}

                <Box sx={{ position: 'fixed', bottom: '5rem', right: 0, display: { xs: 'none', md: 'block' } }}>
                    <GoogleSurvey />
                </Box>
            </Box>
        );
    }
}

VocabularyHome.propTypes = {
    theme: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    openAuthDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: selectIsAuthenticated(state)
});

export default connect(mapStateToProps, { openAuthDialog })(withTheme(VocabularyHome));
