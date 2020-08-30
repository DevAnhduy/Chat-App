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

exports.get_all_messages = catch_async(async(req,res,next) => {
    const receiver_id = req.params.id;
    const user_id = req.user_id;
})

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
        User_Model.findById(req.params.receiver_id)
            .select('username')
            .exec()
            .then(receiver => {
                const sender_id = req.user_id;
                const receiver_id = req.params.receiver_id;
                const new_message = {
                    content: {
                        sender_id,
                        sender_name: req.username,
                        receiver_id,
                        receiver_name: receiver.username,
                        content: req.body.content,
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
                        if(response)
                            res.status(201).json({ send_message_success: true })
                        else
                            res.status(500).json({ send_message_success: false })
                    })
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
        const message_service = new Message_Service(message_updated);
        message_service.edit_message(response => {
            if(response)
                res.status(200).json({edit_message_success: true})
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
        const message_service = new Message_Service(message_deleted)
        message_service.delete_message(response => {
            if(response)
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
    },
    write_excel : (req,res) => {
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Test');

        worksheet.columns = [
            { header: 'Package', key: 'package_name', width: 10 },
            { header: 'Author', key: 'author_name', width: 30 }
        ];

        worksheet.addRow(
            { package_name: "ABC", author_name: "Author 1" },
            { package_name: "XYZ", author_name: "Author 2" }
        )

        const row = worksheet.addRow(["BCD", "Author Name 3"]);
        row.height = 20
        row.alignment = {horizontal: 'center',vertical: 'middle'}
        const rows = [
            ["FGH", "Author Name 4"],
            { package_name: "PQR", author_name: "Author 5" }
          ];
          worksheet
          .addRows(rows);
        worksheet.mergeCells('B1:C1')
        // save workbook to disk
        workbook
          .xlsx
          .writeFile('sample.xlsx')
          .then(() => {
              res.send('Saved')
              //res.download('sample.xlsx')
          })
          .catch((err) => {
            console.log("err", err);
          });  
    }
}