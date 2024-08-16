import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
  content: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    states: [
      {
        state: {
          type: String,
          required: true,
        },
        color: {
          type: String,
        },
      },
    ],
  },
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
});

export const folderModel = mongoose.model("Folder", folderSchema);
