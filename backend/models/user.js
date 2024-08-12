import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  folders: [
    {
      folderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      level: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const userModel = mongoose.model(userSchema);
