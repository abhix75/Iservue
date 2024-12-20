const express = require('express');
const router = express.Router();
const matterController = require('../controllers/matterController');

router.post('/', matterController.createMatter);
router.patch('/:id', matterController.updateState);
router.get('/', matterController.getMatters);
router.delete('/:id', matterController.deleteMatter);
router.get('/count', matterController.countMattersByState);

module.exports = router;
