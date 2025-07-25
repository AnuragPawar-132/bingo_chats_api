const conversationResponse = (messages) => {
  return {
    success: true,
    messages: messages.map(msg => ({
      id: msg.id,
      senderId: msg.sender_id,
      receiverId: msg.receiver_id,
      message: msg.content,
      timestamp: formatDate(msg.timestamp)
    }))
  };
};

const formatDate = (timestamp) => {
  const formatted = timestamp.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formatted;
}

module.exports = {
  conversationResponse
};
