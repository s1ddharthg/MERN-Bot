import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatIdDefault = () => randomUUID();
if (process.env.NODE_ENV !== "production") {
  // ponytail: catches regression to a static default (was randomUUID() instead of () => randomUUID())
  console.assert(
    chatIdDefault() !== chatIdDefault(),
    "chatSchema id default is not per-document unique"
  );
}

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: chatIdDefault,
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

export default mongoose.model("User", userSchema);
