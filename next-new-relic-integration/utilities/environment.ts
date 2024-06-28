export const IS_PRODUCTION =
  process.env.VERCEL_ENV === "production" || // Server
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"; // Client;
export const IS_STAGING =
  process.env.VERCEL_ENV === "preview" || // Server
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"; // Client;
