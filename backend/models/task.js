import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  content: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    levelOfTask: {
      type: Number,
    },
    expirationDate: {
      type: Date,
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

export const taskModel = mongoose.model(taskSchema);
