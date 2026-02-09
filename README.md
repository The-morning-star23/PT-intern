# Schedula - Backend Assignment

This repository contains the backend architectural design and a sample API for the Schedula Healthcare System.

## 🔗 Submission Links
- **Loom Video Explanation:** (https://www.loom.com/share/34cc68cf05c141b69fc6c4af3415fec4)
- **API Endpoint:** `/api/hello`

## 📊 Entity Relationship Diagram
Below is the database schema designed based on the provided wireframes.

![ER Diagram](./docs/ER-Diagram.png)

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Design Tool:** dbdiagram.io

## 🚀 Getting Started
1. Clone the repo: `git clone https://github.com/The-morning-star23/PT-intern.git`
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Access API: `http://localhost:3000/api/hello`

## 🗄️ Database Connection

I have successfully integrated a local **PostgreSQL** database with this Next.js project using **Prisma ORM**.

### 🛠️ How to Verify the Connection
To verify the database connection on your local machine, follow these steps:

1. **Environment Setup**: 
   - Ensure you have a `.env` file in the root directory.
   - The `DATABASE_URL` should follow this format: 
     `postgresql://<username>:<password>@localhost:5432/schedula_db?schema=public`

2. **Sync the Schema**:
   - Run the following command to sync the Prisma models with your local Postgres instance:
     ```bash
     npx prisma db push
     ```

3. **Browse the Data**:
   - Open **Prisma Studio** to view the connected tables and records:
     ```bash
     npx prisma studio
     ```
   - You can see the `User` and `Profile` tables populated with test data.

### 📊 Database Architecture
The current schema includes:
- **User Table**: Stores authentication and mobile number data.
- **Profile Table**: Handles multi-member family profiles (e.g., Self, Wife, Son).


## 📅 Appointment Booking System - Phase 1 Backend

### 🚀 Overview
This repository contains the core backend services for the Schedula Appointment Booking application. The current phase focuses on securing user onboarding via Google OAuth and establishing the foundation for doctor-patient interactions, including searching and availability management.

### 🛠️ Features Completed

- **Google OAuth Integration**: Secure sign-in/sign-up for both Patients and Doctors using NextAuth v5
- **Role-Based Access Control**: Automated role assignment (PATIENT or DOCTOR) upon registration
- **Doctor Search API**: Search functionality allowing patients to filter doctors by specialization (case-insensitive)
- **Availability Management**: Dynamic endpoint for checking specific doctor schedules
- **Booking Engine**: Implementation of the Appointment model supporting family members (2-3 members per token)
- **Operational Logic**: APIs for appointment rescheduling, cancellation, and bulk doctor leave management
- **Interactive Documentation**: Integrated OpenAPI/Swagger UI for real-time API testing

### 📡 API Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/signin` | Initiates Google OAuth flow |

#### Doctors & Availability
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/doctor/search` | Search doctors by specialization |
| GET | `/api/v1/doctor/{id}/availability` | Fetch availability for a specific doctor |

#### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/appointments/book` | Book a new slot (supports family count) |
| PATCH | `/api/v1/appointments/{id}` | Reschedule or cancel an appointment |
| POST | `/api/v1/doctor/leave` | Bulk cancel appointments for doctor leave |

### Technical Stack
- **Framework:** Next.js 15+ (Turbopack)
- **Database:** PostgreSQL via Prisma ORM
- **Authentication:** NextAuth.js (Auth.js v5)
- **Documentation:** Swagger / OpenAPI 3.0

### 📖 How to Test

1. **Swagger UI**: Visit `http://localhost:3000/api-docs` to interact with all endpoints directly from your browser
2. **Database**: Run `npx prisma studio` to view and manage local data in PostgreSQL
3. **Local Dev**:
   ```bash
   npm run dev
   npx prisma generate
   npx prisma db push