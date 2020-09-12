const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.mobile = decoded.mobile; 
        req.user_id = decoded.user_id; 
        next();
    } catch (error) {
        return next(new AppError(error,404))
    }
}