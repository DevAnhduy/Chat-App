const upload_file = require('src/middleware/upload_file');
const router = require('express').Router();
const chat_user_controller = require('src/controller/chat_user');
const check_auth = require('src/middleware/check-auth');

router.get('/chat/users/:receiver_id/messages', check_auth, chat_user_controller.get_all_messages);
router.get('/chat/users/:receiver_id/messages/most-recent', check_auth, chat_user_controller.get_recent_messages);
router.get('/chat/users/:receiver_id/files', check_auth, chat_user_controller.get_all_file);
router.post('/chat/users/:receiver_id/messages', check_auth, chat_user_controller.create_message);
router.post('/chat/users/:receiver_id/files', check_auth, upload_file.single('upload_file'), chat_user_controller.upload_file);

module.exports = router;
