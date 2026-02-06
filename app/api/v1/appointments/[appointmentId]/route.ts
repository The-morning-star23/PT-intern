import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { appointmentId } = params;
    const body = await request.json();
    const { status, newStartTime } = body;

    // Prepare update data
    const updateData: {
      status?: string;
      startTime?: Date;
      endTime?: Date;
    } = {};

    if (status) updateData.status = status;
    if (newStartTime) {
      updateData.startTime = new Date(newStartTime);
      updateData.endTime = new Date(new Date(newStartTime).getTime() + 30 * 60000);
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}