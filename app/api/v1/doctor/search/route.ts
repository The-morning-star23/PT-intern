import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialization = searchParams.get("specialization");

    const doctors = await prisma.doctor.findMany({
      where: {
        // If specialization is provided, filter by it; otherwise, return all
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