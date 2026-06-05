import React, { useState, useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { Typography, Button, Box, Slide, Link, Dialog } from '@mui/material';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

export function VocabularySurveyBanner() {
    const [isDismissed, setIsDismissed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const VOCAB_SURVEY_STORAGE_KEY = 'vocab-survey-banner-dismissed-datetime';
    const SURVEY_COMPLETED = 'completed';
    const STEP_BANNER = 'banner';
    const STEP_INTRO = 'intro';
    const STEP_SURVEY = 'survey';

    const [step, setStep] = useState(STEP_BANNER);

    const handleAgree = () => setStep(STEP_INTRO);
    const handleStartSurvey = () => {
        localStorage.setItem(VOCAB_SURVEY_STORAGE_KEY, SURVEY_COMPLETED);
        setStep(STEP_SURVEY);
    };

    useEffect(() => {
        const dismissed = localStorage.getItem(VOCAB_SURVEY_STORAGE_KEY);
        if (dismissed === SURVEY_COMPLETED) return;
        if (dismissed) {
            const timeSinceDismissed = differenceInCalendarDays(new Date(Date.now()), new Date(Number(dismissed)));
            if (timeSinceDismissed >= 3) {
                setIsDismissed(false);
                setIsVisible(true);
                return;
            }
            setIsDismissed(true);
            return;
        }
        const timer = setTimeout(() => setIsVisible(true), 500);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible || isDismissed) return null;

    const handleEscape = () => {
        setIsDismissed(true);
        setIsVisible(false);
    };

    const handleDismiss = () => {
        handleEscape();
        localStorage.setItem(VOCAB_SURVEY_STORAGE_KEY, Date.now().toString());
    };

    const ActionButtons = ({ onConfirm, confirmLabel }) => (
        <Box display="flex" justifyContent="flex-end" gap={1} pt={1}>
            <Button variant="text" onClick={handleDismiss}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <span>Maybe Later</span>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.85rem', textTransform: 'none' }}>
                        will be shown in 3 days
                    </Typography>
                </Box>
            </Button>
            <Button variant="contained" onClick={onConfirm}>
                {confirmLabel}
            </Button>
        </Box>
    );

    return (
        <Dialog
            open={isVisible}
            onClose={handleEscape}
            TransitionComponent={Slide}
            TransitionProps={{ direction: 'up' }}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: 480,
                    height: step === STEP_SURVEY ? 'min(580px, 85vh)' : 'auto',
                    borderRadius: 2,
                    overflow: 'hidden'
                }
            }}
        >
            {step === STEP_SURVEY && (
                <iframe
                    title="Survey"
                    src="https://app.formbricks.com/s/cmpuzwvon87i1wq01xndgd52k"
                    sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    style={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#ffffff' }}
                />
            )}

            {step === STEP_INTRO && (
                <Box display="flex" flexDirection="column" gap={2} p={3}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <AssignmentIndOutlinedIcon color="primary" fontSize="large" />
                        <Typography variant="h6" fontWeight={600}>
                            Before you start
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        We're assessing the user experience of the Vocabulary Tool — a tool that builds interdisciplinary communication and shares
                        consistent, standardized terminology to enable seamless data exchange.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This survey uses the <strong>System Usability Scale (SUS)</strong> — a widely used, 10-question questionnaire that measures
                        how easy and effective the service is to use.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        If you're unfamiliar with the tool, we recommend:
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Typography variant="body1">
                            📹 Watch quick intro videos:{' '}
                            <Link href="https://tinyurl.com/sc4eu-vocabulary" target="_blank" rel="noopener noreferrer">
                                tinyurl.com/sc4eu-vocabulary
                            </Link>
                        </Typography>
                        <Typography variant="body1">
                            🔍 Explore the service:{' '}
                            <Link
                                href={`https://service.tib.eu${process.env.REACT_APP_PUBLIC_URL}vocabulary_support`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {`service.tib.eu${process.env.REACT_APP_PUBLIC_URL}vocabulary_support`}
                            </Link>
                        </Typography>
                    </Box>
                    <ActionButtons onConfirm={handleStartSurvey} confirmLabel="Continue to Survey" />
                </Box>
            )}

            {step === STEP_BANNER && (
                <Box display="flex" flexDirection="column" gap={2} p={3}>
                    <Box display="flex" alignItems="center" gap={1.5}>
                        <AssignmentIndOutlinedIcon color="primary" fontSize="large" />
                        <Typography variant="h6" fontWeight={600}>
                            Vocabulary Tool Survey
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        We'd love your feedback! It only has 10 questions and takes about a few minutes.
                    </Typography>
                    <ActionButtons onConfirm={handleAgree} confirmLabel="Start Survey" />
                </Box>
            )}
        </Dialog>
    );
}
