import { AuthForm } from "@/components/auth-form";

type Params = Promise<{
  state: string;
  client_id: string;
  redirect_uri: string;
}>;

export default async function AuthorizePage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { state, client_id, redirect_uri } = await searchParams;

  if (!state || !client_id || !redirect_uri) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h1 className="error-title">Missing Required Parameters</h1>
          <p className="error-message">
            The authorization request is missing required parameters. Please
            ensure state, client_id, and redirect_uri are provided.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <AuthForm state={state} clientId={client_id} redirectUri={redirect_uri} />
    </div>
  );
}
