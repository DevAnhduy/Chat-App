const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.cookies.JWT;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded.username;     
        next();
    } catch (error) {
        res.status(404).json({message : 'User not found !'})
    }
}