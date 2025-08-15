import express from 'express';
const router = express.Router();
import { getAllUsers } from "../controllers/userController.js"

router.get('/users', getAllUsers);

export default router;