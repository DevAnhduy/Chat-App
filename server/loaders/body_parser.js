const body_parser = require('body-parser');

module.exports = async (app) => {
    app.use(body_parser.urlencoded({ extended: false }));
    app.use(body_parser.json());
    app.use(body_parser.raw());
}