const logger = require('src/utils/logger');
const fs = require('fs');
const path = require('path');

class Message_Service {
    constructor(message = { content: {}, store_path: '', file_names: [] }){
        this.message = message
    }

    write_message(callback){
        let path_file_write = '';
        const preparing_data_to_write = new Promise((resolve, rejects) => {
            if (fs.existsSync(this.message.store_path)) {    //Exist folder store message
                this.message.file_names.forEach((file_name, index) => {
                    const path_file = path.join(this.message.store_path, file_name);
                    if (fs.existsSync(path_file)) {    //Exist file message
                        path_file_write = path_file;
                        const all_messages = require(path_file_write);
                        all_messages.push(this.message.content);
                        resolve(JSON.stringify(all_messages, null, 4));
                    }
                    if (path_file_write == '' && index == this.message.file_names.length - 1) {
                        path_file_write = path_file;
                        resolve(JSON.stringify([this.message.content], null, 4));
                    }
                });
            }
            else {  //Not exist folder store message
                fs.mkdir(this.message.store_path,{recursive: true}, (err) => {
                    if (err)
                        rejects(err);
                    else {
                        path_file_write = path.join(this.message.store_path, this.message.file_names[0])
                        resolve(JSON.stringify([this.message.content], null, 4));
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
                console.log(err)
                logger.error(err);
                callback(false);
            })
    }

    edit_message(callback){
        let path_file_write = '';
        const preparing_to_update = new Promise((resolve, rejects) => {
            if (fs.existsSync(this.message.store_path)) {    //Exist folder store message
                this.message.file_names.forEach((file_name, index) => {
                    const path_file = path.join(this.message.store_path, file_name);
                    if (fs.existsSync(path_file)) {    //Exist file message
                        path_file_write = path_file;
                        const all_messages = require(path_file_write);
                        for (let i = 0; i < all_messages.length; i++) { //Loop all message in file
                            if (this.message.content.timestamp === all_messages[i].timestamp) { //Check exist message by timestamp
                                all_messages[i] = this.message.content;
                                resolve(JSON.stringify(all_messages, null, 4));
                                break;
                            }
                        }
                    }
                    if (path_file_write == '' && index == this.message.file_names.length - 1) {
                        rejects('Cannot found file')
                    }
                });
            }
            else {  //Not exist folder store message
                rejects('Cannot found folder')
            }
        })
        //Write file
        preparing_to_update
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

    delete_message(callback){
        let path_file_delete = '';
        const preparing_to_delete = new Promise((resolve, rejects) => {
            if (fs.existsSync(this.message.store_path)) {    //Exist folder store message
                this.message.file_names.forEach((file_name, index) => {
                    const path_file = path.join(this.message.store_path, file_name);
                    if (fs.existsSync(path_file)) {    //Exist file message
                        path_file_delete = path_file;
                        const all_messages = require(path_file_delete);
                        if(!all_messages.length)
                            rejects('Not found message')
                        for (let i = 0; i < all_messages.length; i++) { //Loop all message in file
                            if (this.message.content.timestamp === all_messages[i].timestamp) { //Check exist message by timestamp
                                //all_messages[i] = message.content;
                                all_messages.splice(i, 1);
                                resolve(JSON.stringify(all_messages, null, 4));
                                break;
                            }
                        }
                    }
                    if (path_file_delete == '' && index == this.message.file_names.length - 1) {
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
}

module.exports = Message_Service;