require('../config/constant');
require('app-module-path').addPath(__root);
require('dotenv').config();

const body_parser_loader = require('loaders/body_parser.js');
const mongodb_loader = require('loaders/mongodb.js');
const routes_loader = require('loaders/routes');
const cookie_parser_loader = require('loaders/cookie-parser');
const cors = require('loaders/cors');
//const cors = require('cors');

module.exports = async (app) => {
    Promise.all([
        cors(app),
        cookie_parser_loader(app),
        body_parser_loader(app),
        mongodb_loader(),
        routes_loader(app)
    ])
}