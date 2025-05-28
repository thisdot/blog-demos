"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const AuthorizePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const state = searchParams.get("state") || "";
  const redirectUri = searchParams.get("redirect_uri") || "";
  const [apiSecretKey, setApiSecretKey] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/authorize/server-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiSecretKey, state, redirectUri }),
      });
      if (!res.ok) {
        throw new Error("Failed to authorize");
      }
      const { redirectUrl } = await res.json();
      router.push(redirectUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 2px 16px #0001",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        Authorize Application
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="apiSecretKey"
            style={{ display: "block", marginBottom: 8 }}
          >
            API Secret Key
          </label>
          <input
            id="apiSecretKey"
            type="password"
            value={apiSecretKey}
            onChange={(e) => setApiSecretKey(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            background: "#0070f3",
            color: "#fff",
            border: 0,
            fontWeight: 600,
          }}
        >
          {isLoading ? "Authorizing..." : "Authorize"}
        </button>
        {error && <div style={{ color: "#c00", marginTop: 12 }}>{error}</div>}
      </form>
    </div>
  );
};

export default AuthorizePage;
