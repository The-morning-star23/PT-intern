import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  request: Request,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { appointmentId } = params;
    const body = await request.json();
    const { status, newStartTime } = body;

    // 1. Fetch existing appointment to check ownership
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { doctor: true, patient: true }
    });

    if (!existingAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // 2. Role-Based Access Control (RBAC) Logic
    const isDoctor = session.user.role === "DOCTOR";
    const isPatient = session.user.role === "PATIENT";

    // Ensure the Doctor only edits THEIR appointments
    if (isDoctor && existingAppointment.doctor.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden: Not your patient" }, { status: 403 });
    }

    // Ensure the Patient only edits THEIR appointments
    if (isPatient && existingAppointment.patient.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden: Not your appointment" }, { status: 403 });
    }

    // 3. Prepare update data (Your existing logic)
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