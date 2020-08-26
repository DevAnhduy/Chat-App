const error_handle_controller = require('src/controller/error_controller');

module.exports = (app) => { 
    app.use(error_handle_controller)
}