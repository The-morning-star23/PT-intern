import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ redirect: "/auth/signin" }, { status: 401 });
  }

  const role = session.user.role;

  // Logic to handle the "Dashboard Redirect Bug"
  if (role === "DOCTOR") {
    return NextResponse.json({ redirect: "/dashboard/doctor" });
  } else if (role === "PATIENT") {
    return NextResponse.json({ redirect: "/dashboard/patient" });
  } else {
    // If no role is assigned yet, send them to the onboarding role-selection
    return NextResponse.json({ redirect: "/onboarding" });
  }
}