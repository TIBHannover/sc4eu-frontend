const path = require('path');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const GitHubStrategy = require('passport-github').Strategy;

// configuring some url and ports before the app;

const APPLICATION_PORT = process.env.APPLICATION_PORT ? process.env.APPLICATION_PORT : '9000';
const APPLICATION_URL = process.env.APPLICATION_URL ? process.env.APPLICATION_URL : 'http://localhost';

const app = express(); // create express app

require('dotenv').config();

// passport stuff
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(passport.initialize());

try {
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: APPLICATION_URL + ':' + APPLICATION_PORT + '/auth/github/callback'
            },
            function(__accessToken, __refreshToken, profile, cb) {
                // console.log(profile);
                // Create of find a user in a database (based on the githubID
                const local_accessToken = jwt.sign({ userId: 'user_123456' }, 'secretKey', { expiresIn: '8h' });
                console.log('local token:', local_accessToken);
                cb(null, { accessToken: local_accessToken }); // sends the local access token to the call back routine;
                // it will forward the local access token to the client side;
            }
        )
    );
} catch (e) {
    console.log(e);
}

// add middlewares
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

// start express server on port
app.listen(APPLICATION_PORT, () => {
    console.log('server started on port ' + APPLICATION_PORT);
    console.log('You can access it via ' + APPLICATION_URL + ':' + APPLICATION_PORT);
});

// TODO : make this configurable
app.use(
    cors({
        origin: 'http://localhost:9000', // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true // allow session cookie from browser to pass through
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/oauthStatus', (req, res) => {
    const github_client_id = process.env.GITHUB_CLIENT_ID;
    const github_client_secret = process.env.GITHUB_CLIENT_SECRET;
    
    if (github_client_id && github_client_id.length > 1 && github_client_secret && github_client_secret.length > 1) {
        res.json({ oauth: true });
    } else {
        res.json({ oauth: false });
    }
});

app.get('/user', verifyToken, (req, res) => {
    if (req.token === null) {
        res.send(JSON.stringify({ result: 'empty' }));
    } else {
        const narf = jwt.decode(req.token);
        console.log(narf);
        res.send(JSON.stringify(narf));
    }
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        req.token = null;
        next();
    }
}

/** GITHUB OAUTH STUFF**/
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect home.
    /** THIS REQURIES MORE INVESTIGATION, TODO**/
    console.log('LOGIN SUCCESSFULL');
    res.redirect(`http://localhost:9000/loggedIn/${req.user.accessToken}`);
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
