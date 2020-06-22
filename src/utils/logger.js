const path = require('path');
const winston = require('winston');
require('dotenv').config({ path: root_path + '/.env' });

const logger = winston.createLogger({
    level : 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    transports : [
        new winston.transports.File({
            filename: path.resolve(root_path,'./logs/error.log'),
            level: 'error'
        })
    ]
})

if(process.env.NODE_ENV !== 'production'){
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    )
}

logger.stream = {
    write(message){
        logger.info(message)
    }
}

module.exports = logger;