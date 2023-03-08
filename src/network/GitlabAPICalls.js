export const getUser = async gitlabapiurl => {
    console.log('getUser');
};

const headers = { 'PRIVATE-TOKEN': process.env.REACT_APP_GITLAB_ACCESS_TOKEN };

const getUserRepoByName = async gitlabapiurl => {
    const user = getUserFromUrl(gitlabapiurl);
    const repo = getRepoFromUrl(gitlabapiurl);

    const userRepo = await fetch(`https://gitlab.com/api/v4/projects/${user}%2F${repo}`, { headers });
    const userRepoParsed = await userRepo.json();
    return userRepoParsed;
};
const getUserFromUrl = gitlabapiurl => {
    const url = new URL(gitlabapiurl);
    const userName = url.pathname.split('/')[1];
    return userName;
};
const getRepoFromUrl = gitlabapiurl => {
    const url = new URL(gitlabapiurl);
    const repoName = url.pathname.split('/')[2];
    return encodeURIComponent(repoName);
};
export const getGitlabBranchFromUrl = gitlabapiurl => {
    const url = new URL(gitlabapiurl);
    const branchName = url.pathname.split('/')[5];
    return branchName;
};
const getFilePath = gitlabapiurl => {
    const url = new URL(gitlabapiurl);
    const repoPath = url.pathname
        .split('/')
        .splice(6)
        .join('/');
    return encodeURIComponent(repoPath);
};
export const getRawUrlForGitlabCommit = (gitlabapiurl, commit_sha) => {
    const url = new URL(gitlabapiurl);
    const temp_url = url.href.split('/');
    temp_url[7] = commit_sha;
    return temp_url.join('/');
};
export const getGitlabCommits = async gitlabapiurl => {
    const userRepo = await getUserRepoByName(gitlabapiurl);

    const response = await fetch(`https://gitlab.com/api/v4/projects/${userRepo['id']}/repository/commits`, { headers });
    const data = await response.json();
    return data;
};
export const getGitlabLicense = async gitlabapiurl => {
    const user = getUserFromUrl(gitlabapiurl);
    const repo = getRepoFromUrl(gitlabapiurl);

    const response = await fetch(`https://gitlab.com/api/v4/projects/${user}%2F${repo}?license=yes`, { headers });
    let license = await response.json();
    return license;
};
export const getGitlabFileContent = async gitlabapiurl => {
    const branch = getGitlabBranchFromUrl(gitlabapiurl);
    const filePath = getFilePath(gitlabapiurl);

    const userRepo = await getUserRepoByName(gitlabapiurl);

    const userRepoFiles = await fetch(`https://gitlab.com/api/v4/projects/${userRepo['id']}/repository/files/${filePath}?ref=${branch}`, {
        headers
    });
    const userRepoFilesParsed = await userRepoFiles.json();

    const bufferObj = Buffer.from(userRepoFilesParsed['content'], 'base64');
    const decodedString = bufferObj.toString('utf8');
    return decodedString;
};

export const getGitlabLatestCommit = async githubApiUrl => {
    const userRepo = await getUserRepoByName(githubApiUrl);
    const branch = getGitlabBranchFromUrl(githubApiUrl) || 'main';

    const response = await fetch(`https://gitlab.com/api/v4/projects/${userRepo['id']}/repository/commits/${branch}`, { headers });
    const data = await response.json();
    return data.id;
};

export const checkGitlabFileUpdated = async (githubApiUrl, lastFetchedFileSha) => {
    const userRepo = await getUserRepoByName(githubApiUrl);

    try {
        // Get the latest commit SHA for the repositor
        const latestCommitSha = await getGitlabLatestCommit(githubApiUrl);
        if (latestCommitSha !== lastFetchedFileSha) {
            const comparisonUrl = await fetch(
                `https://gitlab.com/api/v4/projects/${userRepo['id']}/repository/compare?from=${lastFetchedFileSha}&to=${latestCommitSha}&straight=false`,
                { headers }
            );
            const response = await comparisonUrl.json();
            const commitsBehind = response?.commits?.length;
            return {
                status: 'behind',
                commitsBehind
            };
        } else {
            return {
                status: 'latest',
                commitsBehind: 0
            };
        }
    } catch (error) {
        return {
            status: 'error',
            commitsBehind: -1
        };
    }
};
