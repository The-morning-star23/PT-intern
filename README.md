# Schedula - Backend Assignment

This repository contains the backend architectural design and a sample API for the Schedula Healthcare System.

### 🔗 Submission Links

- **Loom Video Explanation:** https://www.loom.com/share/34cc68cf05c141b69fc6c4af3415fec4
- **API Endpoint:** /api/hello

### 📊 Entity Relationship Diagram

Below is the database schema designed based on the provided wireframes.

(./docs/E-R Diagram.png)

### 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Design Tool:** dbdiagram.io

### 🚀 Getting Started

- Clone the repo: `git clone https://github.com/The-morning-star23/PT-intern.git`
- Install dependencies: `npm install`
- Run locally: `npm run dev`
- Access API: `http://localhost:3000/api/hello`

### 🗄️ Database Connection

I have successfully integrated a local PostgreSQL database with this Next.js project using Prisma ORM.

#### 🛠️ How to Verify the Connection

To verify the database connection on your local machine, follow these steps:

**Environment Setup:**

- Ensure you have a `.env` file in the root directory.
- The `DATABASE_URL` should follow this format: `postgresql://<username>:<password>@localhost:5432/schedula_db?schema=public`

**Sync the Schema:**

- Run the following command to sync the Prisma models with your local Postgres instance:

```bash
npx prisma db push
```

**Browse the Data:**

- Open Prisma Studio to view the connected tables and records:

```bash
npx prisma studio
```

You can see the User and Profile tables populated with test data.

### 📊 Database Architecture

The current schema includes:

- **User Table:** Stores authentication and mobile number data.
- **Profile Table:** Handles multi-member family profiles (e.g., Self, Wife, Son).

### 📅 Appointment Booking System - Phase 1 Backend

#### 🚀 Overview

This repository contains the core backend services for the Schedula Appointment Booking application. The current phase focuses on securing user onboarding via Google OAuth and establishing the foundation for doctor-patient interactions, including searching and availability management.

#### 🛠️ Features Completed

- **Google OAuth Integration:** Secure sign-in/sign-up for both Patients and Doctors using NextAuth v5
- **Role-Based Access Control:** Automated role assignment (PATIENT or DOCTOR) upon registration
- **Doctor Search API:** Search functionality allowing patients to filter doctors by specialization (case-insensitive)
- **Availability Management:** Dynamic endpoint for checking specific doctor schedules
- **Booking Engine:** Implementation of the Appointment model supporting family members (2-3 members per token)
- **Operational Logic:** APIs for appointment rescheduling, cancellation, and bulk doctor leave management
- **Interactive Documentation:** Integrated OpenAPI/Swagger UI for real-time API testing

#### 📡 API Endpoints

##### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/auth/signin | Initiates Google OAuth flow |

##### Doctors & Availability

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/doctor/search | Search doctors by specialization |
| GET | /api/v1/doctor/{id}/availability | Fetch availability for a specific doctor |

##### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/appointments/book | Book a new slot (supports family count) |
| PATCH | /api/v1/appointments/{id} | Reschedule or cancel an appointment |
| POST | /api/v1/doctor/leave | Bulk cancel appointments for doctor leave |

#### Technical Stack

- **Framework:** Next.js 15+ (Turbopack)
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** NextAuth.js (Auth.js v5)
- **Documentation:** Swagger / OpenAPI 3.0

### 📖 How to Test

- **Swagger UI:** Visit `http://localhost:3000/api-docs` to interact with all endpoints directly from your browser
- **Database:** Run `npx prisma studio` to view and manage local data in PostgreSQL
- **Local Dev:**

```bash
npm run dev
npx prisma generate
npx prisma db push
```


# Authentication & Role-Based Profile Experience

---

## 🚀 Task Overview

Completed the core backend infrastructure for a healthcare appointment booking system. This task involved implementing a secure OAuth2 authentication flow, dynamic role assignment, and an expanded database schema to handle detailed Doctor and Patient profiles.

## 🛠 Features Implemented

### 1. Advanced Authentication Flow

- **Google OAuth2 Integration:** Successfully integrated Google as the primary identity provider using NextAuth v4.
- **Session Management:** Implemented secure session handling with Prisma Adapter, ensuring user data persists across sessions in a PostgreSQL database.
- **Dynamic Sign-up/Sign-in:** Built a unified flow where first-time users are automatically registered, while returning users are securely logged in.

### 2. Role-Based Access Control (RBAC)

- **Role Initialization:** Developed a specialized setup-role API to allow users to choose between DOCTOR and PATIENT roles upon their first login.
- **Middleware Protection:** Implemented a custom authorizeRole utility to protect sensitive endpoints, ensuring only authorized roles can access or modify specific profile data.

### 3. Enhanced Schema & Profile Management

- **Doctor Experience (20 Fields):** Expanded the Doctor model to include 20 specific fields such as specialization, licenseNumber, consultationFee, clinicAddress, and experienceYears.
- **Patient Experience (18 Fields):** Expanded the Patient model to include 18 fields including bloodGroup, allergies, emergencyContact, and medicalHistory.
- **Partial Updates (PATCH):** Integrated logic to allow users to update individual profile fields without overwriting the entire record.

---

## 📂 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| /api/auth/signin | GET | NextAuth hosted sign-in gateway. |
| /api/auth/session | GET | Retrieves current user session and assigned role. |
| /api/user/setup-role | POST | Assigns a role and initializes the profile record. |
| /api/v1/doctor/profile | PATCH/GET | Managed 20-field Doctor professional profile. |
| /api/v1/patient/profile | PATCH/GET | Managed 18-field Patient medical profile. |

---

## 🧪 Technical Challenges Resolved

- **Database Synchronization:** Solved Prisma Client type mismatches using `npx prisma generate` and `db push` to sync 38+ profile fields.
- **Request Method Handling:** Resolved 405 Method Not Allowed errors by correctly mapping App Router exports to specific HTTP verbs (PATCH/POST).
- **Data Integrity:** Implemented upsert logic to prevent P2025 errors when updating records that do not yet exist in the profile tables.

---

## 🖥 Tech Stack Used

- **Framework:** Next.js 16 (App Router)
- **Authentication:** NextAuth.js v4
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Tools:** Thunder Client / Postman, Prisma Studio