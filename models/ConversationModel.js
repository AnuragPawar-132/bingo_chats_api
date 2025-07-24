const conversationResponse = (messages) => {
  return {
    success: true,
    messages: messages.map(msg => ({
      id: msg.id,
      senderId: msg.sender_id,
      receiverId: msg.receiver_id,
      message: msg.content,
      timestamp: msg.timestamp
    }))
  };
};

module.exports = {
    conversationResponse
};
