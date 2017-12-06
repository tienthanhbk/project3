var express = require('express');
var router = express.Router();
var orderController = require('../controllers/Order.controller');
var passport = require('passport');

router.post('/dathang',  orderController.makeOrder);
router.post('/xem-lich-su-mua-hang', orderController.getLichSuMuaHang);

module.exports = router;
