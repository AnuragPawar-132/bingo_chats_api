const express = require('express');
const router = express.Router();
const conversationController = require("../controllers/conversationController");

router.post('/convs', conversationController.getConversationHistory);

module.exports = router;