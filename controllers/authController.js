import User from "../models/Users.js";

export const login =  (req, res)=>{
  const {email, password} = req.body;
  const user = User.findOne({
    where: {
      email: email,
      password_hash: password
    }
  });
  user.then((data) => {
    if (data) {
      res.json({ message: "Login successful", user: {id: data.id, username: data.username, email:data.email} });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }).catch((err) => {
    res.status(500).json({ error: 'Internal Server Error' });
  });
}