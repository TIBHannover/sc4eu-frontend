import { useState, useEffect, useCallback } from 'react';

export function useInstallPrompt() {
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }

        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPromptEvent(event);
            setIsInstallable(true);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setIsInstallable(false);
            setInstallPromptEvent(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const promptInstall = useCallback(async () => {
        if (!installPromptEvent) {
            return false;
        }

        try {
            installPromptEvent.prompt();
            const { outcome } = await installPromptEvent.userChoice;

            if (outcome === 'accepted') {
                setIsInstalled(true);
                setIsInstallable(false);
            }

            setInstallPromptEvent(null);
            return outcome === 'accepted';
        } catch (error) {
            console.error('PWA: Install prompt error:', error);
            return false;
        }
    }, [installPromptEvent]);

    return {
        isInstallable,
        isInstalled,
        promptInstall
    };
}
