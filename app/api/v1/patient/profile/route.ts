import { prisma } from "@/lib/prisma";
import { authorizeRole } from "@/lib/role-check";
import { NextResponse } from "next/server";

export async function GET() {
  const { authorized, user, response } = await authorizeRole("PATIENT");
  if (!authorized) return response;

  const profile = await prisma.patient.findUnique({
    where: { userId: user.id },
    include: { user: { select: { name: true, email: true, image: true } } }
  });

  return NextResponse.json(profile);
}

export async function PATCH(req: Request) {
  const { authorized, user, response } = await authorizeRole("PATIENT");
  if (!authorized) return response;

  try {
    const data = await req.json();

    // Use upsert to handle cases where the profile record doesn't exist yet
    const updatedPatient = await prisma.patient.upsert({
      where: { userId: user.id },
      update: {
        phoneNumber: data.phoneNumber,
        bloodGroup: data.bloodGroup,
        address: data.address,
        emergencyContact: data.emergencyContact,
        allergies: data.allergies,
        medicalHistory: data.medicalHistory,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        weight: data.weight,
        height: data.height,
        occupation: data.occupation,
        maritalStatus: data.maritalStatus,
        smokingStatus: data.smokingStatus,
        alcoholStatus: data.alcoholStatus,
        chronicConditions: data.chronicConditions,
        insuranceProvider: data.insuranceProvider,
        insuranceNumber: data.insuranceNumber,
        preferredLanguage: data.preferredLanguage,
      },
      create: {
        userId: user.id,
        phoneNumber: data.phoneNumber,
        bloodGroup: data.bloodGroup,
        address: data.address,
        emergencyContact: data.emergencyContact,
        allergies: data.allergies,
        medicalHistory: data.medicalHistory,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        weight: data.weight,
        height: data.height,
        occupation: data.occupation,
        maritalStatus: data.maritalStatus,
        smokingStatus: data.smokingStatus,
        alcoholStatus: data.alcoholStatus,
        chronicConditions: data.chronicConditions,
        insuranceProvider: data.insuranceProvider,
        insuranceNumber: data.insuranceNumber,
        preferredLanguage: data.preferredLanguage,
      },
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("PATIENT_PATCH_ERROR", error);
    return NextResponse.json({ error: "Failed to update patient profile" }, { status: 500 });
  }
}