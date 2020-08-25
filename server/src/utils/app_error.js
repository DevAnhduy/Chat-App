class AppError extends Error {
    constructor(message, status_code){
        super(message);

        this.status_code = status_code;
        this.status = `${status_code}`.startsWith('4') ? 'fail' : 'error';
        this.is_operational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;