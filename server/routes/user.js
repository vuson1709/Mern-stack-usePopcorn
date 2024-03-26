import express from "express";
import bcryt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const checkUsername = await User.findOne({ username });
  const checkEmail = await User.findOne({ email });

  if (checkUsername) {
    return res.json({ message: "username already existed" });
  }

  if (checkEmail) {
    return res.json({ message: "Email already existed" });
  }

  const hashPassword = await bcryt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "record registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User is not registered" });

  const validPassword = await bcryt.compare(password, user.password);
  if (!validPassword) return res.json({ message: "Password is incorrect" });

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({
    status: true,
    message: "login successfully",

    user: {
      username: user.username,
      email: user.email,
      id: user._id,
      token,
    },
  });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "user not registered" });

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "30m",
    });

    // Nodemailer config
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "thaison170996@gmail.com",
        pass: "kmah ygut pqob lkxq",
      },
    });

    var mailOptions = {
      from: "thaison170996@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3006/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcryt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });

    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res.json("invalid token");
  }
});

async function verifyUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }

    // Verify token
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch (err) {
    return res.json(err);
  }
}

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "logout successfully" });
});

export { router as UserRouter };
