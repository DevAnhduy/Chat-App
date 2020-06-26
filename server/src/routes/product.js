const express = require('express');
const router = express.Router();
const check_auth = require('../middleware/check-auth');
const controller_product = require('../controller/product');
const multer_storage = require('../../config/multer');

router.get('/products',controller_product.get_all_products);
router.get('/products/:product_id',controller_product.get_product);
router.post('/products',check_auth,multer_storage.single('image_product'),controller_product.create_product);
router.put('/products/:product_id',check_auth,controller_product.update_product);
router.delete('/products/:product_id',check_auth,controller_product.delete_product);

module.exports = router;