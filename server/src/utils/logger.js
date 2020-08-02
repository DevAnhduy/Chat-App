const path = require('path');
const winston = require('winston');
const moment = require('moment');
require('winston-daily-rotate-file');
require('dotenv').config({ path: __root + '/.env' });

const transport = new (winston.transports.DailyRotateFile)({
    filename: path.join(__root,'/logs/%DATE%.log'),
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true
});

const logger = winston.createLogger({
    level : 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    transports : [
        transport
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
        logger.error(message)
    }
}

module.exports = logger;