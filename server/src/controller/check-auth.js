const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    try {
        const token = req.cookies.JWT;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded.username;
        res.status(200).json({ is_auth: true })
    } catch (error) {
        res.status(200).json({ is_auth: false })
    }
}