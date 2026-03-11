"use server";

import { readFileSync, writeFileSync } from "fs";
import path from "path";

const sessionFilePath = path.join(process.cwd(), "lib", "session.json");

interface Session {
  userId: string;
  email: string;
  name: string;
}

export async function saveSession(user: { id: string; email: string; name: string }) {
  const session: Session = {
    userId: user.id,
    email: user.email,
    name: user.name,
  };
  writeFileSync(sessionFilePath, JSON.stringify(session, null, 2));
}

export async function clearSession() {
  const emptySession: Session = {
    userId: "",
    email: "",
    name: "",
  };
  writeFileSync(sessionFilePath, JSON.stringify(emptySession, null, 2));
}

export async function getSession(): Promise<Session | null> {
  try {
    const data = readFileSync(sessionFilePath, "utf-8");
    const session = JSON.parse(data);
    return session.userId ? session : null;
  } catch {
    return null;
  }
}
