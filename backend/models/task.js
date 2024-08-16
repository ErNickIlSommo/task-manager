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
    importance: {
      type: Boolean,
    },
    urgency: {
      type: Boolean,
    },
    expirationDate: {
      type: Date,
    },
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
});

export const taskModel = mongoose.model("Task", taskSchema);
