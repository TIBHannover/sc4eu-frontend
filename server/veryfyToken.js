module.exports = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        console.log('>>> WE HAVE A TOKEN  ');
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        // Forbidden
        console.log('WE DONT HAVE A TOKEN HERE oO ');
        res.send(JSON.stringify({ error: 'No Token Provided' }));
    }
};
