import { SignJWT, jwtVerify } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signJwt(
  payload: any,
  options: { expiresIn?: string } = {},
) {
  const jwt = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();

  if (options.expiresIn) {
    jwt.setExpirationTime(options.expiresIn);
  }

  return await jwt.sign(JWT_SECRET);
}

export async function verifyJwt<T>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as T;
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Invalid token");
  }
}
