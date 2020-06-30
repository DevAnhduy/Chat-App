const router = require('express').Router();
const chat_room_controller = require(`${root_path}/src/controller/chat_room.js`);
const check_auth = require(`${root_path}/src/middleware/check-auth`);

router.get('/chat-rooms',check_auth,chat_room_controller.get_all_rooms);
router.get('/chat-rooms/:room_id', chat_room_controller.get_room);
router.post('/chat-rooms',check_auth,chat_room_controller.create_room);
router.put('/chat-rooms/:room_id',check_auth,chat_room_controller.update_room);
router.delete('/chat-rooms/:room_id',check_auth,chat_room_controller.delete_room);
router.get('/chat-rooms/:room_id/messages',chat_room_controller.get_all_messages);
router.post('/chat-rooms/:room_id/messages',chat_room_controller.create_message);

module.exports = router;