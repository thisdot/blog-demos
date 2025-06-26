import { type NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import { getTypeDefinitions } from "@/lib/taskvibe";

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 },
      );
    }

    // Extract the bearer token (JWT)
    const token = authHeader.substring(7);

    // Verify and decode the JWT
    const payload = await verifyJwt<{ apiKey: string }>(token);
    const { apiKey } = payload;

    // Get type definitions from TaskVibe
    const typeNames = await getTypeDefinitions(apiKey);

    return NextResponse.json({ typeNames });
  } catch (error) {
    console.error("Type definitions error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
