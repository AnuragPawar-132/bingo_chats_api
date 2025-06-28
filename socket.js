const WebSocket = require('ws');
const socket = new WebSocket('ws://localhost:3000');

socket.on('open', () => {
  console.log('✅ Connected to WebSocket server.');
});

socket.on('message', (data) => {
  console.log('📨 Received:', data.toString());
});

socket.on('error', (error) => {
  console.error('❌ WebSocket error:', error);
});