const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainControllers');

// Define routes for the main controller
router.get('/', mainController.home);
router.get('/about', mainController.about);
router.get('/contact', mainController.contact);

module.exports = router;
