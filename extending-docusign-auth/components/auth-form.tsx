"use client";

import type React from "react";
import { useState } from "react";
import { authorizeUser } from "@/lib/actions";

interface AuthFormProps {
  state: string;
  clientId: string;
  redirectUri: string;
}

export function AuthForm({ state, clientId, redirectUri }: AuthFormProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await authorizeUser(apiKey, state, redirectUri);
    } catch (error) {
      console.error("Authorization failed:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="card max-w-md w-full">
      <div className="card-header">
        <h2 className="card-title">Connect to TaskVibe</h2>
        <p className="card-description">
          To authenticate with TaskVibe task management tool, please enter your
          API secret key below.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-content">
          <div className="form-group">
            <label htmlFor="apiKey" className="form-label">
              API Secret Key
            </label>
            <input
              id="apiKey"
              type="password"
              className="form-input"
              placeholder="Enter your TaskVibe API key starting with tv_"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <input type="hidden" name="state" value={state} />
          <input type="hidden" name="redirectUri" value={redirectUri} />
        </div>
        <div className="card-footer">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Connecting..." : "Connect"}
          </button>
        </div>
      </form>
    </div>
  );
}
