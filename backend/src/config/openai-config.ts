import OpenAI from "openai";
import { env } from "../utils/env.js";

export const configureOpenAI = () => {
  return new OpenAI({
    apiKey: env.OPEN_AI_SECRET,
    organization: process.env.OPENAI_ORGANIZATION_ID,
  });
};
