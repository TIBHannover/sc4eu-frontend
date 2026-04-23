import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import IntroductoryPopUp from '../components/IntroductoryPopUp';
import { colorStyled } from '../styledComponents/styledColor';
import Logo from '../assets/images/nfdi4ing_logo.svg';
import GoogleSurvey from '../components/GoogleSurvey';
import { Box, Typography, Button, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { connect } from 'react-redux';
import { openAuthDialog } from '../redux/actions/auth';
import { selectIsAuthenticated } from '../redux/reducers/auth';

const CENTER_ROW = { display: 'flex', alignItems: 'center' };
const VOCABULARY_URL = 'https://service.tib.eu/vocab/nfdi4ing/vocabulary_support';

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
            <Box sx={{ overflow: 'auto', transition: 'opacity 0.5s ease', opacity: this.state.fading ? 0 : 1 }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <IntroductoryPopUp />
                </Box>

                <Box sx={{ px: { xs: 3, md: 37 }, py: 2 }}>
                    <Box component="img" src={Logo} alt="NFDI4Ing Logo" sx={{ width: { xs: '10rem', md: '20rem' }, height: 'auto' }} />
                </Box>

                <Box
                    sx={{
                        ...CENTER_ROW,
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'stretch', md: 'center' },
                        px: { xs: 3, md: 40 },
                        py: { xs: 4, md: 8 },
                        gap: { xs: 4, md: 15 }
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 3 }}>
                        <Box sx={{ ...CENTER_ROW, gap: 1, borderBottom: `2px solid ${colorStyled.primary}`, pb: 1, width: 'fit-content' }}>
                            <AutoAwesomeOutlinedIcon sx={{ fontSize: '1.1rem', color: colorStyled.primary }} />
                            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: colorStyled.primary }}>
                                Sandbox Vocabulary Development Support Tool
                            </Typography>
                        </Box>

                        <Typography
                            variant="h3"
                            sx={{ fontWeight: 800, color: colorStyled.onSurface, lineHeight: 1.15, fontSize: { xs: '2rem', md: '3rem' } }}
                        >
                            Develop clear terminology for engineering data
                        </Typography>

                        <Typography variant="body1" sx={{ color: colorStyled.onPrimaryFixedVariant, lineHeight: 1.7 }}>
                            The NFDI4Ing Vocabulary Service supports communities in building and documenting controlled vocabularies and providing
                            them as a reliable basis for interoperable research data
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
                                href="https://service.tib.eu/vocab/nfdi4ing/Documentations"
                                sx={{ ...CENTER_ROW, gap: 0.5, color: colorStyled.primary, fontWeight: 600, textDecoration: 'none' }}
                            >
                                See documentation <OpenInNewIcon sx={{ fontSize: '1rem' }} />
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
                                Vocabulary Tool
                            </Typography>
                        </Box>

                        {['Curate terms and concepts', 'Document definitions clearly', 'Reinforce vocabulary work in training sessions'].map(item => (
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
                                <Typography variant="body2" sx={{ fontWeight: 600, color: colorStyled.onSurface }}>
                                    {item}
                                </Typography>
                            </Box>
                        ))}
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
