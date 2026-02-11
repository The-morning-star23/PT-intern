import { prisma } from "@/lib/prisma";
import { authorizeRole } from "@/lib/role-check";
import { NextResponse } from "next/server";

export async function GET() {
  const { authorized, user, response } = await authorizeRole("PATIENT");
  if (!authorized) return response;

  const profile = await prisma.patient.findUnique({
    where: { userId: user.id },
    include: { user: { select: { name: true, email: true } } }
  });

  return NextResponse.json(profile);
}

export async function PATCH(req: Request) {
  const { authorized, user, response } = await authorizeRole("PATIENT");
  if (!authorized) return response;

  const data = await req.json();

  const updatedPatient = await prisma.patient.update({
    where: { userId: user.id },
    data: {
      phoneNumber: data.phoneNumber,
      bloodGroup: data.bloodGroup,
      address: data.address,
      emergencyContact: data.emergencyContact,
      allergies: data.allergies,
      medicalHistory: data.medicalHistory,
      // Add other fields here to reach your 18-field count
    },
  });

  return NextResponse.json(updatedPatient);
}