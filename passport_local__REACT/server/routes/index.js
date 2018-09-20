const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/', userController.getThings);
router.post('/api/auth', userController.login)

module.exports = router;