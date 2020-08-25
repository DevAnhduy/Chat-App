const router = require('express').Router({mergeParams: true});
const check_auth_controller = require('src/controller/check_auth_controller');

// router.get('/check-auth',check_auth_controller);
router.route('/')
    .get(check_auth_controller.check_auth)

module.exports = router;