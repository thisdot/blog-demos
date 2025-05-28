import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

type Body = {
  apiSecretKey: string;
  state: string;
  redirectUri: string;
};

export async function POST(req: NextRequest) {
  const { apiSecretKey, state, redirectUri }: Body = await req.json();
  if (!apiSecretKey || !redirectUri) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  const code = jwt.sign({ apiSecretKey }, JWT_SECRET, { expiresIn: "10m" });
  const url = new URL(redirectUri);
  url.searchParams.set("code", code);
  if (state) {
    url.searchParams.set("state", state);
  }
  return NextResponse.json({ redirectUrl: url.toString() });
}
