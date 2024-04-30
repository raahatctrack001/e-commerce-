import express from 'express';
import { 
    forgotPassword,
    loginUser,
    logout,
    registerUser, 
    resetPassword
} from '../controllers/auth.controller.js';
import { verifyUser } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyUser, logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);


export default router;  