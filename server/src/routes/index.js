const user_route = require('src/routes/user');
const chat_user_route = require('src/routes/chat_user');
const chat_room_route = require('src/routes/chat_room');
const check_auth_route = require('src/routes/check-auth');

module.exports = async (app) => {
    Promise.all([
        app.use('/users',user_route),
        app.use('/chat/rooms',chat_room_route),
        app.use('/check-auth',check_auth_route),
        app.use('/chat/users/:id',chat_user_route)
    ])
}