const multer = require('multer');
const logger = require('src/utils/logger');
const moment = require('moment');
const types_accepted = ["image/jpeg", "image/png","image/jpg","application/x-rar-compressed"];
const fs = require('fs');
const mongoose = require('mongoose');

const file_filter = (req,file,cb) => {
    for(let i = 0; i < types_accepted.length; i++ ){
        if (file.mimetype === types_accepted[i]) {
            cb(null, true);
            return;
        }
    }
    cb(new Error(false));
    return;
}
const storage_config = multer.diskStorage({
    destination: (req, file, cb) => {
        const receiver_type = req.params.room_id ? 'room' : 'user';
        let path_storage_files_root = `${__root}/data/files/user_to_${receiver_type}`;

        if(receiver_type === 'room'){
            const path_storage_files_room = path_storage_files_root + `/${req.params.room_id}`;
            if(!fs.existsSync(path_storage_files_room))
                fs.mkdirSync(path_storage_files_room)
            cb(null,path_storage_files_room);
        }
        else {
            const path_storage_files_sender_receiver = path_storage_files_root + `/${req.user_id}_${req.params.receiver_id}`;
            const path_storage_files_receiver_sender = path_storage_files_root + `/${req.params.receiver_id}_${req.user_id}`;
            if(fs.existsSync(path_storage_files_sender_receiver))
                cb(null,path_storage_files_sender_receiver)
            else if(fs.existsSync(path_storage_files_receiver_sender))
                cb(null,path_storage_files_receiver_sender)
            else{
                fs.mkdirSync(path_storage_files_sender_receiver);
                cb(null, path_storage_files_sender_receiver);
            }
        }
        
    },
    filename: (req, file, cb) => {
        const file_id = mongoose.Types.ObjectId();
        file.file_id = file_id;
        cb(null,`${file_id}_${moment().format('DD-MM-YYYY-h-mm-ss')}_${file.originalname}`)
    }
})
module.exports = multer({
    storage: storage_config,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: file_filter,
})
