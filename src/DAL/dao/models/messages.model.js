import mongoose, { Schema } from "mongoose";

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  message: {
    type: String,
  },
});

export const messagesModel = mongoose.model("Messages", messagesSchema);
