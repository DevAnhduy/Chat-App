const cookie = require('cookie');
const jwt = require('jsonwebtoken');

module.exports = (str_cookie) => {
    const obj_cookie =  cookie.parse(str_cookie);
    const token = obj_cookie.JWT;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return {
        username: decoded.username,
        user_id: decoded.user_id
    }
}