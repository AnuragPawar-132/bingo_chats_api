import { User } from "../entities/Users.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { userResponse } from "../models/UserResponseModel.js";
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
        let final = userResponse(data)
        res.json(final);
      }).catch((err) => {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    }
  });
}