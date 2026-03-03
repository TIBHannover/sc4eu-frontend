// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.0/8 are considered localhost for IPv4.
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
    console.log('=== SERVICE WORKER REGISTRATION STARTED ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('PUBLIC_URL:', process.env.PUBLIC_URL);
    console.log('Service Worker supported:', 'serviceWorker' in navigator);

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
        if ('serviceWorker' in navigator) {
            // Debug the URL construction
            const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
            console.log('Public URL:', publicUrl.href);
            console.log('Origin:', publicUrl.origin);
            console.log('Location Origin:', window.location.origin);

            const swUrl = `http://localhost:3000/service-worker.js`;
            console.log('Service Worker URL being requested:', swUrl);

            if (publicUrl.origin !== window.location.origin) {
                console.log('Different origin - skipping registration');
                return;
            }

            window.addEventListener('load', () => {
                if (process.env.NODE_ENV === 'development') {
                    console.log('Development mode - checking valid service worker');
                    checkValidServiceWorker(swUrl, config);
                } else {
                    console.log('Production mode - registering valid SW');
                    registerValidSW(swUrl, config);
                }
            });
        } else {
            console.log('Service Worker not supported');
        }
    } else {
        console.log('Not in production or development - skipping registration');
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // At this point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            console.log(
                                'New content is available and will be used when all ' + 'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                            );

                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    console.log('=== CHECK VALID SERVICE WORKER STARTED ===');
    console.log('Service worker URL being checked:', swUrl);

    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' }
    })
        .then(response => {
            console.log('Fetch response received:', response);
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            // Ensure service worker exists, and that we really are getting a JS file.
            const contentType = response.headers.get('content-type');
            console.log('Content-Type header:', contentType);

            if (response.status === 404) {
                console.log('Service worker file NOT FOUND (404)');
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready
                    .then(registration => {
                        console.log('Unregistering service worker...');
                        registration.unregister().then(() => {
                            console.log('Service worker unregistered, reloading page...');
                            window.location.reload();
                        });
                    })
                    .catch(error => {
                        console.log('Error getting service worker ready:', error);
                        window.location.reload();
                    });
            } else if (contentType != null && contentType.indexOf('javascript') === -1) {
                console.log('Service worker found but not a JavaScript file');
                console.log('Content-Type is:', contentType);
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready
                    .then(registration => {
                        console.log('Unregistering service worker...');
                        registration.unregister().then(() => {
                            console.log('Service worker unregistered, reloading page...');
                            window.location.reload();
                        });
                    })
                    .catch(error => {
                        console.log('Error getting service worker ready:', error);
                        window.location.reload();
                    });
            } else {
                console.log('Service worker file FOUND and is valid - proceeding to register');
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })
        .catch(error => {
            console.log('=== FETCH ERROR ===');
            console.log('Error during fetch:', error);
            console.log('Error type:', error.constructor.name);
            console.log('Error message:', error.message);

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                console.log('This is likely a CORS or network error');
            }

            console.log('No internet connection found. App is running in offline mode.');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then(registration => {
                registration.unregister();
            })
            .catch(error => {
                console.error(error.message);
            });
    }
}
