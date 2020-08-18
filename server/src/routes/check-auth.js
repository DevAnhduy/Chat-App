const router = require('express').Router();
const check_auth_controller = require('src/controller/check-auth');

router.get('/check-auth',check_auth_controller);

module.exports = router;