
export async function getEpisodes(showId: string)  {
  const clientId = process.env.SPOTIFY_CLIENT_ID || "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";

  if (!clientId || !clientSecret) {
    throw Error("Missing client ID or secret");
  }

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
    next: { revalidate: 60 * 60 - 5 }, // Token is valid for 1 hour, minus some buffer
  });

  if (!tokenResponse.ok) {
    const tokenResponseJson = await tokenResponse.json();
    throw Error(
      `Failed to fetch access token from Spotify: ${JSON.stringify(
        tokenResponseJson,
      )}`,
    );
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  const showResponse = await fetch(
    `https://api.spotify.com/v1/shows/${showId}?market=US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 24 * 60 * 60 }, // 1 day
    },
  );

  if (!showResponse.ok) {
    const showResponseJson = await showResponse.json();
    throw Error(
      `Failed to fetch show details from Spotify: ${JSON.stringify(
        showResponseJson,
      )}`,
    );
  }

  return await showResponse.json();
}
