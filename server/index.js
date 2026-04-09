const path = require('path');
const express = require('express');
require('dotenv').config();

const cors = require('cors');
const passport = require('passport');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// configuring some url and ports before the app;
const APPLICATION_PORT = process.env.APPLICATION_PORT ? process.env.APPLICATION_PORT : '9000';
const APPLICATION_URL = process.env.APPLICATION_URL ? process.env.APPLICATION_URL : 'http://localhost';

const app = express(); // create express app
const url = require('url');
const proxy = require('http-proxy-middleware').createProxyMiddleware;

//const API_SERVICE_URL = 'http://localhost:9000';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const auth = require('./authCalls');
const server = require('./serverCalls');
const database = require('./databaseCalls');
const processing = require('./ontologyProcessingCalls');

auth.initializeAuth(app, router, passport);

// start express server on port
app.listen(APPLICATION_PORT, () => {
    console.log('server started on port ' + APPLICATION_PORT);
    console.log('You can access it via ' + APPLICATION_URL + ':' + APPLICATION_PORT);
});

// THIS IS ONLY FOR DECOUPLED DEBUGING STUFF, means the react app runs on its own server e.g. localhost:3000
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            process.env.REDIRECT_URL
        ], // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true // allow session cookie from browser to pass through
    })
);

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false, parameterLimit: 50000 }));

router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());

// apply individual "endPoints"
server.servicesStatus(router);
server.testConnection(router);
server.adminDashBoard(router);
server.allRoles(router);
server.userRole(router);
server.userProject(router);
server.userProjectsDetail(router);
server.projectUsersDetail(router);
server.allowUploads(router);
server.getUserHeader(router);
server.deleteUser(router);
server.transformTTL(router);
server.transformVOWL_JSON(router);
server.checkUserExists(router);

auth.registerUser(router);
auth.loginViaEmail(router);
auth.userSettings(router);
auth.getUserSettings(router);
auth.verifyEmail(router);
auth.forgotPassword(router);
auth.verifResetPassword(router);
auth.setNewPassword(router);
auth.projectAccessEmail(router);
auth.getAllSystemAdmin(router);

database.uploadOntology(router);
database.updateOntology(router);
database.deleteOntology(router);
database.viewUserSettings(router);
database.getOntologyIndex(router);
database.getOntologyByID(router);
database.getProjectIndex(router);
database.createProject(router);
database.deleteProject(router);
database.editProject(router);
database.getAllUsers(router);
database.unregisterUserFromProject(router);
database.addUserToProject(router);
database.getOntologyGitData(router);
database.createTermVote(router);
database.getTermLastConsensus(router);
database.getTermVotes(router);
database.getVotes(router);
database.updateVoteDecision(router);
database.getTermOfTheWeek(router);
database.closeConsensus(router);
database.subscribePush(router);
database.unsubscribePush(router);
database.notifyAddRemoveTerm(router);
database.notifyNewComment(router);
processing.getJSONModelForOntologyID(router);
processing.getJSONModelForOntologyIDWithQuery(router);
processing.initializeOntology(router);
processing.compareTwoOntologies(router);
processing.getWidocoDocumentation(router);
processing.getHtmlForWidoco(router);

/** GITHUB OAUTH STUFF**/
router.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'user:email'] }));
router.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: `${process.env.CALLBACK_URL}/ocp/LoginFailedRedirect` }),
    (req, res) => {
        // Successful authentication, redirect home.
        // >> THIS NEEDS TO BE UPDATED TO THE DEPLOYED URL IN THE END
        res.redirect(
            url.format({
                pathname: `${process.env.CALLBACK_URL}/ocp/loggedIn`,
                query: {
                    success: true,
                    token: req.user.jwt
                }
            })
        );
    }
);

router.get('/auth/gitlab', passport.authenticate('gitlab', { scope: ['read_user'] }));
router.get(
    '/auth/gitlab/callback',
    passport.authenticate('gitlab', { failureRedirect: `${process.env.REDIRECT_URL}/ocp/LoginFailedRedirect` }),
    (req, res) => {
        const redirectURL = url.format({
            pathname: `${process.env.REDIRECT_URL}/ocp/loggedIn`,
            query: {
                success: true,
                token: req.user.jwt
            }
        });

        res.redirect(redirectURL);
    }
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.REDIRECT_URL}/ocp/LoginFailedRedirect` }),
    (req, res) => {
        const redirectURL = url.format({
            pathname: `${process.env.REDIRECT_URL}/ocp/loggedIn`,
            query: {
                success: true,
                token: req.user.jwt
            }
        });

        res.redirect(redirectURL);
    }
);

router.get('/auth/sap', passport.authenticate('sap', { scope: ['profile', 'email'] }));
router.get(
    '/auth/sap/callback',
    passport.authenticate('sap', { failureRedirect: `${process.env.REDIRECT_URL}/ocp/LoginFailedRedirect` }),
    (req, res) => {
        const redirectURL = url.format({
            pathname: `${process.env.REDIRECT_URL}/ocp/loggedIn`,
            query: {
                success: true,
                token: req.user.jwt
            }
        });

        res.redirect(redirectURL);
    }
);

router.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use('/ocp', router);
