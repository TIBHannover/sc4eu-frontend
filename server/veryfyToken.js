const { Cookies } = require('react-cookie');

module.exports = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        console.log('>>> WE HAVE A TOKEN  ');
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        return next();
    }

    const cookies = new Cookies(req.headers.cookie);
    const token = cookies.get('token');
    if (token) {
        req.token = token;
        return next();
    }


    console.log('WE DONT HAVE A TOKEN HERE oO ');
    return res.send(JSON.stringify({ error: 'No Token Provided' }));
};
