const user_route = require('src/routes/user');
const chat_user_route = require('src/routes/chat_user');
const chat_room_route = require('src/routes/chat_room');
const check_auth_route = require('src/routes/check-auth');

module.exports = async (app) => {
    await app.use('/users',user_route);
    await app.use('/chat/users/:receiver_id',chat_user_route);
    await app.use('/chat/rooms',chat_room_route);
    await app.use('/check-auth',check_auth_route);
}