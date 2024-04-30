import express from 'express';
import { 
    allUsers,
    forgotPassword,
    getUserProfile,
    loginUser,
    logout,
    registerUser, 
    resetPassword,
    updatePassword,
    updateProfile
} from '../controllers/auth.controller.js';
import { verifyUser } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyUser, logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(verifyUser, getUserProfile);
router.route("/me/update").put(verifyUser, updateProfile);
router.route("/password/update").put(verifyUser, updatePassword);
router.route("/users").get(verifyUser, allUsers);


export default router;  