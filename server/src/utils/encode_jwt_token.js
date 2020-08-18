const jwt = require('jsonwebtoken');

module.exports = (jwt_token) => {
    const token = jwt_token.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return {
        username: decoded.username,
        user_id: decoded.user_id
    }
}