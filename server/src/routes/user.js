const express = require('express');
const router = express.Router({mergeParams: true});
const controller_user = require('../controller/user');
const check_auth = require('../middleware/check-auth'); 

router.route('/login')
    .post(controller_user.login)

router.route('/')
    .all(check_auth)
    .get(controller_user.get_all_users)
    .post(controller_user.create_user)

router.route('/:user_id')
    .all(check_auth)
    .get(controller_user.get_user)
    .delete(controller_user.delete_user)
    
router.put('/:user_id/name',check_auth,controller_user.update_user_name);
router.put('/:user_id/socket-id',controller_user.update_socket_id);

module.exports = router;