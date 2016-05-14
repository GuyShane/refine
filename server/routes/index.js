var express = require('express');
var router = express.Router();

var controller=require('../controllers/controller');

router.get('/', controller.home_page);
router.get('/gallery', controller.gallery);
router.get('/testimonials', controller.testimonials);
router.get('/contact', controller.contact);

module.exports = router;
