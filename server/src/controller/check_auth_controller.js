const jwt = require('jsonwebtoken');

module.exports = {
    check_auth : (req,res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded.username;
            res.status(200).json({ 
                username : decoded.username,
                user_id : decoded.user_id
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(false)
        }
    }
}