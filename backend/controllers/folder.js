import { folderModel } from "../models/folder.js";
import { userModel } from "../models/user.js";

export const getFolder = (req, res, next) => {
  //   console.log("GET Folder");
  //   console.log(req.session);
  const userId = req.session.userId;
  //   console.log("GET FOLDER ID");
  //   console.log(userId);

  folderModel
    .find({ "user.userId": userId })
    .then((folders) => {
      return res.json({ routes: "folder", folders: folders });
    })
    .catch((err) => console.error(err));
};

export const postFolder = (req, res, next) => {
  const userId = req.session.userId;

  const { title, description } = req.body;

  if (!title)
    return res.json({ success: false, message: "Title not provided" });

  folderModel
    .findOne({ "user.userId": userId, "content.title": title })
    .then((result) => {
      //   console.log("RESULT TITLE ID");
      //   console.log(result);
      if (result)
        return res.json({ success: false, message: "title already used" });
      const newFolder = new folderModel({
        content: {
          title: title,
          description: description,
        },
        user: {
          userId: userId,
        },
      });
      newFolder
        .save()
        .then((folder) => {
          console.log("Result new Folder");
          console.log(folder);
          userModel
            .findOneAndUpdate(
              { _id: userId },
              { $push: { folders: folder._id } },
              { new: true, useFindAndModify: false }
            )
            .then((result) => {
              return res.json({ message: "Folder added" });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

export const deleteFolder = (req, res, next) => {
  return res.json({ message: "DELETE single folder folder" });
};

export const getSingleFolder = (req, res, next) => {
  return res.json({ message: "GET single folder" });
};
