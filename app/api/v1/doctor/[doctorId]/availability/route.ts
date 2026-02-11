import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authorizeRole } from "@/lib/role-check";

/**
 * @openapi
 * /api/v1/doctor/{doctorId}/availability:
 *   get:
 *     summary: Get doctor availability (Public)
 *     description: Returns the availability slots for a specific doctor
 *   post:
 *     summary: Add doctor availability (Doctor Only)
 *     description: Allows a doctor to manage their own schedule
 */

// --- GET: Publicly view availability ---
export async function GET(
  req: Request,
  { params }: { params: { doctorId: string } }
) {
  try {
    const { doctorId } = params;

    const availability = await prisma.availability.findMany({
      where: { doctorId: doctorId },
    });

    if (!availability || availability.length === 0) {
      return NextResponse.json({ message: "No availability found" }, { status: 404 });
    }

    return NextResponse.json(availability, { status: 200 });
  } catch (error) {
    console.error("Availability GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// --- POST: Doctor manages their own availability ---
export async function POST(
  req: Request,
  { params }: { params: { doctorId: string } }
) {
  try {
    // 1. Role-Based Security: Ensure the user is a logged-in DOCTOR
    const { authorized, user, response } = await authorizeRole("DOCTOR");
    if (!authorized) return response;

    // 2. Ownership Check: Ensure Doctor A cannot edit Doctor B's schedule
    const doctorProfile = await prisma.doctor.findUnique({
      where: { userId: user.id }
    });

    if (!doctorProfile || doctorProfile.id !== params.doctorId) {
      return NextResponse.json(
        { error: "Forbidden: You can only manage your own schedule" }, 
        { status: 403 }
      );
    }

    // 3. Process the new slot data
    const { dayOfWeek, startTime, endTime, type } = await req.json();

    const newSlot = await prisma.availability.create({
      data: {
        doctorId: params.doctorId,
        dayOfWeek,
        startTime,
        endTime,
        type: type || "STREAM",
      },
    });

    return NextResponse.json(newSlot, { status: 201 });
  } catch (error) {
    console.error("Availability POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}