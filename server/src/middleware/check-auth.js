const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.cookies.JWT;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.username = decoded.username; 
        req.user_id = decoded.user_id;    
        next();
    } catch (error) {
        res.status(404).json({message : 'User not found !'})
    }
}