const { client } = require("../jsconfig.json");
const cors = require('cors')

module.exports = async (app) => {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', `${client.host}:${client.port}`);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, Accept, Authorization");
    })
    return app;
}