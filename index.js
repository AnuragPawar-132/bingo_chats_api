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
const clients = new Map();

// WebSocket handling
wss.on('connection', (ws) => {
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
    connection.query(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [sender_id, receiver_id, message],
      (err, results) => {
        if (err) {
          console.error('Database insert error:', err);
          return;
        }
        console.log('Message stored with ID:', results.insertId);
      }
    );

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

});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM users', (err, rows, fields) => {
    if (err) {
      return res.status(500).send('Database query failed');
    }
    res.send(rows);
  })
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
















// wss.on('connection', (ws) => {

//   console.log('WebSocket client connected');

//   ws.on('error', console.error);
//   ws.on('message', (data) => {

//     const parsed = JSON.parse(data.toString());
//     const { sender_id, receiver_id, message } = parsed;
//     console.log(sender_id, receiver_id, message);
//     connection.query('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)', [sender_id, receiver_id, message], (err, results) => {
//       if (err) {
//         console.error('Database insert error:', err);
//         return;
//       }
//       console.log('Rutva', results.insertId);
//     });
//   });
//   ws.send('Hi from Spring');
// });