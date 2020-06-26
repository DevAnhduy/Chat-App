const jwt = require('jsonwebtoken');
const path = require('path');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.sendFile(path.join(root_path,'./public/login.html'))
        //res.status(404).json({message : 'User not found !'})
    }
}