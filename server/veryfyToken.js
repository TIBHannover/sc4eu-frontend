 function tokenVerification(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        // Forbidden
        res.send(JSON.stringify({ error: 'No Token Provided' }));
    }
};

module.exports = tokenVerification;