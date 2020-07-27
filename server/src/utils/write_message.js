const fs = require('fs');
const path = require('path');
const logger = require('src/utils/logger')

module.exports = (new_message = {content:{},store_path:'',file_names:[]},callback) => {
    let path_file_write = '';
    const preparing_data_to_write = new Promise((resolve, rejects) => {
        if (fs.existsSync(new_message.store_path)) {    //Exist folder store message
            new_message.file_names.forEach((file_name,index) => {
                const path_file = path.join(new_message.store_path, file_name);
                if (fs.existsSync(path_file)) {    //Exist file message
                    path_file_write = path_file;
                    const all_messages = require(path_file_write);
                    all_messages.push(new_message.content);
                    resolve(JSON.stringify(all_messages, null, 4));
                }
                if(path_file_write == '' && index == file_names.length){
                    resolve(JSON.stringify([new_message.content], null, 4));
                }
            });
        }
        else {  //Not exist folder store message
            fs.mkdir(new_message.store_path, (err) => {
                if (err)
                    rejects(err);
                else {
                    path_file_write = path.join(new_message.store_path,new_message.file_names[0])
                    resolve(JSON.stringify([new_message.content], null, 4));
                }
            })
        }
    })
    //Write file
    preparing_data_to_write
        .then((data) => {
            if (data) {
                fs.writeFile(path_file_write, data, 'utf8', (err) => {
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