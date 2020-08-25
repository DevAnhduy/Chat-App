import AppError from "src/utils/app_error";
const AppError = require('src/utils/app_error');

const handle_cast_error_DB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const handle_duplicate_fields_db = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value ${value}. Please use another value!`;
    return new AppError(message, 400);
}

const handle_validation_error_db = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const handle_jwt_error = () => {
    new AppError('Invalid token. Please log in again', 401);
}

const handle_jwt_expired_error = () => {
    new AppError('Your token has expired! Please log in again !', 401);
}

const send_error_dev = (err,res) => {
    res.status(err.status_code).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const send_error_prod = (err,res) => {
    if(err.is_operational){
        rs.status(err.status_code).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.log('ERROR ',err)

        res.status(500).json({
            status: 'error',
            message: 'Something wrong'
        })
    }
}

module.exports = (err,req,res,next) => {
    err.status_code = err.status_code || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        send_error_dev(err,res)
    }
    else if(process.env.NODE_ENV === 'production'){
        let error = { ...err };
        if(error.name === 'CastError') error = handle_cast_error_DB(error);
        if(error.name === 11000) error = handle_duplicate_fields_db(error);
        if(error.name === 'ValidationError') error = handle_validation_error_db(error);
        if(error.name === 'JsonWebTokenError') error = handle_jwt_error();
        if(error.name === 'TokenExpiredError') error = handle_jwt_expired_error();

        send_error_prod(error,res);
    }
}