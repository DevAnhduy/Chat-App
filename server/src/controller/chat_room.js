const mongoose = require('mongoose');

const Room_Model = require('../models/chat_room');
const Message_Model = require('../models/message');
const logger = require('../utils/logger');

exports.get_all_messages = (req,res) => {
    Room_Model.findById(req.params.room_id)
        .select('messages')
        .populate('messages')
        .exec()
        .then(messages => {
            res.status(200).json(messages)
        })
        .catch(error => {
            logger.error(error);
            res.status(500).json({error : 'Something error ! Please try again !'})
        })
}
exports.create_message = (req,res) => {
    const new_message = new Message_Model({
        _id: mongoose.Types.ObjectId(),
        sender: req.body.sender_id,
        content: req.body.content,
        room_id: req.params.room_id
    });
    new_message.save()
        .then(result => console.log(result))
        .catch(error => logger.error(error))
    
    Room_Model.updateOne(
        {_id : req.params.room_id},
        {
            $push:{
                messages : {
                    _id: new_message._id
                }
            }
        })
        .exec()
        .then(result => res.status(200).json(result))
        .catch(error => {
            logger.error(error);
            res.status(500).json(error);
            //res.status(500).json({error : 'Something error ! Please try again !' })
        })
}
exports.create_room = (req,res) => {
    const new_room = new Room_Model({
        _id : mongoose.Types.ObjectId(),
        avatar: '',
        name: req.body.room_name,
        admin : req.user_id,
        members: [],
        messages: []
    })
    new_room.save()
        .then(result => {
            res.status(201).json(result._id)
        })
        .catch(error => {
            logger.error(error)
            res.status(500).json('Something error ! Please try again')
        })
}
exports.get_all_rooms = (req,res) => {
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
            res.status(500).json({ error: 'Something error ! Please try again !' })
        })
}
exports.get_room = (req,res) => {
    Room_Model.findById(req.params.room_id)
        .select('avatar name admin members')
        .exec()
        .then(room => {
            res.status(200).json(room)
        })
        .catch(error => {
            logger.error(error)
            res.status(500).json({error : 'Something error ! Please try again !'})
        })
}
exports.update_room = (req,res) => {
    Room_Model.updateOne(
        {_id: req.params.room_id},
        {
            $set : {
                name : req.body.name,
            }
        })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            logger.error(error)
            res.status(500).json({error : 'Something error ! Please try again !'})
        })
}
exports.delete_room = (req,res) => {
    Room_Model.deleteOne({_id: req.params.room_id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            logger.error(error);
            res.status(500).json({error : 'Something error ! Please try again !'})
        })
}