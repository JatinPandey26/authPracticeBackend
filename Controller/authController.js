import { User } from "../Model/User.js";
import { sendToken } from "../utils/sendToken.js";
import jwt from "jsonwebtoken";
 
export const RegisterController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  await User.create({
    name,
    email,
    password,
  });

  sendToken(user, "Welcome ", res);
};

export const LoginController = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  sendToken(user, "Welcome back " + user.name, res);
};

// middleware
export const isAuthenticated = async (req, res, next) => {
  const {token} = req.cookies;
  console.log(token);
  if (!token) {
    return res.status(401).json({ 
      message: "You are not logged in",
    });
  }

  const decoded =  jwt.verify(token, process.env.JWT_SECRET);
 
  const user = await User.findById(decoded.id);

  req.user = user;

  next();
};
