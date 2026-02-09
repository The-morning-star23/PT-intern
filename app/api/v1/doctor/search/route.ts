import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @openapi
 * /api/v1/doctor/search:
 *   get:
 *     summary: Search doctors by specialization
 *     description: Returns a list of doctors filtered by specialization
 *     parameters:
 *       - in: query
 *         name: specialization
 *         schema:
 *           type: string
 *         description: The specialization to filter by (e.g., Cardiologist)
 *     responses:
 *       200:
 *         description: Array of doctor objects
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get("specialization");

    const doctors = await prisma.doctor.findMany({
      where: {
        specialization: specialization 
          ? { contains: specialization, mode: 'insensitive' } 
          : undefined,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}