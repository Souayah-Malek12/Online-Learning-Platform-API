const express = require("express");
const { chatGptController } = require("../controllers/chatGptController");
const router = express.Router();

router.post('/chat', chatGptController);

module.exports = router;