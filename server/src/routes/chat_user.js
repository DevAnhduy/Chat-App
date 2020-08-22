const upload_file = require('src/middleware/upload_file');
const router = require('express').Router();
const chat_user_controller = require('src/controller/chat_user');
const check_auth = require('src/middleware/check-auth');

router.route('/messages',check_auth)
    .get(chat_user_controller.get_all_messages)
    .get(chat_user_controller.get_recent_messages)
    .post(chat_user_controller.create_message)
    .put(chat_user_controller.edit_message)
    .delete(chat_user_controller.delete_message)

router.route('/messages/most-recent',check_auth)
    .get(chat_user_controller.get_recent_messages)

router.route('/files',check_auth)
    .get(chat_user_controller.get_all_file)
    .post(upload_file.single('upload_file'),chat_user_controller.upload_file)

// router.get('/chat/users/:receiver_id/messages', check_auth, chat_user_controller.get_all_messages);
// router.get('/chat/users/:receiver_id/messages/most-recent', check_auth, chat_user_controller.get_recent_messages);
// router.get('/chat/users/:receiver_id/files', check_auth, chat_user_controller.get_all_file);
// router.post('/chat/users/:receiver_id/messages', check_auth, chat_user_controller.create_message);
// router.post('/chat/users/:receiver_id/files', check_auth, upload_file.single('upload_file'), chat_user_controller.upload_file);
// router.put('/chat/users/:receiver_id/messages',check_auth, chat_user_controller.edit_message);
// router.delete('/chat/users/:receiver_id/messages',check_auth, chat_user_controller.delete_message);
// router.get('/users/excel',chat_user_controller.write_excel)

module.exports = router;
