const router = require('express').Router();
const order_controller = require('../controller/orders');
const check_auth = require('../middleware/check-auth');

router.get('/orders',check_auth,order_controller.get_all_orders);
router.get('/orders/:order_id',check_auth,order_controller.get_order);
router.post('/orders',check_auth,order_controller.create_order);
router.put('/orders/:order_id',check_auth,order_controller.update_order);
router.delete('/orders/:order_id',check_auth,order_controller.delete_order);

module.exports = router;