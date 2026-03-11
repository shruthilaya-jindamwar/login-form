// Simple in-memory user store (development only)
// In production, use a database

interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this should be hashed
}

const users: User[] = [];

export function createUser(name: string, email: string, password: string): User {
  const user = {
    id: Date.now().toString(),
    name,
    email,
    password,
  };
  users.push(user);
  return user;
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function getAllUsers(): User[] {
  return users;
}
