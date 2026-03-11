import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/users";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const user = createUser(name, email, password);

    return NextResponse.json(
      { message: "User registered successfully", user: { id: user.id, name, email } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
