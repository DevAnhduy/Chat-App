const upload_file = require(`${root_path}/src/middleware/upload_file.js`);
const router = require('express').Router();
const chat_room_controller = require(`${root_path}/src/controller/chat_room.js`);
const check_auth = require(`${root_path}/src/middleware/check-auth`);

router.get('/chat/rooms',check_auth,chat_room_controller.get_all_rooms);
router.get('/chat/rooms/:room_id', chat_room_controller.get_room);
router.post('/chat/rooms',check_auth,chat_room_controller.create_room);
router.put('/chat/rooms/:room_id/name',check_auth,chat_room_controller.update_room_name);
router.delete('/chat/rooms/:room_id',check_auth,chat_room_controller.delete_room);
router.get('/chat/rooms/:room_id/messages/most-recent',chat_room_controller.get_recent_messages_in_room);
router.post('/chat/rooms/:room_id/messages',check_auth,chat_room_controller.create_message_to_room);
router.post('/chat/users/:receiver_id/messages',check_auth,chat_room_controller.create_message_to_user);
router.get('/chat/users/:receiver_id/messages', check_auth, chat_room_controller.get_messages_user_to_user);
router.post('/chat/rooms/:room_id/files',check_auth,upload_file.single('upload_file'),chat_room_controller.upload_file_to_room);
router.get('/chat/rooms/:room_id/files',check_auth,chat_room_controller.get_all_file_of_room)
router.post('/chat/users/:receiver_id/files', check_auth, upload_file.single('upload_file'),chat_room_controller.upload_file_to_user);
router.get('/chat/users/:receiver_id/files',check_auth,chat_room_controller.get_all_file_of_user)

module.exports = router;
