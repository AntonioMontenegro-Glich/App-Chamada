const express = require('express');
const router = express.Router();
const PresencasController = require('../controllers/PresencasController');

router.get('/', PresencasController.getAllPresencas);
router.post('/', PresencasController.createPresenca);
router.put('/:id', PresencasController.updatePresenca);
router.delete('/:id', PresencasController.deletePresenca);

module.exports = router;
