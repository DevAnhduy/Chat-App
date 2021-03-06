const moment = require('moment');
const date_now = moment().format('YYYY-MM-DD');
const fs = require('fs');
const File_Model = require('src/models/file');
const User_Model = require('src/models/user');
const logger = require('src/utils/logger');
const Message_Service = require('src/utils/message_service');
const Message_Query = require('src/utils/message_query');
const excelJS = require('exceljs');
const factory = require('src/controller/handle_factory');
const catch_async = require('src/utils/catch_async');
const AppError = require('src/utils/app_error');

exports.get_all_messages = catch_async(async(req,res,next) => {
    const receiver_id = req.params.id;
    const user_id = req.user_id;
    const store_data = [`${user_id}_${receiver_id}.json`,`${receiver_id}_${user_id}.json`];
    const message_query = new Message_Query(store_data,'user',req.query);
    const messages = message_query.paginate().limit().sort()
    if(messages){
        res.status(200).json({
            status: 'success',
            results: messages.length,
            messages: messages.data
        })
    }
    else return next(new AppError('Cannot found any message',404))
})

exports.create_message = catch_async(async(req,res,next) => {
    console.log("Create message")
    const sender_id = req.user_id;
    const receiver_id = req.params.id;
    const new_message = {
        content: {
            sender_id,
            receiver_id,
            content : req.body.content,
            sent_date: moment().format('YYYY-MM-DD, h:mm:ss'),
            timestamp: Date.now()
        },
        store_path: `${__root}/data/messages/user_to_user/${date_now}`,
        file_names: [
            `${sender_id}_${receiver_id}.json`,
            `${receiver_id}_${sender_id}.json`
        ]
    }
    const message_service = new Message_Service(new_message);
    message_service
        .write_message(response => {
            if (response)
                res.status(200).json({
                    status: 'success'
                })
            else return next(new AppError('Cannot create message', 500))
        })           
})

exports.update_message = catch_async(async(req,res,next) => {
    const sender = req.user_id;
    const receiver = req.params.id;
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
    const message_service = new Message_Service(message_updated);
    message_service.edit_message(response => {
        if(response)
            res.status(200).json({
                status: 'success'
            })
        else return next(new AppError('Cannot update message',500))
    })
})

exports.delete_message = catch_async(async(req,res,next) => {
    const sender = req.user_id;
    const receiver = req.params.id;
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
    const message_service = new Message_Service(message_deleted)
    message_service.delete_message(response => {
        if(response)
            res.status(200).json({
                status: 'success'
            })
        else return next(new AppError('Cannot delete message',500))
    })        
})

exports.upload_file = catch_async(async(req,res,next) => {
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
            return next(new AppError(error,500))
        })
})

exports.get_all_file = factory.get_all(File_Model);
