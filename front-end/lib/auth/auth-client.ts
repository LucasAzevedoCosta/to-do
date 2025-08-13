import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3001",
  credentials: true,
});

export const { signIn, signOut, useSession, getSession } = authClient;