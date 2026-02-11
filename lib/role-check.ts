import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function authorizeRole(requiredRole: "PATIENT" | "DOCTOR") {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { authorized: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  if (session.user.role !== requiredRole) {
    return { authorized: false, response: NextResponse.json({ error: "Forbidden: Access Denied" }, { status: 403 }) };
  }

  return { authorized: true, user: session.user };
}