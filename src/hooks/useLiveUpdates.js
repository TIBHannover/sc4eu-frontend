import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { waitForDiscussionWritesIdle } from '../components/VocabularySupport/utils/CommitChanges';

const EVENTS_URL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}events`;
const DEBOUNCE_MS = 500;
const RECONNECT_BASE_DELAY_MS = 2000; // delay before opening a new connection after the browser gave up, doubled on every failure
const RECONNECT_MAX_DELAY_MS = 30000;

/**
 * Refreshes terms and discussions when somebody else changed them (server-sent events from Express, triggered by a GitHub webhook).
 *
 * - Terms are not refreshed while the user has uncommitted changes, that would throw them away.
 *   The refresh is done as soon as the changes are committed or discarded.
 * - Discussions are not refreshed while one of our own comments is being committed (see trackDiscussionWrite).
 *
 * @param {function} onTermsRefreshed - called with the new terms after a refresh, they are the new baseline for commits.
 */
export function useLiveUpdates({ onTermsRefreshed }) {
    const queryClient = useQueryClient();
    const onTermsRefreshedRef = useRef(onTermsRefreshed);
    const termsRefreshPendingRef = useRef(false);
    const timersRef = useRef({});
    onTermsRefreshedRef.current = onTermsRefreshed;

    const refreshTerms = useCallback(async () => {
        await queryClient.invalidateQueries({ queryKey: ['terms'] });

        onTermsRefreshedRef.current?.(queryClient.getQueryData(['terms']));
    }, [queryClient]);

    const refreshDiscussions = useCallback(async () => {
        await waitForDiscussionWritesIdle();
        await queryClient.invalidateQueries({ queryKey: ['discussions'] });
    }, [queryClient]);

    const schedule = useCallback((name, refresh) => {
        clearTimeout(timersRef.current[name]);
        timersRef.current[name] = setTimeout(refresh, DEBOUNCE_MS);
    }, []);

    useEffect(() => {
        let source;
        let reconnectTimer;
        let failures = 0;
        let connectedBefore = false;
        let stopped = false;

        const connect = () => {
            source = new EventSource(EVENTS_URL);

            source.onopen = () => {
                failures = 0;
                if (connectedBefore) {
                    schedule('terms', refreshTerms);
                    schedule('discussions', refreshDiscussions);
                }
                connectedBefore = true;
            };

            source.onerror = () => {
                if (!stopped && source.readyState === EventSource.CLOSED) {
                    source.close();
                    failures++;
                    reconnectTimer = setTimeout(connect, Math.min(RECONNECT_BASE_DELAY_MS * 2 ** (failures - 1), RECONNECT_MAX_DELAY_MS));
                }
            };

            source.addEventListener('terms_changed', () => schedule('terms', refreshTerms));
            source.addEventListener('discussions_changed', () => schedule('discussions', refreshDiscussions));
        };

        connect();

        const timers = timersRef.current;
        return () => {
            stopped = true;
            clearTimeout(reconnectTimer);
            source.close();
            Object.values(timers).forEach(clearTimeout);
        };
    }, [schedule, refreshTerms, refreshDiscussions]);

    useEffect(() => {
        if (termsRefreshPendingRef.current) {
            termsRefreshPendingRef.current = false;
            refreshTerms();
        }
    }, [refreshTerms]);
}
