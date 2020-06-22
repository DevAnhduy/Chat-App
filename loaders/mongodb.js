const mongoose = require('mongoose');
const logger = require('../src/utils/logger');
const mongodb_config = require(root_path + '/config/mongodb')

module.exports = async () =>{
    try {
        mongoose.connect(mongodb_config.url,mongodb_config.options );
    }catch(err){
        logger.error(err);
    }
    mongoose.Promise = global.Promise;
} 