const REQUIRED_ENV_VARS = [
  "MONGODB_URL",
  "JWT_SECRET",
  "OPEN_AI_SECRET",
  "COOKIE_SECRET",
] as const;

function loadEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
  return {
    MONGODB_URL: process.env.MONGODB_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    OPEN_AI_SECRET: process.env.OPEN_AI_SECRET as string,
    COOKIE_SECRET: process.env.COOKIE_SECRET as string,
  };
}

export const env = loadEnv();
