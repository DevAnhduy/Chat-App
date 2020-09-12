const Room_Model = require('src/models/chat_room');
const File_Model = require('src/models/file');
const User_Model = require('src/models/user');
const Message_Service = require('src/utils/message_service');
const Message_Query = require('src/utils/message_query');
const AppError = require('src/utils/app_error');
const moment = require('moment');
const date_now = moment().format('YYYY-MM-DD');
const logger = require('src/utils/logger');
const factory = require('src/controller/handle_factory');
const catch_async = require('src/utils/catch_async');

exports.create_room = (req,res,next) => {
    req.body.admin = req.user_id;
    factory.create_one(Room_Model)(req,res,next)
}
exports.get_room = factory.get_one(Room_Model);

exports.update_room = factory.update_one(Room_Model);

exports.delete_room = factory.delete_one(Room_Model);

exports.get_all_rooms = factory.get_all(Room_Model);

exports.get_all_message = catch_async( async(req,res,next) => {
    const room_id = req.params.id;
    const store_data = room_id;
    const message_query = new Message_Query(store_data, 'room',req.query);
    const messages = message_query.paginate().limit().sort();
    if (messages)
        res.status(200).json({
            status: 'success',
            results: messages.length,
            messages: messages.data
        })
})
exports.create_message = catch_async( async(req, res, next) => {
    const room_id = req.params.id;
    const path_room_folder = `${__root}/data/messages/user_to_room/${room_id}`
    const new_message = {
        content: {
            sender: req.user_id,
            room_id: room_id,
            content: req.body.content,
            sent_date: moment().format('YYYY-MM-DD, h:mm:ss'),
            timestamp: Date.now()
        },
        store_path: path_room_folder,
        file_names: [`${date_now}.json`],
    };
    const message_service = new Message_Service(new_message);
    message_service.write_message(response => {
        if(response)
            res.status(201).json({ 
                status: 'success'
            })
        else return next(new AppError('Cannot create message'), 500)
    })
})
exports.update_message = catch_async( async(req,res,next) => {
    const sender = req.user_id;
    const room_id = req.params.id;
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
        if (response)
            res.status(200).json({
                status: 'success'
            })
        else return next(new AppError('Cannot update message'),500)
    })
})
exports.delete_message = catch_async( async(req,res,next) => {
    const sender = req.user_id;
    const room_id = req.params.id;
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
            res.status(200).json({
                status: 'success'
            })
        else return next(new AppError('Cannot delete message',500))
    })
})
exports.upload_file = catch_async( async(req,res,next) => {
    const new_file_uploaded = new File_Model({
        _id: req.file.file_id,
        name: req.file.originalname,
        sender: req.user_id,
        receiver: {
            room_id: req.params.id
        },
        url: req.file.path,
        file_type: req.file.mimetype
    })
    new_file_uploaded.save()
        .then(result => res.status(201).json({
            status: 'success',
            result
        }))
        .catch(error => {
            logger.error(error);
            return next(new AppError(error,500))
        })
})
exports.get_all_file = factory.get_all(File_Model)