import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { reverse } from 'named-urls';
import { getUserProfile } from '../../network/UserProfileCalls';
import ROUTES from '../../constants/routes';

export const LINKEDIN_CONSENT_TEXT = 'I agree to the usage of my user information to be included in a LinkedIn publication';

export const LINKEDIN_CONSENT_CHANGED_EVENT = 'linkedin-consent-changed';

const dismissedKey = userId => `linkedinConsentBannerDismissed:${userId}`;

const isDismissed = userId => {
    try {
        return localStorage.getItem(dismissedKey(userId)) !== null;
    } catch {
        return false;
    }
};

const LinkedInConsentBanner = ({ userId }) => {
    const [consentMissing, setConsentMissing] = useState(false);
    const [dismissed, setDismissed] = useState(() => isDismissed(userId));

    const dismiss = () => {
        try {
            localStorage.setItem(dismissedKey(userId), new Date().toISOString());
        } catch {
            console.error('Local storage unavailable');
        }
        setDismissed(true);
    };

    useEffect(() => {
        setDismissed(isDismissed(userId));
        if (!userId) {
            return undefined;
        }
        let cancelled = false;

        const load = () =>
            getUserProfile({ user: userId })
                .then(data => {
                    const profile = data?.body ? JSON.parse(data.body) : null;
                    if (!cancelled && profile?.user) {
                        setConsentMissing(!profile.user.linkedin_publication_consent);
                    }
                })
                .catch(() => {});

        const onChanged = event => setConsentMissing(!event.detail?.consent);

        load();
        window.addEventListener(LINKEDIN_CONSENT_CHANGED_EVENT, onChanged);
        return () => {
            cancelled = true;
            window.removeEventListener(LINKEDIN_CONSENT_CHANGED_EVENT, onChanged);
        };
    }, [userId]);

    if (!consentMissing || dismissed) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1.5, mr: 10 }}>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                We plan a LinkedIn publication about this service; including your data is optional.{' '}
                <Link to={reverse(ROUTES.USER_PROFILE, { userId })}>Review and grant consent in your profile</Link>
            </Typography>
            <Tooltip title="Hide (you stay opted out)">
                <IconButton size="small" aria-label="Hide LinkedIn publication notice" onClick={dismiss} sx={{ ml: 1 }}>
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

LinkedInConsentBanner.propTypes = {
    userId: PropTypes.string
};

export default LinkedInConsentBanner;
