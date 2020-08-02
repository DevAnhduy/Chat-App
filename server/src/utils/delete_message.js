const fs = require('fs');
const path = require('path');
const logger = require('src/utils/logger');

module.exports = (message = { content: {}, store_path: '', file_names: [] }, callback ) => {
    let path_file_delete = '';
    const preparing_to_delete = new Promise((resolve, rejects) => {
        if (fs.existsSync(message.store_path)) {    //Exist folder store message
            message.file_names.forEach((file_name, index) => {
                const path_file = path.join(message.store_path, file_name);
                if (fs.existsSync(path_file)) {    //Exist file message
                    path_file_delete = path_file;
                    const all_messages = require(path_file_delete);
                    for (let i = 0; i < all_messages.length; i++) { //Loop all message in file
                        if (message.content.timestamp === all_messages[i].timestamp) { //Check exist message by timestamp
                            //all_messages[i] = message.content;
                            all_messages.splice(i,1);
                            resolve(JSON.stringify(all_messages, null, 4));
                            break;
                        }
                    }
                }
                if (path_file_delete == '' && index == message.file_names.length - 1) {
                    rejects('Cannot found file')
                }
            });
        }
        else {  //Not exist folder store message
            rejects('Cannot found folder')
        }
    })
    //Write file
    preparing_to_delete
        .then((data) => {
            if (data) {
                fs.writeFile(path_file_delete, data, 'utf8', (err) => {
                    if (err) {
                        logger.error(err);
                        callback(false);
                    }
                    else
                        callback(true);
                })
            }
        })
        .catch((err) => {
            logger.error(err);
            callback(false);
        })
}