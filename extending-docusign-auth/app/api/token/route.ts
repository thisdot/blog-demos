import { type NextRequest, NextResponse } from "next/server";
import { verifyJwt, signJwt } from "@/lib/jwt";
import { verifyApiKey } from "@/lib/taskvibe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const parsedBody = parseQueryString(body);
    const { code, refresh_token } = parsedBody;

    if (code) {
      // This is the initial authorization code flow
      // Verify and decode the JWT from the authorization code
      const payload = await verifyJwt<{ apiKey: string }>(code);
      const { apiKey } = payload;

      // Verify the API key with TaskVibe
      const isValid = await verifyApiKey(apiKey);

      if (!isValid) {
        return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
      }

      // Create a new JWT with no expiration
      const accessToken = await signJwt({ apiKey });

      // Return the tokens
      // We are not using a refresh token in this implementation, so we are returning the same token for both access and refresh
      return NextResponse.json({
        access_token: accessToken,
        refresh_token: accessToken,
        token_type: "Bearer",
      });
    } else if (refresh_token) {
      // This is the flow that happens for every subsequent request
      // The refresh token is the same as the access token we created in the initial authorization code flow
      return NextResponse.json({
        access_token: refresh_token,
        refresh_token: refresh_token,
        token_type: "Bearer",
      });
    }

    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}

function parseQueryString(query: string) {
  const params = new URLSearchParams(query);
  const obj: { [key: string]: string } = {};
  for (const [key, value] of params) {
    obj[key] = decodeURIComponent(value);
  }
  return obj;
}
