import { Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { asyncHandler, HttpError } from "../utils/error-handler.js";

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
  path: "/",
  domain: process.env.COOKIE_DOMAIN,
  httpOnly: true,
  signed: true,
  secure: isProd,
  sameSite: (isProd ? "none" : "lax") as "none" | "lax",
};

export const userSignup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new HttpError(401, "User already registered");
  const hashedPassword = await hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.clearCookie(COOKIE_NAME, cookieOptions);

  const token = createToken(user._id.toString(), user.email, "7d");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  res.cookie(COOKIE_NAME, token, { ...cookieOptions, expires });

  return res
    .status(201)
    .json({ message: "OK", name: user.name, email: user.email });
});

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(401, "User not registered");
  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect) throw new HttpError(403, "Incorrect Password");

  res.clearCookie(COOKIE_NAME, cookieOptions);

  const token = createToken(user._id.toString(), user.email, "7d");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);
  res.cookie(COOKIE_NAME, token, { ...cookieOptions, expires });

  return res
    .status(200)
    .json({ message: "OK", name: user.name, email: user.email });
});

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(res.locals.jwtData.id);
  if (!user) throw new HttpError(401, "User not registered OR Token malfunctioned");
  if (user._id.toString() !== res.locals.jwtData.id) {
    throw new HttpError(401, "Permissions didn't match");
  }
  return res
    .status(200)
    .json({ message: "OK", name: user.name, email: user.email });
});

export const userLogout = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(res.locals.jwtData.id);
  if (!user) throw new HttpError(401, "User not registered OR Token malfunctioned");
  if (user._id.toString() !== res.locals.jwtData.id) {
    throw new HttpError(401, "Permissions didn't match");
  }

  res.clearCookie(COOKIE_NAME, cookieOptions);

  return res
    .status(200)
    .json({ message: "OK", name: user.name, email: user.email });
});
