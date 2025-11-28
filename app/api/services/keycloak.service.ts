const KEYCLOAK_URL = process.env.NEXT_PUBLIC_KEYCLOAK_URL!;
const REALM = process.env.NEXT_PUBLIC_KEYCLOAK_REALM!;
const CLIENT_ID = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET!;

// endpoint token de keycloak
const TOKEN_URL = `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`;

export async function loginKeycloak(username: string, password: string) {
  const body = new URLSearchParams();
  body.append("grant_type", "password");
  body.append("client_id", CLIENT_ID);
  body.append("client_secret", CLIENT_SECRET);
  body.append("username", username);
  body.append("password", password);

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  return response.json();
}
