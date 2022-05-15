const express = require('express');
const router = express.Router();
const userInsertController = require('../controllers/userInsertController')

router.route('/')
    .post( userInsertController.insertNewUser);

module.exports = router;