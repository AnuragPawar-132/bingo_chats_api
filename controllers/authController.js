import User from "../models/Users.js";

export const login =  (req, res)=>{
  const {username, password} = req.body;
  console.log("Username:", username, "Password:", password);
  const user = User.findOne({
    where: {
      username: username,
      password_hash: password
    }
  });
  user.then((data) => {
    if (data) {
      res.json({ message: "Login successful", user: data });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }).catch((err) => {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
}