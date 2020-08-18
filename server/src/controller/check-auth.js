const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded.username;
        res.status(200).json({ 
            username : decoded.username,
            user_id : decoded.user_id
        })
    } catch (error) {
        res.status(200).json(false)
    }
}