module.exports = {
    oauth2: {
        authorizationURL: process.env.OAUTH2_AUTHORIZATION_URL,
        tokenURL: process.env.OAUTH2_TOKEN_URL,
        clientID: process.env.OAUTH2_CLIENT_ID,
        clientSecret: process.env.OAUTH2_CLIENT_SECRET,
        callbackURL: `${process.env.CALLBACK_URL}/vocab/oauth/oauth2/callback`,
        scope: ['profile', 'email'],
        state: true
    },
    gitlab: {
        clientID: process.env.GITLAB_CLIENT_ID,
        clientSecret: process.env.GITLAB_CLIENT_SECRET,
        callbackURL: `${process.env.CALLBACK_URL}/vocab/oauth/gitlab/callback`
    },
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.CALLBACK_URL}/vocab/oauth/github/callback`
    },
    sap: {
        authorizationURL: process.env.SAP_AUTHORIZATION_URL_FOR_LOGIN,
        tokenURL: process.env.SAP_TOKEN_URL_FOR_LOGIN,
        clientID: process.env.SAP_CLIENT_ID_FOR_LOGIN,
        clientSecret: process.env.SAP_CLIENT_SECRET_FOR_LOGIN,
        callbackURL: `${process.env.CALLBACK_URL}/vocab/oauth/sap/callback`,
        scope: ['openid', 'email', 'profile']
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID_FOR_LOGIN,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_FOR_LOGIN,
        callbackURL: `${process.env.CALLBACK_URL}/vocab/oauth/google/callback`,
        scope: ['profile', 'email']
    },
    linkedin: {
        authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
        tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: `${process.env.CALLBACK_URL}/vocab/oauth/linkedin/callback`,
        scope: ['openid', 'email', 'profile']
    }
};
