const upload_file = require('src/middleware/upload_file');
const router = require('express').Router({mergeParams: true});
const chat_room_controller = require('src/controller/chat_room_controller');
const check_auth = require('src/middleware/check-auth');

router.route('/')
    .all(check_auth)
    .get(chat_room_controller.get_all_rooms)
    .post(chat_room_controller.create_room)

router.route('/:id')
    .all(check_auth)
    .get(chat_room_controller.get_room)
    .put(chat_room_controller.update_room)
    .delete(chat_room_controller.delete_room)

router.route('/:id/messages')
    .all(check_auth)
    .get(chat_room_controller.get_all_message)
    .post(chat_room_controller.create_message)
    .put(chat_room_controller.update_message)
    .delete(chat_room_controller.delete_message)

 router.route('/:room_id/files')
    .all(check_auth)
    .get(chat_room_controller.get_all_file)
    .post(upload_file.single('upload_file'),chat_room_controller.upload_file)
   


module.exports = router;
