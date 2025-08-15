import express from 'express';
const router = express.Router();
import { getConversationHistory } from '../controllers/conversationController.js'

router.get('/convs', getConversationHistory);

export default router;