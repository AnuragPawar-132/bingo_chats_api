import User from "../models/Users.js";

export const getAllUsers = (req, res) => {
  const users = User.findAll();
  users.then((data) => {  
    res.json(data);
  }).catch((err) => {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
}