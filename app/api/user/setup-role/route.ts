import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Security Check: Is the user logged in?
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();

    // 2. Validation: Is the role valid?
    if (role !== "PATIENT" && role !== "DOCTOR") {
      return NextResponse.json({ error: "Invalid role selected" }, { status: 400 });
    }

    const userId = session.user.id;

    // 3. Update User and Create Profile in a single Transaction
    // This ensures either BOTH succeed or BOTH fail (no partial data)
    const result = await prisma.$transaction(async (tx) => {
      // Update the main User role
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { role: role },
      });

      // Initialize the specific profile
      if (role === "DOCTOR") {
        await tx.doctor.create({
          data: {
            userId: userId,
            specialization: "General Physician", // Placeholder to reach field count
            isVerified: false,
            rating: 0.0,
          },
        });
      } else {
        await tx.patient.create({
          data: {
            userId: userId,
            // You can add more placeholder fields here for the 18-field requirement
          },
        });
      }

      return updatedUser;
    });

    return NextResponse.json({ message: "Profile setup complete", user: result });

  } catch (error) {
    console.error("SETUP_ROLE_ERROR", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}