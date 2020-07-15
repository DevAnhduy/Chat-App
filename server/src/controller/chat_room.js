const mongoose = require('mongoose');
const moment = require('moment');
const date_now = moment().format('DD-MM-YYYY');
const fs = require('fs');

const Room_Model = require('src/models/chat_room');
const Message_Model = require('src/models/message');
const File_Model = require('src/models/file');
const logger = require('src/utils/logger');

exports.get_recent_messages_in_room = (req,res) => {
    const room_id = req.params.room_id;
    const path_room_folder = `${__root}/data/messages/user_to_room/${room_id}`;
    fs.readdir(path_room_folder, (err, msg_files) => {
        if (err) {
            logger.error(err);
            res.status(404).json({ error: 'Not found' });
            return;
        }
        else {
            try{
                let name_file_most_recent = '';
                msg_files.forEach(msg_file => {
                    const msg_file_stat = fs.statSync(path_room_folder + '/' + msg_file);
                    let most_recent_time = '';
                    if (!most_recent_time) { //Init most_recent_file
                        most_recent_file = msg_file_stat.ctime.getTime(); //Set most recent time = first file
                        name_file_most_recent = msg_file;   // Set name file
                    }
                    else {
                        if (most_recent_time < msg_file_stat.ctime.getTime()) { // If max time < file current time
                            most_recent_time = msg_file_stat;   //Set most recent time = file current time
                            name_file_most_recent = msg_file    //Set name file
                        }
                    }
                })
                const msg_most_recent = require(path_room_folder + '/' + name_file_most_recent);
                res.status(200).json(msg_most_recent)
            } catch(err){
                res.status(500).json({error: err})
            }
        }
    }) 
}
exports.get_messages_user_to_user = (req,res) => {
    const user_id = req.user_id;
    const receiver_id = req.params.receiver_id;
    const path_user_folder = `${__root}/data/messages/user_to_user`;
    fs.readdir(path_user_folder,(err,date_folders) => {
        if(err) {
            logger.error(err);
            res.status(404).json({error: 'Not found'});
            return;
        }
        else {
            const all_msg_user_receiver = {};
            date_folders.forEach(date_folder => {
                const path_file_user_receiver = `${path_user_folder}/${date_folder}/${user_id}_${receiver_id}.json`;
                const path_file_receiver_user = `${path_user_folder}/${date_folder}/${receiver_id}_${user_id}.json`;
                let path_file_exists = '';
                if (fs.existsSync(path_file_user_receiver)){
                    path_file_exists = path_file_user_receiver;
                } 
                    
                if (fs.existsSync(path_file_receiver_user))
                    path_file_exists = path_file_receiver_user;
                
                if(path_file_exists){
                    const data_file_msg = require(path_file_exists);
                    all_msg_user_receiver[date_folder] = data_file_msg;
                }
            })
            res.status(200).json(all_msg_user_receiver);
        }
    })
}
exports.create_message_to_room = (req,res) => {
    const room_id = req.params.room_id;
    const new_message = {
        sender: req.user_id,
        room_id: room_id,
        content: req.body.content,
        sent_date: moment().format('DD-MM-YYYY, h:mm:ss')
    };
    const path_room_folder = `${__root}/data/messages/user_to_room/${room_id}`
    const path_file_message_today = `${__root}/data/messages/user_to_room/${room_id}/${date_now}.json`;
    let data_message_will_write;
    // Check folder & file exist
    const preparing_data_to_write = new Promise((resolve,rejects) => {
        if (fs.existsSync(path_room_folder)) {    //Exist folder room
            if (fs.existsSync(path_file_message_today)) {    //Exist file
                const file_message_today = require(path_file_message_today);
                file_message_today.push(new_message);
                data_message_will_write = JSON.stringify(file_message_today, null, 4);
                resolve(true);
            }
            else {  // Not exist file
                data_message_will_write = JSON.stringify([new_message], null, 4);
                resolve(true);
            }
        }
        else {  //Not exist folder room
            fs.mkdir(path_room_folder, (err) => {
                if (err) 
                    rejects(err)
                else{
                    data_message_will_write = JSON.stringify([new_message]);
                    resolve(true)
                }    
            })
        }
    })
    
    //Write file
        preparing_data_to_write
        .then((done) => {
            if(done){
                fs.writeFile(path_file_message_today, data_message_will_write, 'utf8', (err) => {
                    if (err) {
                        logger.error(err);
                        res.status(500).json({ send_message_success: false });
                    }
                    else {
                        res.status(201).json({ send_message_success: true });
                    }
                })
            }
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({ send_message_success: false });
        })
        

}
exports.create_message_to_user = (req,res) => {
    const sender = req.user_id;
    const receiver = req.params.receiver_id;
    const new_message = {
        sender: sender,
        receiver: receiver,
        content: req.body.content,
        sent_date: moment().format('DD-MM-YYYY, h:mm:ss')
    }
    const path_folder_today = `${__root}/data/messages/user_to_user/${date_now}`;
    let path_file_today = '';
    let data_message_will_write = '';
    
    const create_folder_today = (preparing_data_to_write) => {
        try {
            if (!fs.existsSync(path_folder_today)) {
                fs.mkdirSync(path_folder_today);
                preparing_data_to_write();
            }
            else
                preparing_data_to_write();
                
        }
        catch(err){
            logger.error(err);
            res.status(500).json({error: 'Error'});
            return;
        }   
    }
    const preparing_data_to_write = (write_file) => {
        fs.readdir(path_folder_today, (err, msg_files) => { //Read folder with date = today
            if (err) {
                logger.error(err);
                res.status(500).json({ error: err });
                return;
            }
            let file_user_to_user_today = ''
            msg_files.forEach(msg_file => { //Check exist file
                if (msg_file === `${sender}_${receiver}.json` || msg_file === `${receiver}_${sender}.json`)
                    file_user_to_user_today = msg_file;
            })
            if (file_user_to_user_today) {
                path_file_today = `${__root}/data/messages/user_to_user/${date_now}/${file_user_to_user_today}`;
                const data_file_msg_today = require(path_file_today);
                data_file_msg_today.push(new_message);
                data_message_will_write = JSON.stringify(data_file_msg_today, null, 4);
                write_file();
            }
            else {
                path_file_today = `${__root}/data/messages/user_to_user/${date_now}/${sender}_${receiver}.json`;
                data_message_will_write = JSON.stringify([new_message], null, 4);
                write_file();
            }
        })
    }
    const write_file = () => {
        fs.writeFile(path_file_today, data_message_will_write, 'utf8', (err) => {
            if (err) {
                logger.error(err);                
                res.status(500).json({ send_message_success: false });
                return false;
            }
            else {
                res.status(201).json({ send_message_success: true });
                return true;
            }
        })
    }
    create_folder_today(() => {
        preparing_data_to_write(()=>{
            write_file()
        });
    })
}
exports.upload_file_to_room = (req,res) => {
    const new_file_uploaded = new File_Model({
        _id : req.file.file_id,
        name: req.file.originalname,
        sender: req.user_id,
        receiver: {
            room_id : req.params.room_id
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
    
}
exports.upload_file_to_user = (req,res) => {
    const new_file_uploaded = new File_Model({
        _id: req.file.file_id,
        name: req.file.originalname,
        sender: req.user_id,
        receiver:{
            receiver_id : req.params.receiver_id
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
}
exports.create_room = (req,res) => {
    const new_room = new Room_Model({
        _id : mongoose.Types.ObjectId(),
        avatar: '',
        name: req.body.room_name,
        admin : req.user_id,
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
}
exports.get_all_rooms = (req,res) => {
    Room_Model.find({
        $or: [
            { admin: req.user_id },
            { members: req.user_id }
        ]
    })
        .populate({
            path: 'messages',
            model: 'Message',
            populate: {
                select: "_id username",
                path: "sender",
                model: "User"
            }
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
exports.update_room_name = (req,res) => {
    Room_Model.updateOne(
        {_id: req.params.room_id},
        {
            $set : {
                name : req.body.room_name,
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
exports.get_all_file_of_room = (req,res) => {
    File_Model.find({'receiver.room_id': req.params.room_id })
        .exec()
        .then(files => {
            if(files)
                res.status(200).json(files);
            else
                res.status(404).json({error: 'Not found'})
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json(err);
        })
}
exports.get_all_file_of_user = (req,res) => {
    File_Model.find({'receiver.receiver_id': req.params.receiver_id})
        .exec()
        .then(files => {
            if(files)
                res.status(200).json(files);
            else
                res.status(404).json({error: 'Not found'})
        })
        .catch(err => {
            logger.error(err);
            res.status(500).json({error: err})
        })
}