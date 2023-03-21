import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
});

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
    let branchName;
    if (githubapiurl.includes('raw.githubusercontent')) {
        branchName = url.pathname.split('/')[3];
    } else {
        branchName = url.pathname.split('/')[4];
    }
    return branchName;
};
const getFilePath = githubapiurl => {
    const url = new URL(githubapiurl);
    let repoPath;
    if (githubapiurl.includes('raw.githubusercontent')) {
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
export const getRawUrlforCommit = (githubapiurl, commit_sha) => {
    const url = new URL(githubapiurl);
    const temp_url = url.href.split('/');
    if (githubapiurl.includes('github.com')) {
        temp_url[2] = 'raw.githubusercontent.com';
        temp_url.splice(5, 1);
        temp_url[5] = commit_sha;
    } else if (githubapiurl.includes('raw.githubusercontent')) {
        temp_url[5] = commit_sha;
    }
    return temp_url.join('/');
};

export const getThisCommit = async (githubapiurl, sha) => {
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);
    const filePath = getFilePath(githubapiurl);

    const contents = await octokit.rest.repos.getCommit({
        owner: user,
        repo: repoName,
        path: filePath,
        ref: sha
    });
    return contents;
};

export const getAllCommits = async githubapiurl => {
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);
    const branchRefoName = getBranchFromUrl(githubapiurl);

    const contents = await octokit.rest.repos.listCommits({
        owner: user,
        repo: repoName,
        ref: branchRefoName
    });
    return contents;
};

export const compareTwoCommits = async (githubapiurl, firstCommit, secondCommit) => {
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

export const getLicense = async githubapiurl => {
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);

    const license = await octokit.rest.licenses
        .getForRepo({
            owner: user,
            repo: repoName
        })
        .then(lic => {
            return lic;
        })
        .catch(err => {
            return null;
        });
    return license;
};

export const getGitHubFileContent = async githubapiurl => {
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);
    const filePath = getFilePath(githubapiurl);
    const branchName = getBranchFromUrl(githubapiurl);

    const ontologyData = await octokit.rest.repos.getContent({
        owner: user,
        repo: repoName,
        path: filePath,
        ref: branchName
    });
    const sha = ontologyData['data']['sha'];

    const contents = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
        owner: user,
        repo: repoName,
        file_sha: sha
    });
    const base64Contents = contents['data']['content'];
    const bufferObj = Buffer.from(base64Contents, 'base64');

    // Encode the Buffer as a utf8 string
    const decodedString = bufferObj.toString('utf8');
    return decodedString;
};

export const getBranches = async githubapiurl => {
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);

    const branches = await octokit.rest.repos.listBranches({
        owner: user,
        repo: repoName
    });
};

export const listReleases = async githubapiurl => {
    const user = getUserFromUrl(githubapiurl);
    const repoName = getRepoFromUrl(githubapiurl);

    const releases = await octokit.rest.repos.listReleases({
        owner: user,
        repo: repoName
    });
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

export const getLatestCommit = async githubApiUrl => {
    const owner = getUserFromUrl(githubApiUrl);
    const repo = getRepoFromUrl(githubApiUrl);
    const branch = getBranchFromUrl(githubApiUrl) || 'main';

    const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
        owner: owner,
        repo: repo,
        ref: branch
    });
    return response.data.sha;
};

export const checkFileUpdated = async (githubApiUrl, lastCommit) => {
    const owner = getUserFromUrl(githubApiUrl);
    const repo = getRepoFromUrl(githubApiUrl);
    const branch = getBranchFromUrl(githubApiUrl) || 'main';

    try {
        // Get the latest commit SHA for the repository
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner: owner,
            repo: repo,
            ref: branch
        });

        const latestCommitSha = response.data.sha;
        const lastFetchedFileSha = lastCommit;
        if (latestCommitSha !== lastFetchedFileSha) {
            const {
                data: { behind_by: commitsBehind }
            } = await octokit.rest.repos.compareCommits({
                owner,
                repo,
                base: latestCommitSha,
                head: lastFetchedFileSha
            });
            return {
                status: 'behind',
                commitsBehind,
                branch
            };
        } else {
            return {
                status: 'latest',
                commitsBehind: 0,
                branch
            };
        }
    } catch (error) {
        return {
            status: 'error',
            commitsBehind: -1
        };
    }
};
