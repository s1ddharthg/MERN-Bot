import { Request, Response } from "express";
import type { ChatCompletionMessageParam } from "openai/resources/index.js";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { asyncHandler, HttpError } from "../utils/error-handler.js";

export const generateChatCompletion = asyncHandler(
  async (req: Request, res: Response) => {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) throw new HttpError(401, "User not registered OR Token malfunctioned");

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionMessageParam[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const openai = configureOpenAI();
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    const reply = chatResponse.choices[0].message;
    user.chats.push({ content: reply.content ?? "", role: "assistant" });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  }
);

export const sendChatsToUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(res.locals.jwtData.id);
  if (!user) throw new HttpError(401, "User not registered OR Token malfunctioned");
  if (user._id.toString() !== res.locals.jwtData.id) {
    throw new HttpError(401, "Permissions didn't match");
  }
  return res.status(200).json({ message: "OK", chats: user.chats });
});

export const deleteChats = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(res.locals.jwtData.id);
  if (!user) throw new HttpError(401, "User not registered OR Token malfunctioned");
  if (user._id.toString() !== res.locals.jwtData.id) {
    throw new HttpError(401, "Permissions didn't match");
  }
  user.chats.splice(0, user.chats.length);
  await user.save();
  return res.status(200).json({ message: "OK" });
});
