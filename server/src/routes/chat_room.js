const upload_file = require('src/middleware/upload_file');
const router = require('express').Router({mergeParams: true});
const chat_room_controller = require('src/controller/chat_room');
const check_auth = require('src/middleware/check-auth');

router.route('/')
    .all(check_auth)
    .get(chat_room_controller.get_all_rooms)
    .post(chat_room_controller.create_room)

router.route('/:room_id')
    .all(check_auth)
    .get(chat_room_controller.get_room)
    .delete(chat_room_controller.delete_room)

router.route('/:room_id/messages')
    .all(check_auth)
    .post(chat_room_controller.create_message)
    .put(chat_room_controller.edit_message)
    .delete(chat_room_controller.delete_message)

router.route('/:room_id/messages/most-recent')
    .all(check_auth)
    .get(chat_room_controller.get_recent_messages)

router.route('/:room_id/files')
    .all(check_auth)
    .get(chat_room_controller.get_all_file)
    .post(upload_file.single('upload_file'),chat_room_controller.upload_file)

// router.get('/chat/rooms',check_auth,chat_room_controller.get_all_rooms);
// router.get('/chat/rooms/:room_id', chat_room_controller.get_room);
// router.get('/chat/rooms/:room_id/messages/most-recent', check_auth, chat_room_controller.get_recent_messages);
// router.get('/chat/rooms/:room_id/files', check_auth, chat_room_controller.get_all_file)
// router.post('/chat/rooms',check_auth,chat_room_controller.create_room);
// router.post('/chat/rooms/:room_id/messages', check_auth, chat_room_controller.create_message);
// router.post('/chat/rooms/:room_id/files', check_auth, upload_file.single('upload_file'), chat_room_controller.upload_file);
router.put('/chat/rooms/:room_id/name',check_auth,chat_room_controller.update_room_name);
// router.put('/chat/rooms/:room_id/messages',check_auth,chat_room_controller.edit_message)
// router.delete('/chat/rooms/:room_id',check_auth,chat_room_controller.delete_room);
// router.delete('/chat/rooms/:room_id/messages',check_auth,chat_room_controller.delete_message);

module.exports = router;
