import { submitGetRequest, submitPostRequest } from './networkRequests';
import {
    URL_CREATE_NEW_TERM_VOTE, URL_GET_TERM_LAST_CONSENSUS, URL_GET_TERM_OF_THE_WEEK,
    URL_GET_TERM_VOTE, URL_GET_TERM_VOTES, URL_MANUAL_CLOSE_CONSENSUS,
    URL_POST_NEW_COMMENT,
    URL_UPDATE_EXPERT_VOTE_DECISION
} from '../constants/services';

export const getTermVote = term_uuid => {
    return submitGetRequest(`${URL_GET_TERM_VOTE}/?term_uuid=${term_uuid}&status=under_agreement`, {}, false);
};

export const getTermLastConsensus = term_uuid => {
    return submitGetRequest(`${URL_GET_TERM_LAST_CONSENSUS}/?term_uuid=${term_uuid}`, {}, false);
};

export const getTermVotes = () => {
    return submitGetRequest(`${URL_GET_TERM_VOTES}/?status=under_agreement`, {}, false);
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
        user: user,
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

export const postNewComment = (term_uuid, vote_uuid, username, text) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    const data = {
        term_uuid: term_uuid,
        vote_uuid: vote_uuid,
        user: username,
        text: text
    };
    return submitPostRequest(URL_POST_NEW_COMMENT, headers, data);
};
