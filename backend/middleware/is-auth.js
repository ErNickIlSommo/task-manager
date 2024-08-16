import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";
import { userModel } from "../models/user.js";

export const isAuth = (req, res, next) => {
  const token = req.session.token;

  console.log("token");
  if (!token) {
    console.log("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "no token provided" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
    // console.log("middleware");
    // console.log(data);
    if (err)
      return res.status(403).json({
        success: false,
        message: "Token authentication procedure failed",
        error: err,
      });
    userModel
      .findOne({ _id: data.user._id })
      .then((user) => {
        req.user = {
          userId: user.userId,
          email: user.email,
        };
        next();
      })
      .catch((err) => console.error(err));
  });
};
