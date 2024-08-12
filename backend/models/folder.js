import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
  content: {
    title: {
      type: String,
      required: true,
    },
    children: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        itemType: {
          type: String,
          required: true,
        },
      },
    ],
  },
  treeInfo: {
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    depth: {
      type: Number,
      required: true,
    },
  },
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
});

export const folderModel = mongoose.model(folderSchema);
