const path = require('path');
const winston = require('winston');
const moment = require('moment');
require('dotenv').config({ path: __root + '/.env' });

const logger = winston.createLogger({
    level : 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    transports : [
        new winston.transports.File({
            filename: path.resolve(__root, `./logs/${moment().format('DD-MM-YYYY')}.log`),
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