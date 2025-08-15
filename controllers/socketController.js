import { WebSocket } from "ws";
import { Message } from "../entities/Messages.js";

const clients = new Map();

export const hangout = (ws) => {
  console.log('WebSocket client connected');

  ws.on('error', console.error);

  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString());

    if (parsed.type === 'register') {
      const user_id = parsed.user_id;
      clients.set(user_id, ws);
      ws.user_id = user_id; // Optional: attach user_id to the socket
      console.log(`User ${user_id} registered`);
      return;
    }

    const { sender_id, receiver_id, message } = parsed;

    // Save message to DB
    const newMessage = Message.create({
        sender_id: sender_id, 
        receiver_id: receiver_id, 
        content: message
    });
    newMessage.then((data)=>{
        console.log('Message stored with ID:', data.id);
    }).catch((err)=>{
        console.error('Database insert error:', err);
    })

    // Send message to receiver if online
    const receiverSocket = clients.get(receiver_id);
    if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
      receiverSocket.send(JSON.stringify({
        sender_id,
        receiver_id,
        message
      }));
    }
  });
}