import { prisma } from "@/lib/prisma";
import { authorizeRole } from "@/lib/role-check";
import { NextResponse } from "next/server";

export async function GET() {
  const { authorized, user, response } = await authorizeRole("DOCTOR");
  if (!authorized) return response;

  const profile = await prisma.doctor.findUnique({
    where: { userId: user.id },
    include: { user: { select: { name: true, email: true, image: true } } }
  });

  return NextResponse.json(profile);
}

export async function PATCH(req: Request) {
  const { authorized, user, response } = await authorizeRole("DOCTOR");
  if (!authorized) return response;

  const data = await req.json();

  const updatedDoctor = await prisma.doctor.update({
    where: { userId: user.id },
    data: {
      specialization: data.specialization,
      licenseNumber: data.licenseNumber,
      experienceYears: data.experienceYears,
      bio: data.bio,
      hospitalName: data.hospitalName,
      consultationFee: data.consultationFee,
      education: data.education,
      phone: data.phone,
      clinicAddress: data.clinicAddress,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      consultationType: data.consultationType,
      languages: data.languages,
      achievements: data.achievements,
      profileStatus: data.profileStatus,
    },
  });

  return NextResponse.json(updatedDoctor);
}