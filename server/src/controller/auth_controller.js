const jwt = require('jsonwebtoken');
const catch_aysnc = require('src/utils/catch_async');
const AppError = require('src/utils/app_error');
const User_Model = require('src/models/user');
const factory = require('src/controller/handle_factory');

// Get information token from env
const sign_token = id => {
    return jwt.sign({id},process.env.JWT_KEY,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

//Create and send token
const create_send_token = (user,status_code,res) => {
    const token = sign_token(user._id);
    const cookie_options = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if(process.env.NODE_ENV === 'production') cookie_options.secure = true;

    res.cookie('jwt',token,cookie_options);

    //Remove password from output
    user.password = undefined;

    res.status(status_code).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

//Login
exports.login = catch_aysnc(async (req,res,next) => {
    const { email,password } = req.body;
    //Check if email & Password exists
    if(!email || !password) 
        return next(new AppError('Please provide email and password',400));
    //Check if user exist and password is correct
    const user = await User_Model.findOne({ username }).select('+password');
    if(!user || !(await user.correctPassword(password,user.password)))
        return next(new AppError('Incorrect email or password',401))
    //If everything ok
    create_send_token(user,200, res);
})

//Protect if user not login donot permiss access
exports.protect_user = factory.protect(User_Model);

//Allow user to access route
exports.restrictTo = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action',403))
        }
    }
}

