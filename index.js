const express = require('express');
const http = require('http');
const WebSocket = require('ws');
var cors = require('cors')
const app = express();
app.use(cors())
require('dotenv').config();
app.use(express.json());
const port = process.env.PORT;
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const conversationRoutes = require("./routes/coonversationRouter.js")
const { hangout } = require('./controllers/socketController.js');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', hangout);

app.get("/", (req, res)=>{
  res.send("Welcome to bingo chat api")
})
app.use('/auth/', authRoutes);
app.use('/api/', userRoutes);
app.use('/cn/', conversationRoutes)

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