import { Octokit } from '@octokit/rest';

const Buffer = require('buffer/').Buffer;

const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN2
    //auth: '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'
});

const getUserFromUrl = GitHubAPIUrl => {
    const url = new URL(GitHubAPIUrl);
    return url.pathname.split('/')[1];
};
const getRepoFromUrl = GitHubAPIUrl => {
    const url = new URL(GitHubAPIUrl);
    return url.pathname.split('/')[2];
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

const getFileDataFromGitHub = async GitHubAPIUrl => {
    const owner = getUserFromUrl(GitHubAPIUrl);
    const repo = getRepoFromUrl(GitHubAPIUrl); // the name of the repository
    const path = getFilePath(GitHubAPIUrl); // the path of the file to fetch

    // get the file content and sha from GitHub
    const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path
    });
    return data;
};
export const getFileContent = async GitHubAPIUrl => {
    // const owner = getUserFromUrl(GitHubAPIUrl);
    // const repo = getRepoFromUrl(GitHubAPIUrl); // the name of the repository
    // const path = getFilePath(GitHubAPIUrl); // the path of the file to fetch
    //
    // // get the file content and sha from GitHub
    // const { data } = await octokit.repos.getContent({
    //     owner,
    //     repo,
    //     path
    // });
    const data = await getFileDataFromGitHub(GitHubAPIUrl);
    const bufferObj = Buffer.from(data['content'], 'base64').toString();
    try {
        return JSON.parse(bufferObj);
    } catch (e) {
        console.log('parsing error', +e.toString());
    }
    return null;
};

export const saveNewContent = async (GitHubAPIUrl, newData) => {
    const owner = getUserFromUrl(GitHubAPIUrl);
    const repo = getRepoFromUrl(GitHubAPIUrl); // the name of the repository
    const path = getFilePath(GitHubAPIUrl); // the path of the file to fetch
    const user_info = {
        name: `Fawad Khan`,
        email: 'tgfawad@gmail.com'
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
            message: 'update file content with octokit', // the commit message
            content: newContent, // the new content
            sha: my_sha,
            committer: { ...user_info },
            author: { ...user_info }
        });
        console.log('file updated successfully before update', response.data);
        // if (updated) {
        //     console.log('file updated successfully');
        //     return data;
        // }
        return response.data;
    } catch (e) {
        console.log(e.toString());
    }
    return null;
};
