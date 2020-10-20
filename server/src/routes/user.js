const express = require('express');
const router = express.Router({mergeParams: true});
const controller_user = require('../controller/user_controller');
const check_auth = require('../middleware/check-auth'); 

router.route('/login')
    .post(controller_user.login)

router.route('/search')
    .all(check_auth)
    .get(controller_user.find_user)

router.route('/')
    .get(controller_user.get_all_users)
    .post(controller_user.create_user)

router.route('/:id')
    .all(check_auth)
    .get(controller_user.get_user)
    .delete(controller_user.delete_user)
    .put(controller_user.update_user)

router.route('/request-friend/:id')
    .all(check_auth)
    .get(controller_user.get_request_friend)
    .post(controller_user.request_friend)
    .patch(controller_user.response_request_friend)

router.route('/friends/:id')
    .all(check_auth)
    .get(controller_user.get_friends)



module.exports = router;