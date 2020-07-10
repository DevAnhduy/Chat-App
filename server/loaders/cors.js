const client = require('config/client.json');

module.exports = async (app) => {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', `${client.host}:${client.port}` );
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    })
}