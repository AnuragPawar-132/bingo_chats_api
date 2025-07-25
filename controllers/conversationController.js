import jwt from "jsonwebtoken";
import Message from '../models/Messages.js';
import { conversationResponse } from '../models/ConversationModel.js';
import { errorLoginResponse } from '../models/LoginResponsemodel.js'; // if you want consistent error handling
import { Op } from 'sequelize';
const secretKey = process.env.SECRETKEY;

export const getConversationHistory = async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }
    // verify token (promise-based approach)
    jwt.verify(token, secretKey);
    // fetch messages
    const history = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: senderId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: senderId },
        ],
      },
      order: [['timestamp', 'ASC']],
    });
    return res.json(conversationResponse(history));
  } catch (err) {
    console.error('Error fetching conversation:', err.message);
    if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Invalid token' });
    }
    return res.status(500).json(errorLoginResponse('Internal Server Error'));
  }
};