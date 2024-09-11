const express = require('express');
const router = express.Router();
const PresencasController = require('../controllers/presencasController');

router.get('/', PresencasController.getAllPresencas);
router.post('/', presencasController.createPresenca);
router.put('/:id', presencasController.updatePresenca);
router.delete('/:id', presencasController.deletePresenca);

module.exports = router;
