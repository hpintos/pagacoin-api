const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/', usersController.getAll);
router.get('/:userId', usersController.get);

module.exports = router;
