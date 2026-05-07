import React, { useState, useEffect } from 'react';
import { useInstallPrompt } from './hooks/useInstallPrompt';
import { differenceInHours } from 'date-fns';
import { Paper, Typography, Button, Box, Slide } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

export function InstallBanner() {
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-banner-dismissed-datetime');
    if (dismissed) {
      const timeSinceDismissed = differenceInHours(new Date(Date.now()), new Date(Number(dismissed)));
      console.log(`${timeSinceDismissed}`)
      if (timeSinceDismissed >= 3) {
        setIsDismissed(false);
        setIsVisible(true);
        return;
      }
      setIsDismissed(true);
      return;
    }
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled]);

  if (!isVisible || isDismissed || isInstalled || !isInstallable) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('pwa-banner-dismissed-datetime', Date.now().toString());
  };

  const handleInstall = async () => {
    const installed = await promptInstall();
    if (installed) setIsVisible(false);
  };

  return (
    <Slide direction="down" in={isVisible} mountOnEnter unmountOnExit>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          top: {xs: 64, md: 'auto'},
          bottom: { xs: 'auto', md: 16},
          left: 16,
          right: 16,
          maxWidth: 480,
          margin: '0 auto',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          zIndex: 1000,
        }}
      >
        <GetAppIcon color="primary" fontSize="large" />
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            Install App
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add to your home screen for quick access
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button size="small" onClick={handleDismiss}>
            Later
          </Button>
          <Button size="small" variant="contained" onClick={handleInstall}>
            Install
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
}