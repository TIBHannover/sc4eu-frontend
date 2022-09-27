//https://github.com/tgfawad/Ontologies
// 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
// https://raw.githubusercontent.com/w3c/dpv/master/dpv-owl/dpv.owl

import { Octokit } from '@octokit/rest';

export const getUser = async githubapiurl => {
    console.log('getUser');
};

const getUserFromUrl = githubapiurl => {
    const url = new URL(githubapiurl);
    const userName = url.pathname.split('/')[1];
    return userName;
};
const getRepoFromUrl = githubapiurl => {
    const url = new URL(githubapiurl);
    const repoName = url.pathname.split('/')[2];
    return repoName;
};
const getBranchFromUrl = githubapiurl => {
    const url = new URL(githubapiurl);
    const branchName = url.pathname.split('/')[3];
    return branchName;
};
const getFilePath = githubapiurl => {
    const url = new URL(githubapiurl);
    const repoPath = url.pathname
        .split('/')
        .splice(4)
        .join('/');
    console.log(repoPath);
    return repoPath;
};

export const getRepo = async githubapiurl => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);
    //const repoURL = constants.hostname;
    //const response = await axios.get(this.state.githubURL);
};

export const getThisCommit = async (githubapiurl, sha) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);
    const branchRefoName = getBranchFromUrl(githubapiurl);
    const filePath = getFilePath(githubapiurl);

    const contents = await octokit.rest.repos.getCommit({
        owner: user,
        repo: repoName,
        path: filePath,
        ref: sha
    });
    console.log('===========================');
    console.log(contents);
};

export const getAllCommits = async githubapiurl => {
    console.log('getCommits');
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);
    const branchRefoName = getBranchFromUrl(githubapiurl);
    const filePath = getFilePath(githubapiurl);

    const contents = await octokit.rest.repos.listCommits({
        owner: user,
        repo: repoName,
        ref: branchRefoName
    });
    console.log(contents['data']);
    getThisCommit(githubapiurl, contents['data'][1].sha);
};

export const getGitHubFileContent = async githubapiurl => {
    console.log('getFileContent');
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);
    const branchRefoName = getBranchFromUrl(githubapiurl);
    const filePath = getFilePath(githubapiurl);

    const contents = await octokit.rest.repos.getContent({
        owner: user,
        repo: repoName,
        path: filePath,
        ref: branchRefoName
    });
    console.log(contents);
    const base64Contents = contents['data']['content'];
    const bufferObj = Buffer.from(base64Contents, 'base64');

    // Encode the Buffer as a utf8 string
    const decodedString = bufferObj.toString('utf8');
    //console.log(decodedString);
    return decodedString;
};

export const getRelease = async githubapiurl => {
    console.log('getRelease');
};

export const getBranch = async githubapiurl => {
    console.log('getBranch');
};
