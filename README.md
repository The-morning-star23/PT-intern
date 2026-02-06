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
