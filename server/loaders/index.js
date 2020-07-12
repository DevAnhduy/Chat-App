require('../config/constant');
require('dotenv').config();
//
const body_parser_loader = require('loaders/body_parser.js');
const mongodb_loader = require('loaders/mongodb.js');
const routes_loader = require('loaders/routes');
const cookie_parser_loader = require('loaders/cookie-parser');
const cors = require('loaders/cors');

module.exports = async(app) => {
    await cookie_parser_loader(app);
    await body_parser_loader(app);
    await mongodb_loader();
    await routes_loader(app);
    await cors(app);
}