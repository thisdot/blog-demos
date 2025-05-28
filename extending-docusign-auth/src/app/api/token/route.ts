import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }
  try {
    const payload = jwt.verify(code, JWT_SECRET) as { apiSecretKey: string };
    const accessToken = jwt.sign(
      { apiSecretKey: payload.apiSecretKey },
      JWT_SECRET,
      { expiresIn: "1h" },
    );
    return NextResponse.json({ access_token: accessToken, state });
  } catch {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }
}
