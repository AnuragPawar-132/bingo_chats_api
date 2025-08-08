import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import { User } from "../entities/Users.js";
import { errorLoginResponse, successLoginResponse } from "../models/LoginResponsemodel.js";
const secretKey = process.env.SECRETKEY;

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({
    where: {
      email: email,
      password_hash: password
    }
  });
  user.then((data) => {
    if (data) {
      const token = jwt.sign({
        id: data.id,
        username: data.username,
      }, secretKey, { expiresIn: '2h' });
      res.json(successLoginResponse(data, token));
    } else {
      res.status(401).json(errorLoginResponse("Invalid credentials"));
    }
  }).catch((err) => {
    res.status(500).json(errorLoginResponse('Internal Server Error'));
  });
}