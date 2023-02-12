import express from "express";
import {
  isAuthenticated,
  LoginController,
  RegisterController,
} from "../Controller/authController.js";

const router = express.Router();

router.route("/register").post(RegisterController);
router.route("/login").post(LoginController);
router.route("/").get(isAuthenticated, (req, res) => {
  res.json({ success: "true" });
});

export default router;
