import Message from '../models/Messages.js';
import { conversationResponse } from '../models/ConversationModel.js';
import { errorLoginResponse } from '../models/LoginResponsemodel.js'; // if you want consistent error handling
import { Op } from 'sequelize';

export const getConversationHistory = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const history = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: senderId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: senderId }
        ]
      },
      order: [['timestamp', 'ASC']]
    });

    res.json(conversationResponse(history));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorLoginResponse('Internal Server Error'));
  }
};
