import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { userModel } from "../models/user.js";

import { ACCESS_TOKEN_SECRET } from "../config.js";

const salt = 12;

export const postLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({
      success: false,
      message: "Auth failed. Email or password not provided",
    });

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({
          success: false,
          message: "Auth failed. User not found",
        });
      }
      bcryptjs
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            return res.json({
              success: false,
              message: "Auth failed. email or password wrong",
            });
          }
          const accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET, {
            expiresIn: 86400,
          });
          // console.log("USER");
          // console.log(user);
          req.session.token = accessToken;
          req.session.userId = user._id;
          return res.json({
            // success: true,
            message: "Successfull login",
            // token: accessToken,
            // userId: user._id,
          });
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
  //   return res.json({ text: "Post user" });
};

export const postSignUp = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (password != confirmPassword)
    return res.json({
      success: false,
      message: "passwords must coincide",
    });
  if (!email || !password || !confirmPassword)
    return res.json({
      success: false,
      message: "email, password and confirm password are required",
    });
  userModel
    .findOne({ email: email })
    .then((user) => {
      //   console.log(user);
      if (user)
        return res.json({
          success: false,
          message: "email already used by another user",
        });
      bcryptjs
        .hash(password, salt)
        .then((hash) => {
          //   console.log(hash);
          const newUser = new userModel({
            email: email,
            password: hash,
          });
          newUser
            .save()
            .then((item) => {
              //   console.log(item);
              return res.json({ message: "new user registered" });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.error(err);
    return res.json({ message: "Log out" });
  });
};
