const cookie_parser = require('cookie-parser');

module.exports = async (app) => {
    app.use(cookie_parser());
}