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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const auth = require('./authCalls');
const server = require('./serverCalls');
const database = require('./databaseCalls');

auth.initializeAuth(app, passport);

// add middle-ware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

// start express server on port
app.listen(APPLICATION_PORT, () => {
    console.log('server started on port ' + APPLICATION_PORT);
    console.log('You can access it via ' + APPLICATION_URL + ':' + APPLICATION_PORT);
});

// TODO : make this configurable
// app.use(
//     cors({
//         origin: 'http://localhost:9000', // allow to server to accept request from different origin
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         credentials: true // allow session cookie from browser to pass through
//     })
// );

// THIS IS ONLY FOR DECOUPLED DEBUGING STUFF, means the react app runs on its own server e.g. localhost:3000
app.use(
    cors({
        origin: 'http://localhost:3000', // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true // allow session cookie from browser to pass through
    })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// apply individual "endPoints"
server.servicesStatus(app);
server.testConnection(app);
server.adminDashBoard(app);
server.allowUploads(app);
server.getUserHeader(app);

auth.registerUser(app);
auth.loginViaEmail(app);
auth.userSettings(app);
auth.getUserSettings(app);

database.uploadOntology(app);
database.viewUserSettings(app);

/** GITHUB OAUTH STUFF**/
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    // TODO: implement the /login page for failureRedirect
    // Successful authentication, redirect home.
    // >> THIS NEEDS TO BE UPDATED TO THE DEPLOYED URL IN THE END
    res.redirect(`http://localhost:9000/loggedIn/${req.user.jwt}`);
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
