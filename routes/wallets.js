const express = require('express');
const router = express.Router();

const walletsController = require('../controllers/wallets.controller');

router.get('/', walletsController.getAll);
router.get('/:userId', walletsController.get);
router.post('/transfer', walletsController.transfer)

module.exports = router;
