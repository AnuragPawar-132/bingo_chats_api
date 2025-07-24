const express = require('express');
const router = express.Router();
const conversationController = require("../controllers/conversationController");

router.get('/convs', conversationController.getConversationHistory);
module.exports = router;