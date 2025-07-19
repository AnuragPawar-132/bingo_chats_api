import User from "../models/Users.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRETKEY;

export const getAllUsers = (req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err) => {
    if (err) {
      res.status(500).json({ error: 'Invalid Token' });
    } else {
      const users = User.findAll();
      users.then((data) => {
        res.json(data);
      }).catch((err) => {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    }
  });
}