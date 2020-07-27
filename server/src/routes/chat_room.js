const upload_file = require('src/middleware/upload_file');
const router = require('express').Router();
const chat_room_controller = require('src/controller/chat_room');
const check_auth = require('src/middleware/check-auth');

router.get('/chat/rooms',check_auth,chat_room_controller.get_all_rooms);
router.get('/chat/rooms/:room_id', chat_room_controller.get_room);
router.get('/chat/rooms/:room_id/messages/most-recent', check_auth, chat_room_controller.get_recent_messages);
router.get('/chat/rooms/:room_id/files', check_auth, chat_room_controller.get_all_file)
router.post('/chat/rooms',check_auth,chat_room_controller.create_room);
router.post('/chat/rooms/:room_id/messages', check_auth, chat_room_controller.create_message);
router.post('/chat/rooms/:room_id/files', check_auth, upload_file.single('upload_file'), chat_room_controller.upload_file);
router.put('/chat/rooms/:room_id/name',check_auth,chat_room_controller.update_room_name);
router.delete('/chat/rooms/:room_id',check_auth,chat_room_controller.delete_room);

module.exports = router;
