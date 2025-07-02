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

  console.log('WebSocket client connected');

  ws.on('error', console.error);
  ws.on('message', (data) => {

    const parsed = JSON.parse(data.toString());
    const { sender_id, receiver_id, message } = parsed;
    console.log(sender_id, receiver_id, message);
    connection.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)', [sender_id, receiver_id, message], (err, results) => {
      if (err) {
        console.error('Database insert error:', err);
        return;
      }
      console.log('Rutva', results.insertId);
    });
  });
  ws.send('Rutva');
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