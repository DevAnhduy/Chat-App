const mongoose = require('mongoose');
const moment = require('moment');
const date_now = moment().format('DD-MM-YYYY');
const fs = require('fs');
const Room_Model = require('src/models/chat_room');
const File_Model = require('src/models/file');
const logger = require('src/utils/logger');
const Message_Service = require('src/utils/message_service');
const catch_async = require('src/utils/catch_async');
const Mongodb_Query = require('src/utils/mongodb_query');
const factory = require('src/controller/handle_factory');

exports.create_room = (req,res,next) => {
    req.body.admin = req.user_id;
    factory.create_one(Room_Model)(req,res,next)
}

exports.get_room = factory.get_one(Room_Model);

exports.get_all_rooms = factory.get_all(Room_Model);

exports.update_room = factory.update_one(Room_Model);

exports.delete_room = factory.delete_one(Room_Model);
// module.exports = {
//     get_recent_messages : (req, res) => {
//         const room_id = req.params.room_id;
//         const number_of_days = req.query.offset;
//         const path_room_folder = `${__root}/data/messages/user_to_room/${room_id}`;
//         fs.readdir(path_room_folder, (err, msg_files) => {
//             if (err) {
//                 logger.error(err);
//                 res.status(404).json({ error: 'Not found' });
//                 return;
//             }
//             else {
//                 try {
//                     const name_file_most_recent = msg_files[msg_files.length - number_of_days];
//                     const msg_most_recent = require(path_room_folder + '/' + name_file_most_recent);
//                     res.status(200).json(msg_most_recent)
//                 } catch (err) {
//                     res.status(404).json({ error: 'Not found' })
//                 }
//             }
//         })
//     },
//     create_message : (req, res) => {
//         const room_id = req.params.room_id;
//         const path_room_folder = `${__root}/data/messages/user_to_room/${room_id}`
//         const new_message = {
//             content: {
//                 sender: req.user_id,
//                 sender_name: req.username,
//                 room_id: room_id,
//                 content: req.body.content,
//                 sent_date: moment().format('DD-MM-YYYY, h:mm:ss'),
//                 timestamp: Date.now()
//             },
//             store_path: path_room_folder,
//             file_names: [`${date_now}.json`],
//         };
//         const message_service = new Message_Service(new_message);
//         message_service.write_message(response => {
//             if(response)
//                 res.status(201).json({ send_message_success: true })
//             else
//                 res.status(500).json({ send_message_success: false })
//         })
//     },
//     edit_message : (req, res) => {
//         const sender = req.user_id;
//         const room_id = req.params.room_id;
//         const message = req.body;
//         const sent_day = message.sent_date.split(',')[0];
//         const message_updated = {
//             content: {
//                 sender,
//                 room_id,
//                 ...message
//             },
//             store_path: `${__root}/data/messages/user_to_room/${room_id}`,
//             file_names: [`${sent_day}.json`]
//         }
//         const message_service = new Message_Service(message_updated)
//         message_service.edit_message(response => {
//             if(response)
//                 res.status(200).json({ edit_message_success: true })
//             else
//                 res.status(500).json({ edit_message_success: false })
//         })
//     },
//     delete_message : (req, res) => {
//         const sender = req.user_id;
//         const room_id = req.params.room_id;
//         const message = req.body;
//         const sent_day = message.sent_date.split(',')[0];
//         const message_deleted = {
//             content: {
//                 sender,
//                 room_id,
//                 ...message
//             },
//             store_path: `${__root}/data/messages/user_to_room/${room_id}`,
//             file_names: [`${sent_day}.json`]
//         }
//         const message_service = new Message_Service(message_deleted);
//         message_service.delete_message(response => {
//             if(response)
//                 res.status(200).json({edit_message_success: true})
//             else
//                 res.status(500).json({edit_message_success: false})
//         })
//     },
//     upload_file : (req, res) => {
//         const new_file_uploaded = new File_Model({
//             _id: req.file.file_id,
//             name: req.file.originalname,
//             sender: req.user_id,
//             receiver: {
//                 room_id: req.params.room_id
//             },
//             url: req.file.path,
//             file_type: req.file.mimetype
//         })
//         new_file_uploaded.save()
//             .then(result => res.status(201).json(result))
//             .catch(error => {
//                 logger.error(error);
//                 res.status(500).json(error);
//             })

//     },
//     get_all_file : (req, res) => {
//         File_Model.find({ 'receiver.room_id': req.params.room_id })
//             .exec()
//             .then(files => {
//                 if (files)
//                     res.status(200).json(files);
//                 else
//                     res.status(404).json({ error: 'Not found' })
//             })
//             .catch(err => {
//                 logger.error(err);
//                 res.status(500).json(err);
//             })
//     },
// }