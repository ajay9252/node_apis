var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer()
router.use(upload.array());
router.use(bodyParser.urlencoded({ extended: true }));

const merchantController = require('../controllers').merchants;

/* Merchant Routes */

router.post('/add_merchant', merchantController.add_merchant);
router.get('/get_merchant', merchantController.get_merchant);
router.get('/get_merchant_by_id/:id', merchantController.get_merchant_by_id);
router.post('/update_merchant/:id', merchantController.update_merchant);
router.post('/delete_merchant/:id', merchantController.delete_merchant);

module.exports = router;