import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
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
    // Log the error for debugging, which also fixes the 'unused-vars' lint error
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}