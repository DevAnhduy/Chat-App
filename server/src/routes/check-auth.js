const { route } = require('./order');

const router = require('express').Router();
const check_auth_controller = require('../controller/check-auth');

router.get('/check-auth',check_auth_controller);

module.exports = router;