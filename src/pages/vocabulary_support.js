import React from 'react';
import AddVocabulary from '../components/VocabularySupport/AddVocabularyModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledVocabularySupportDiv } from '../styledComponents/styledComponents';
import { Box, Container, Grid, Card, CardContent, Typography, Button, useTheme } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { openAuthDialog } from '../redux/actions/auth';

const features = [
    {
        icon: AddCircleOutlineIcon,
        title: 'Propose new terms',
        description: 'Submit new vocabulary terms with definitions, context and supporting details for the community to review.'
    },
    {
        icon: ThumbUpOutlinedIcon,
        title: 'Vote on proposals',
        description: 'Cast your vote - agree, disagree or abstain - and help the community reach consensus on each term.'
    },
    {
        icon: ForumOutlinedIcon,
        title: 'Discuss and refine',
        description: 'Leave comments on proposals and votes to explain your reasoning and help improve term definitions.'
    },
    {
        icon: AccountTreeIcon,
        title: 'Track consensus',
        description: 'Follow live consensus progress and see how the vocabulary evolves as the community reflects.'
    }
];

const VocabularySupportLanding = ({ onLogin }) => {
    const theme = useTheme();

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1.5, color: theme.palette.primary.main }}>
                    Vocabulary Development Support Tool (VDST)
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: 'auto' }}>
                    Help shape the shared vocabulary by proposing terms, voting on existing proposals and building consensus with the
                    rest of the community.
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ mb: 5 }}>
                {features.map(({ icon: Icon, title, description }) => (
                    <Grid item xs={12} sm={6} key={title}>
                        <Card
                            variant="outlined"
                            sx={{
                                height: '100%',
                                borderColor: theme.palette.divider,
                                borderRadius: 2
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <Icon color="secondary" />
                                    <Typography variant="subtitle1" fontWeight="medium">
                                        {title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: theme.palette.text.primary }}>
                    Log in to propose terms, vote on proposals and take part in building consensus.
                </Typography>
                <Button variant="contained" color="secondary" size="large" startIcon={<LoginIcon />} onClick={onLogin}>
                    Login to get started
                </Button>
            </Box>
        </Container>
    );
};

VocabularySupportLanding.propTypes = {
    onLogin: PropTypes.func.isRequired
};

const Vocabulary_support = props => {
    const { termUuid, voteUuid } = props.match?.params || {};

    return (
        <StyledVocabularySupportDiv>
            {props.user ? (
                <AddVocabulary currentUser={props.user} termUuid={termUuid} voteUuid={voteUuid} />
            ) : (
                <VocabularySupportLanding
                    onLogin={() => props.openAuthDialog({ action: 'signin', redirectRoute: props.match?.url || '/vocabulary_support' })}
                />
            )}
        </StyledVocabularySupportDiv>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

Vocabulary_support.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    openAuthDialog: PropTypes.func.isRequired,
    match: PropTypes.shape({
        url: PropTypes.string,
        params: PropTypes.shape({
            termUuid: PropTypes.string,
            voteUuid: PropTypes.string
        })
    })
};

export default connect(mapStateToProps, { openAuthDialog })(Vocabulary_support);
