import { Octokit } from '@octokit/rest';

const Buffer = require('buffer/').Buffer;

const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN2
});

const getUserFromUrl = GitHubAPIUrl => {
    const url = new URL(GitHubAPIUrl);
    return url.pathname.split('/')[1];
};

const getRepoFromUrl = GitHubAPIUrl => {
    const url = new URL(GitHubAPIUrl);
    return url.pathname.split('/')[2];
};

const getBranchFromUrl = GitHubAPIUrl => {
    return new URL(GitHubAPIUrl).pathname.split('/')[3];
};

const getFilePath = GitHubAPIUrl => {
    const url = new URL(GitHubAPIUrl);
    let repoPath;
    if (GitHubAPIUrl.includes('raw.githubusercontent')) {
        repoPath = url.pathname
            .split('/')
            .splice(4)
            .join('/');
    } else {
        repoPath = url.pathname
            .split('/')
            .splice(5)
            .join('/');
    }
    return repoPath;
};

export const getFileDataFromGitHub = async GitHubAPIUrl => {
    const owner = getUserFromUrl(GitHubAPIUrl);
    const repo = getRepoFromUrl(GitHubAPIUrl); // the name of the repository
    const path = getFilePath(GitHubAPIUrl); // the path of the file to fetch
    const ref = getBranchFromUrl(GitHubAPIUrl);

    const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ...(ref && { ref })
    });
    return data;
};

export const saveNewContent = async (GitHubAPIUrl, newData, commitMessage) => {
    const owner = getUserFromUrl(GitHubAPIUrl);
    const repo = getRepoFromUrl(GitHubAPIUrl); // the name of the repository
    const path = getFilePath(GitHubAPIUrl); // the path of the file to fetch
    const user_info = {
        name: `tib-ts`,
        email: 'terminology-service@tib.eu'
    };

    const newContent = Buffer.from(newData).toString('base64');
    const result = await getFileDataFromGitHub(GitHubAPIUrl);
    const my_sha = result.sha;

    try {
        // update the file content on GitHub
        const response = await octokit.rest.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message: commitMessage, // the commit message
            content: newContent, // the new content
            sha: my_sha,
            committer: { ...user_info },
            author: { ...user_info }
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};
