const express = require("express");
const { chatGptController } = require("../controllers/chatGptController");
const router = express.Router();
const authMiddleware = require("../middellwares/authMiddleware")

router.post('/chat', authMiddleware,chatGptController);

module.exports = router;