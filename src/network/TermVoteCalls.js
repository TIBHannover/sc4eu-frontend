import { submitGetRequest, submitPostRequest } from './networkRequests';
import {
    URL_CREATE_NEW_TERM_VOTE, URL_GET_TERM_LAST_CONSENSUS, URL_GET_TERM_OF_THE_WEEK,
    URL_GET_TERM_VOTES, URL_MANUAL_CLOSE_CONSENSUS, URL_GET_VOTES,
    URL_UPDATE_EXPERT_VOTE_DECISION
} from '../constants/services';

export const getTermLastConsensus = term_uuid => {
    return submitGetRequest(`${URL_GET_TERM_LAST_CONSENSUS}/?term_uuid=${term_uuid}`, {}, false);
};

export const getTermVotes = term_uuid => {
    return submitGetRequest(`${URL_GET_TERM_VOTES}/?term_uuid=${term_uuid}&status=under_agreement`, {}, false);
};

export const getVotes = () => {
    return submitGetRequest(`${URL_GET_VOTES}/?status=under_agreement`, {}, false);
};

export const getWeeklyTerm = () => {
    return submitGetRequest(`${URL_GET_TERM_OF_THE_WEEK}`, {}, false);
};

export const initiateNewVote = (term_uuid, user, type, reason) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    const data = {
        term_uuid: term_uuid,
        assignee: user,
        type: type,
        reason: reason
    };
    return submitPostRequest(URL_CREATE_NEW_TERM_VOTE, headers, data);
};

export const updateExpertDecision = (term_uuid, vote_uuid, user, choice, comment) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    const data = {
        term_uuid: term_uuid,
        vote_uuid: vote_uuid,
        user_name: user,
        choice: choice,
        comment: comment
    };
    return submitPostRequest(URL_UPDATE_EXPERT_VOTE_DECISION, headers, data);
};

export const manualCloseConsensus = (term_uuid, vote_uuid) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    const data = {
        term_uuid: term_uuid,
        vote_uuid: vote_uuid
    };
    return submitPostRequest(URL_MANUAL_CLOSE_CONSENSUS, headers, data);
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

export const register_push = async () => {
    console.log('Poshol Subscribe')
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.REACT_APP_VAPID_PUBLIC_KEY
    ),
  });

  console.log(subscription)
  const headers = {
    'Content-Type': 'application/json'
  };

  await fetch(`${process.env.REACT_APP_EXPRESS_BACKEND_URL}subscriber`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(subscription),
  });

}
