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
export const getBranchFromUrl = githubapiurl => {
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
    return repoPath;
};

export const getRawUrlforCommit = (githubapiurl, commit_sha) => {
    const url = new URL(githubapiurl);
    const temp_url = url.href.split('/');
    temp_url[5] = commit_sha;
    return temp_url.join('/');
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
};

export const getAllCommits = async githubapiurl => {
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
    return contents;
    // const commitContent = await getGitHubFileContent(contents['data'][0].url);
    // console.log(commitContent);
    //getThisCommit(githubapiurl, contents['data'][1].sha);
};

export const compareTwoCommits = async (githubapiurl, firstCommit, secondCommit) => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);

    const compareResults = await octokit.rest.repos.compareCommits({
        owner: user,
        repo: repoName,
        base: firstCommit,
        head: secondCommit
    });
    return compareResults;
};

export const getGitHubFileContent = async githubapiurl => {
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
    const base64Contents = contents['data']['content'];
    const bufferObj = Buffer.from(base64Contents, 'base64');

    // Encode the Buffer as a utf8 string
    const decodedString = bufferObj.toString('utf8');
    return decodedString;
};

export const getRelease = async githubapiurl => {
    console.log('getRelease');
};

export const getBranches = async githubapiurl => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);

    const branches = await octokit.rest.repos.listBranches({
        owner: user,
        repo: repoName
    });
    console.log(branches);
};

export const listReleases = async githubapiurl => {
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);

    const releases = await octokit.rest.repos.listReleases({
        owner: user,
        repo: repoName
    });
    console.log(releases['data'][0].tag_name);
    return releases;
};

export const getReleaseTags = async githubapiurl => {
    const releases = await listReleases(githubapiurl);
    const releaseData = releases['data'];
    const tags = [];
    releaseData.forEach(release => {
        const tag = release.tag_name;
        tags.push(tag);
    });
    return tags;
};
