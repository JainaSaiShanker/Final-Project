const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyControllers');

router.get('/', storyController.index);
router.get('/new', storyController.new);
router.post('/', storyController.create);
router.get('/:id', storyController.show);
router.get('/:id/edit', storyController.edit);
router.put('/:id', storyController.update);
router.delete('/:id', storyController.delete);

module.exports = router;
