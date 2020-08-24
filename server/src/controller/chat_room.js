const mongoose = require('mongoose');
const moment = require('moment');
const date_now = moment().format('DD-MM-YYYY');
const fs = require('fs');
const Room_Model = require('src/models/chat_room');
const File_Model = require('src/models/file');
const logger = require('src/utils/logger');
const Message_Service = require('src/utils/message_service');

module.exports = {
    get_recent_messages : (req, res) => {
        const room_id = req.params.room_id;
        const number_of_days = req.query.offset;
        const path_room_folder = `${__root}/data/messages/user_to_room/${room_id}`;
        fs.readdir(path_room_folder, (err, msg_files) => {
            if (err) {
                logger.error(err);
                res.status(404).json({ error: 'Not found' });
                return;
            }
            else {
                try {
                    const name_file_most_recent = msg_files[msg_files.length - number_of_days];
                    const msg_most_recent = require(path_room_folder + '/' + name_file_most_recent);
                    res.status(200).json(msg_most_recent)
                } catch (err) {
                    res.status(404).json({ error: 'Not found' })
                }
            }
        })
    },
    create_message : (req, res) => {
        const room_id = req.params.room_id;
        const path_room_folder = `${__root}/data/messages/user_to_room/${room_id}`
        const new_message = {
            content: {
                sender: req.user_id,
                sender_name: req.username,
                room_id: room_id,
                content: req.body.content,
                sent_date: moment().format('DD-MM-YYYY, h:mm:ss'),
                timestamp: Date.now()
            },
            store_path: path_room_folder,
            file_names: [`${date_now}.json`],
        };
        const message_service = new Message_Service(new_message);
        message_service.write_message(response => {
            if(response)
                res.status(201).json({ send_message_success: true })
            else
                res.status(500).json({ send_message_success: false })
        })
    },
    edit_message : (req, res) => {
        const sender = req.user_id;
        const room_id = req.params.room_id;
        const message = req.body;
        const sent_day = message.sent_date.split(',')[0];
        const message_updated = {
            content: {
                sender,
                room_id,
                ...message
            },
            store_path: `${__root}/data/messages/user_to_room/${room_id}`,
            file_names: [`${sent_day}.json`]
        }
        const message_service = new Message_Service(message_updated)
        message_service.edit_message(response => {
            if(response)
                res.status(200).json({ edit_message_success: true })
            else
                res.status(500).json({ edit_message_success: false })
        })
    },
    delete_message : (req, res) => {
        const sender = req.user_id;
        const room_id = req.params.room_id;
        const message = req.body;
        const sent_day = message.sent_date.split(',')[0];
        const message_deleted = {
            content: {
                sender,
                room_id,
                ...message
            },
            store_path: `${__root}/data/messages/user_to_room/${room_id}`,
            file_names: [`${sent_day}.json`]
        }
        const message_service = new Message_Service(message_deleted);
        message_service.delete_message(response => {
            if(response)
                res.status(200).json({edit_message_success: true})
            else
                res.status(500).json({edit_message_success: false})
        })
    },
    upload_file : (req, res) => {
        const new_file_uploaded = new File_Model({
            _id: req.file.file_id,
            name: req.file.originalname,
            sender: req.user_id,
            receiver: {
                room_id: req.params.room_id
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
        File_Model.find({ 'receiver.room_id': req.params.room_id })
            .exec()
            .then(files => {
                if (files)
                    res.status(200).json(files);
                else
                    res.status(404).json({ error: 'Not found' })
            })
            .catch(err => {
                logger.error(err);
                res.status(500).json(err);
            })
    },
    create_room : (req, res) => {
        const new_room = new Room_Model({
            _id: mongoose.Types.ObjectId(),
            avatar: '',
            name: req.body.room_name,
            admin: req.user_id,
            members: []
        })
        new_room.save()
            .then(result => {
                res.status(201).json(result)
            })
            .catch(error => {
                logger.error(error)
                res.status(500).json('Something error ! Please try again')
            })
    },
    get_all_rooms : (req, res) => {
        Room_Model.find({
            $or: [
                { admin: req.user_id },
                { members: req.user_id }
            ]
        })
            .exec()
            .then(rooms => {
                res.status(200).json(rooms)
            })
            .catch(error => {
                logger.error(error);
                console.log(error)
                res.status(500).json({ error: 'Something error ! Please try again !' })
            })
    },
    get_room : (req, res) => {
        Room_Model.findById(req.params.room_id)
            .select('avatar name admin members')
            .exec()
            .then(room => {
                res.status(200).json(room)
            })
            .catch(error => {
                logger.error(error)
                res.status(500).json({ error: 'Something error ! Please try again !' })
            })
    },
    update_room_name : (req, res) => {
        Room_Model.updateOne(
            { _id: req.params.room_id },
            {
                $set: {
                    name: req.body.room_name,
                }
            })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                logger.error(error)
                res.status(500).json({ error: 'Something error ! Please try again !' })
            })
    },
    delete_room : (req, res) => {
        Room_Model.deleteOne({ _id: req.params.room_id })
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                logger.error(error);
                res.status(500).json({ error: 'Something error ! Please try again !' })
            })
    }
}