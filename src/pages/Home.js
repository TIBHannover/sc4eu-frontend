import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import IntroductoryPopUp from '../components/IntroductoryPopUp';
import { colorStyled } from '../styledComponents/styledColor';
import GoogleSurvey from '../components/GoogleSurvey';
import { Box, Typography, Button, Link, Stack } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { connect } from 'react-redux';
import { openAuthDialog } from '../redux/actions/auth';
import { selectIsAuthenticated } from '../redux/reducers/auth';
import Logo from '../assets/images/logo.png';

const CENTER_ROW = { display: 'flex', alignItems: 'center' };
const VOCABULARY_URL = 'https://service.tib.eu/vocab/imagine/vocabulary_support';

class Home extends Component {
    state = { fading: false };

    handleToolOpen = () => {
        if (this.props.isAuthenticated) {
            this.setState({ fading: true });
            setTimeout(() => {
                window.location.href = VOCABULARY_URL;
            }, 500);
        } else {
            this.props.openAuthDialog({
                action: 'signin',
                redirectRoute: VOCABULARY_URL,
                signInRequired: true
            });
        }
    };

    render() {
        return (
            <Box
                sx={{
                    overflow: 'auto',
                    transition: 'opacity 0.5s ease',
                    opacity: this.state.fading ? 0 : 1,
                    minHeight: '100vh',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' }
                }}
            >
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <IntroductoryPopUp />
                </Box>

                <Stack direction="row" alignItems="end" spacing={2} sx={{ px: { xs: 3, md: 5, xl: 37 }, py: 2 }}>
                    <Box component="img" src={Logo} alt="IMAGINE Labs Logo" sx={{ width: { xs: '10rem' }, height: 'auto' }} />
                    <Typography variant="h5">IMAGINE Labs - project proposal</Typography>
                </Stack>

                <Box
                    sx={{
                        ...CENTER_ROW,
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'stretch', md: 'flex-start' },
                        px: { xs: 3, md: 6, xl: 40 },
                        py: { xs: 0, xl: 5 },
                        gap: { xs: 0, md: 8, xl: 15 }
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 3 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: colorStyled.onPrimaryFixed,
                                lineHeight: 1.5
                            }}
                        >
                            This Vocabulary Service empowers communities to co-create, standardize, and vote on controlled vocabularies—turning
                            fragmented terminology into a reliable, machine-readable basis for cross-disciplinary collaboration.
                        </Typography>
                        <Typography variant="body1" sx={{ color: colorStyled.onPrimaryFixedVariant }}>
                            Build a shared framework for interdisciplinary communication
                        </Typography>
                        <Box sx={{ ...CENTER_ROW, gap: 3, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={this.handleToolOpen}
                                sx={{
                                    backgroundColor: colorStyled.primary,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': { backgroundColor: colorStyled.primaryContainer, color: colorStyled.onPrimaryContainer }
                                }}
                            >
                                Open tool
                            </Button>

                            <Link
                                href="https://www.youtube.com/watch?v=dS8nmqGKgeg"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ ...CENTER_ROW, gap: 0.5, color: colorStyled.primary, fontWeight: 600, textDecoration: 'none' }}
                            >
                                See explanation video <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                            </Link>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: { xs: '100%', md: '40%' },
                            border: `1px solid ${colorStyled.outlineVariant}`,
                            p: 3,
                            boxShadow: 2
                        }}
                    >
                        <Box sx={{ ...CENTER_ROW, justifyContent: 'space-between', my: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: colorStyled.onSurface }}>
                                The IMAGINE Labs Vocabulary Tool
                            </Typography>
                        </Box>

                        {['Establish a common language', 'Create a shared understanding', 'Provide transparent voting process (consensus)'].map(
                            item => (
                                <Box
                                    key={item}
                                    sx={{
                                        ...CENTER_ROW,
                                        gap: 2,
                                        py: 2,
                                        pl: 2,
                                        mb: 1.5,
                                        borderLeft: `3px solid ${colorStyled.primary}`,
                                        backgroundColor: colorStyled.surfaceContainerLow,
                                        borderRadius: '0 4px 4px 0'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '0.6rem',
                                            height: '0.6rem',
                                            minWidth: '0.6rem',
                                            borderRadius: '50%',
                                            backgroundColor: colorStyled.primary
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600, color: colorStyled.onSurface, fontSize: { xs: '0.7rem', md: '0.8rem', xl: '1rem' } }}
                                    >
                                        {item}
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Box>
                </Box>

                <Box sx={{ px: { xs: 3, md: 6, xl: 40 }, py: { xs: 3, xl: 0 } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            p: 2,
                            backgroundColor: colorStyled.surfaceContainerLow,
                            border: `1px solid ${colorStyled.outlineVariant}`,
                            borderRadius: 2
                        }}
                    >
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                minWidth: 36,
                                borderRadius: 1,
                                backgroundColor: colorStyled.primaryContainer,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: '2px'
                            }}
                        >
                            <AutoAwesomeOutlinedIcon sx={{ fontSize: '1.1rem', color: colorStyled.onPrimaryContainer }} />
                        </Box>

                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: colorStyled.onSurface, mb: 0.5 }}>
                                Available as an app
                            </Typography>
                            <Typography variant="body1" sx={{ color: colorStyled.onPrimaryFixedVariant, lineHeight: 1.6 }}>
                                You can install this site on your desktop or phone — no app store needed.
                                <br />
                                <Link
                                    href="https://blogs.phrase.trade/how-to-install-pwa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: colorStyled.primary,
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        fontSize: { xs: '0.9rem' }
                                    }}
                                >
                                    What's a web app and how to install? <OpenInNewIcon sx={{ fontSize: { xs: '1rem' }, verticalAlign: 'middle' }} />
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ position: 'fixed', bottom: '5rem', right: 0, display: { xs: 'none', md: 'block' } }}>
                    <GoogleSurvey />
                </Box>

                <Footer />
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: selectIsAuthenticated(state)
});

const mapDispatchToProps = {
    openAuthDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
