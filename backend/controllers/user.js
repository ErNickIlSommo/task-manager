import { userModel } from "../models/user.js";

export const getUser = (req, res, next) => {
  const userId = req.session.userId;
  userModel
    .findOne({ _id: userId })
    .populate()
    .then((user) => {
      return res.json({
        routes: "user",
        method: "GET",
        path: req.path,
        user: user,
      });
    })
    .catch((err) => console.error(err));
};
