const upload_file = require('src/middleware/upload_file');
const router = require('express').Router({mergeParams: true});
const chat_user_controller = require('src/controller/chat_user_controller');
const check_auth = require('src/middleware/check-auth');

router.route('/messages')
    .all(check_auth)
    .get(chat_user_controller.get_all_messages)
    .post(chat_user_controller.create_message)
    .put(chat_user_controller.edit_message)
    .delete(chat_user_controller.delete_message)

router.route('/messages/most-recent')
    .all(check_auth)
    .get(chat_user_controller.get_recent_messages)

router.route('/files',check_auth)
    .all(check_auth)
    .get(chat_user_controller.get_all_file)
    .post(upload_file.single('upload_file'),chat_user_controller.upload_file)

module.exports = router;
