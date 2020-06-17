const express = require('express');
const router = express.Router();
const controller_user = require('../controller/user');
const check_auth = require('../middleware/check-auth'); 

router.post('/login',controller_user.login);
router.get('/users',check_auth,controller_user.get_all_users);
router.get('/users/:user_id',check_auth,controller_user.get_user);
router.post('/users',controller_user.create_user);
router.delete('/users/:user_id',check_auth,controller_user.delete_user);
router.put('/users/:user_id',check_auth,controller_user.update_user);

module.exports = router;