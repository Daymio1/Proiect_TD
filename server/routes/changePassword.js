const express = require('express');
const router = express.Router();
const changePasswordController = require('../controllers/changePasswordController')

router.post('/', changePasswordController.handleChangePwd);

module.exports = router;