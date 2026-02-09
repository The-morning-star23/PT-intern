import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    // 1. Security Check: Only logged-in patients can book
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { doctorId, startTime, familyCount } = body;

    // 2. Calculate end time (assuming a standard 30-min slot for now)
    const start = new Date(startTime);
    const end = new Date(start.getTime() + 30 * 60000);

    // 3. Create the appointment in the database
    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientId: session.user.id,
        startTime: start,
        endTime: end,
        familyCount: familyCount || 1, // Supports the 2-3 members requirement
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}