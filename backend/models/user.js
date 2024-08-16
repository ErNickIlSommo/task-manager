import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  folders: [mongoose.Schema.Types.ObjectId],
});

export const userModel = mongoose.model("User", userSchema);
