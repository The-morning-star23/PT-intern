import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { doctorId, leaveDate } = await request.json();
    
    const startOfDay = new Date(leaveDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(leaveDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Bulk update all appointments for that doctor on that day to CANCELLED
    const result = await prisma.appointment.updateMany({
      where: {
        doctorId,
        startTime: { gte: startOfDay, lte: endOfDay },
      },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ 
      message: `Successfully cancelled ${result.count} appointments for leave.` 
    }, { status: 200 });
  } catch (error) {
    console.error("Bulk Cancellation Error:", error);
    return NextResponse.json({ error: "Bulk cancellation failed" }, { status: 500 });
  }
}