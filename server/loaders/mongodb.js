const mongoose = require('mongoose');
const logger = require('src/utils/logger');
const mongodb_config = require(__root + '/config/mongodb')

module.exports = async () =>{
    try {
        mongoose.connect(mongodb_config.url,mongodb_config.options );
    }catch(err){
        logger.error(err);
    }
    mongoose.Promise = global.Promise;
} 