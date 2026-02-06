import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @openapi
 * /api/v1/doctor/{doctorId}/availability:
 *   get:
 *     summary: Get doctor availability
 *     description: Returns the availability slots for a specific doctor
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the doctor
 *     responses:
 *       200:
 *         description: Availability slots found
 *       404:
 *         description: No availability found
 */

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
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}