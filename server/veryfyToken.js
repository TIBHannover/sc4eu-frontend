module.exports = function(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        console.log('WE DONT HAVE A TOKEN HERE oO ');
        res.send(JSON.stringify({ error: 'No Token Provided' }));
    }

    req.token = token;
    next();

};
