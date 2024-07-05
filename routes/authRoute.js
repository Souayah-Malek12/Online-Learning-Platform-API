const express = require("express");
const { registreController, loginController } = require("../controllers/authController");
const router = express.Router();


router.post('/login', loginController);
router.post('/registre', registreController)

module.exports = router;