import { Octokit } from '@octokit/rest';
const Buffer = require('buffer/').Buffer;
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
// export const getBranchFromUrl = githubapiurl => {
//     const url = new URL(githubapiurl);
//     let branchName;

//     if (githubapiurl.includes('raw.githubusercontent')) {
//         branchName = url.pathname.split('/')[3];
//     } else {
//         branchName = url.pathname.split('/')[4];
//     }

//     // Remove 'refs/heads/' if present in branch name
//     if (branchName.startsWith('refs/heads/')) {
//         branchName = branchName.replace('refs/heads/', '');
//     }

//     return branchName;
// };

export const getBranchFromUrl = githubapiurl => {
    const url = new URL(githubapiurl);
    let branchName;

    if (githubapiurl.includes('raw.githubusercontent')) {
        branchName = url.pathname.split('/')[3]; // Extract branch name
    } else {
        branchName = url.pathname.split('/')[4];
    }

    // Fix: Handle 'refs/heads/' properly
    if (branchName.startsWith('refs/heads/')) {
        branchName = branchName
            .split('/')
            .slice(2)
            .join('/'); // Extract actual branch name
    } else if (branchName === 'refs') {
        branchName = url.pathname.split('/')[5]; // Fix incorrect extraction
    }

    return branchName;
};

// const getFilePath = githubapiurl => {
//     const url = new URL(githubapiurl);
//     let repoPath;
//     if (githubapiurl.includes('raw.githubusercontent')) {
//         repoPath = url.pathname
//             .split('/')
//             .splice(4)
//             .join('/');
//     } else {
//         repoPath = url.pathname
//             .split('/')
//             .splice(5)
//             .join('/');
//     }
//     return repoPath;
// };

export const getFilePath = githubapiurl => {
    const url = new URL(githubapiurl);
    const pathParts = url.pathname.split('/').slice(5); // Skip user, repo, and branch parts

    return pathParts.join('/'); // Return the correct file path
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

export const parseGitHubRawUrl = githubRawUrl => {
    try {
        const url = new URL(githubRawUrl);
        const pathParts = url.pathname.split('/').slice(1); // Remove first empty item due to leading '/'

        if (pathParts.length < 4) {
            throw new Error('Invalid GitHub raw URL format.');
        }

        const owner = pathParts[0];
        const repo = pathParts[1];

        let branch, filePath;

        if (pathParts[2] === 'refs' && pathParts[3] === 'heads') {
            // URL has 'refs/heads/{branch}'
            branch = pathParts[4];
            filePath = pathParts.slice(5).join('/');
        } else {
            // Standard URL format '{owner}/{repo}/{branch}/{file_path}'
            branch = pathParts[2];
            filePath = pathParts.slice(3).join('/');
        }

        return { owner, repo, branch, filePath };
    } catch (error) {
        console.error('Error parsing GitHub raw URL:', error);
        return null;
    }
};

export const getGitHubFileContent = async githubapiurl => {
    try {
        console.log('Fetching file content from GitHub:', githubapiurl);
        const { owner, repo, branch, filePath } = parseGitHubRawUrl(githubapiurl);
        const branchName = branch || 'main';

        // Fetch file content
        const { data } = await octokit.rest.repos.getContent({
            owner: owner,
            repo: repo,
            path: filePath,
            ref: branchName
        });

        const sha = data.sha;

        // Fetch file blob using the SHA
        const { data: blobData } = await octokit.rest.git.getBlob({
            owner: owner,
            repo: repo,
            file_sha: sha
        });
        // Decode base64 content
        return Buffer.from(blobData.content, 'base64').toString('utf8');
    } catch (error) {
        console.error('Error fetching file content from GitHub:', error);
        return {
            success: false,
            message: 'Failed to fetch file content from GitHub. Github API limit exceeded. please try again later',
            error: error.message
        };
    }
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

    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner: owner,
            repo: repo,
            ref: branch
        });
        return response.data.sha;
    } catch (error) {
        console.error('Error fetching latest commit:', error);
        return null;
    }
};

function parseGithubUrl(url) {
    const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/;
    const match = url.match(regex);

    if (!match) {
        throw new Error('Invalid GitHub file URL format');
    }

    const [, owner, repo, branch, filePath] = match;

    return { owner, repo, branch, filePath };
}

export const getLatestContent = async githubApiUrl => {
    const { owner, repo, branch, filePath } = parseGitHubRawUrl(githubApiUrl);

    try {
        const { data } = await octokit.rest.repos.getContent({
            owner: owner,
            repo: repo,
            path: filePath,
            ref: branch
        });

        const sha = data.sha;

        // Fetch file blob using the SHA
        const { data: blobData } = await octokit.rest.git.getBlob({
            owner: owner,
            repo: repo,
            file_sha: sha
        });
        // Decode base64 content
        return Buffer.from(blobData.content, 'base64').toString('utf8');
    } catch (error) {
        console.error('Error fetching file content from GitHub:', error);
        return null;
    }
};

export const checkFileUpdated = async (githubApiUrl, lastCommit) => {
    const owner = getUserFromUrl(githubApiUrl);
    const repo = getRepoFromUrl(githubApiUrl);
    const branch = getBranchFromUrl(githubApiUrl) || 'main';

    try {
        // Get the latest commit SHA for the repository
        const { data: commitData } = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner,
            repo,
            ref: branch
        });

        const latestCommitSha = commitData.sha;

        if (latestCommitSha !== lastCommit) {
            const {
                data: { behind_by: commitsBehind }
            } = await octokit.rest.repos.compareCommits({
                owner,
                repo,
                base: latestCommitSha,
                head: lastCommit
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
