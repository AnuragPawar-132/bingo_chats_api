const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Welcome to bingo chats!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})