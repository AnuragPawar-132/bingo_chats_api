const express = require('express');
const http = require('http');
const app = express();
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT;
const connection = require('./dbClient');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket handling
wss.on('connection', (ws) => {
  console.log('✅ WebSocket client connected');

  ws.on('message', (message) => {
    console.log('📩 Received:', message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.send('👋 Hello from WebSocket server');
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows, fields) => {
    if (err){
      return res.status(500).send('Database query failed'); 
    }
    res.send(rows);
  })
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})