import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "lib", "users.json");

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export function readUsers(): User[] {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
}

export function writeUsers(users: User[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

export function createUser(name: string, email: string, password: string): User {
  const users = readUsers();
  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export function findUserByEmail(email: string): User | undefined {
  const users = readUsers();
  return users.find((u) => u.email === email);
}
