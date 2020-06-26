const body_parser_loader = require('./body_parser');
const mongodb_loader = require('./mongodb');
const routes_loader = require('./routes');

module.exports = async (app) => {
    await body_parser_loader(app);
    await mongodb_loader();
    await routes_loader(app);
}