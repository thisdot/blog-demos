"use server";

import { redirect } from "next/navigation";
import { signJwt } from "./jwt";

export async function authorizeUser(
  apiKey: string,
  state: string,
  redirectUri: string,
) {
  // Create a JWT with 1 hour expiration
  // This is only for the initial authorization code flow, which should be short lived
  const code = await signJwt({ apiKey }, { expiresIn: "1h" });

  // Construct the redirect URL with state and code
  const redirectUrl = new URL(redirectUri);
  redirectUrl.searchParams.append("state", state);
  redirectUrl.searchParams.append("code", code);

  // Redirect to the callback URL on Docusign
  // Docusign will then invoke the token endpoint with the code, to obtain the access token
  redirect(redirectUrl.toString());
}
