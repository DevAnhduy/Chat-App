const moment = require('moment');
const date_now = moment().format('DD-MM-YYYY');
const fs = require('fs');
const path = require('path')
const File_Model = require('src/models/file');
const logger = require('src/utils/logger');
const write_message = require('src/utils/write_message');
const edit_message = require('src/utils/edit_message');
const delete_message = require('src/utils/delete_message');

module.exports = {
    get_recent_messages : (req, res) => {
        const receiver_id = req.params.receiver_id;
        const number_of_day = req.query.offset;
        const user_id = req.user_id;
        const path_user_folder = `${__root}/data/messages/user_to_user`;
        fs.readdir(path_user_folder, (err, folders_msg_users) => {
            if (err) {
                logger.error(err);
                res.status(500).json({ error: 'Something error' });
                return;
            }
            else {
                try {
                    const number_day_after_skip = folders_msg_users.length - number_of_day ;
                    if (number_day_after_skip >= 0) {
                        for (let i = number_day_after_skip; i >= 0; i--) {
                            const path_file_user_receiver = `${path_user_folder}/${folders_msg_users[i]}/${user_id}_${receiver_id}.json`;
                            const path_file_receiver_user = `${path_user_folder}/${folders_msg_users[i]}/${receiver_id}_${user_id}.json`;
                            let path_file_exists = "";
                            if (fs.existsSync(path_file_user_receiver)) 
                                path_file_exists = path_file_user_receiver;
                            if (fs.existsSync(path_file_receiver_user))
                                path_file_exists = path_file_receiver_user;
                            if (path_file_exists) {
                                const data_file_msg = require(path_file_exists);
                                res.status(200).json(data_file_msg);
                                return;
                            }
                        }
                    }
                    else {
                        res.status(404).json({ error: 'Not found ' });
                    }
                } catch (err) {
                    console.log(err)
                    res.status(404).json({ error: 'Not found' })
                }
            }
        })
    },
    get_all_messages : (req, res) => {
        const user_id = req.user_id;
        const receiver_id = req.params.receiver_id;
        const path_user_folder = `${__root}/data/messages/user_to_user`;
        fs.readdir(path_user_folder, (err, date_folders) => {
            if (err) {
                logger.error(err);
                res.status(404).json({ error: 'Not found' });
                return;
            }
            else {
                const all_msg_user_receiver = {};
                date_folders.forEach(date_folder => {
                    const path_file_user_receiver = `${path_user_folder}/${date_folder}/${user_id}_${receiver_id}.json`;
                    const path_file_receiver_user = `${path_user_folder}/${date_folder}/${receiver_id}_${user_id}.json`;
                    let path_file_exists = '';
                    if (fs.existsSync(path_file_user_receiver)) {
                        path_file_exists = path_file_user_receiver;
                    }

                    if (fs.existsSync(path_file_receiver_user))
                        path_file_exists = path_file_receiver_user;

                    if (path_file_exists) {
                        const data_file_msg = require(path_file_exists);
                        all_msg_user_receiver[date_folder] = data_file_msg;
                    }
                })
                res.status(200).json(all_msg_user_receiver);
            }
        })
    },
    create_message : (req, res) => {
        const sender = req.user_id;
        const receiver = req.params.receiver_id;
        const new_message = {
            content: {
                sender: sender,
                receiver: receiver,
                content: req.body.content,
                sent_date: moment().format('DD-MM-YYYY, h:mm:ss'),
                timestamp: Date.now()
            },
            store_path: `${__root}/data/messages/user_to_user/${date_now}`,
            file_names: [
                `${sender}_${receiver}.json`,
                `${receiver}_${sender}.json`
            ]
        }
        write_message(new_message, (response) => {
            if (response)
                res.status(201).json({ send_message_success: true })
            else
                res.status(500).json({ send_message_success: false })
        })
    },
    edit_message : (req, res) => {
        const sender = req.user_id;
        const receiver = req.params.receiver_id;
        const message = req.body;
        const sent_day = message.sent_date.split(',')[0];
        const message_updated = {
            content: {
                sender,
                receiver,
                ...message
            },
            store_path: `${__root}/data/messages/user_to_user/${sent_day}`,
            file_names: [
                `${sender}_${receiver}.json`,
                `${receiver}_${sender}.json`
            ]
        }
        edit_message(message_updated, (response) => {
            if (response)
                res.status(200).json({ edit_message_success: true })
            else
                res.status(500).json({ edit_message_success: false })
        })
    },
    delete_message : (req, res) => {
        const sender = req.user_id;
        const receiver = req.params.receiver_id;
        const message = req.body;
        const sent_day = message.sent_date.split(',')[0];
        const message_deleted = {
            content: {
                sender,
                receiver,
                ...message
            },
            store_path: `${__root}/data/messages/user_to_user/${sent_day}`,
            file_names: [
                `${sender}_${receiver}.json`,
                `${receiver}_${sender}.json`
            ]
        }
        delete_message(message_deleted, (response) => {
            if (response)
                res.status(200).json({ edit_message_success: true })
            else
                res.status(500).json({ edit_message_success: false })
        })
    },
    upload_file : (req, res) => {
        const new_file_uploaded = new File_Model({
            _id: req.file.file_id,
            name: req.file.originalname,
            sender: req.user_id,
            receiver: {
                receiver_id: req.params.receiver_id
            },
            url: req.file.path,
            file_type: req.file.mimetype
        })
        new_file_uploaded.save()
            .then(result => res.status(201).json(result))
            .catch(error => {
                logger.error(error);
                res.status(500).json(error);
            })
    },
    get_all_file : (req, res) => {
        File_Model.find({ 'receiver.receiver_id': req.params.receiver_id })
            .exec()
            .then(files => {
                if (files)
                    res.status(200).json(files);
                else
                    res.status(404).json({ error: 'Not found' })
            })
            .catch(err => {
                logger.error(err);
                res.status(500).json({ error: err })
            })
    }
}