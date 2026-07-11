import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { env } from "./env.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn,
  } as jwt.SignOptions);
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return jwt.verify(token, env.JWT_SECRET, (err: jwt.VerifyErrors | null, success: jwt.JwtPayload | string | undefined) => {
    if (err) {
      return res.status(401).json({ message: "Token Expired" });
    }
    res.locals.jwtData = success;
    return next();
  });
};
