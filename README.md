# Next.js Authentication App

A secure and modern authentication system built with Next.js 14, NextAuth.js, and Prisma. This application provides a complete authentication flow with email/password and OAuth providers (Google, GitHub), email verification, password reset, and protected routes.

## 🚀 Features

- **Authentication Methods**
  - Email & Password
  - OAuth (Google, GitHub)
  - Email verification
  - Password reset

- **Security**
  - JWT-based session management
  - Protected routes with middleware
  - Role-based access control (Admin/User)
  - Secure password hashing with bcrypt

- **User Experience**
  - Responsive design with Tailwind CSS
  - Form validation with Zod
  - Loading states and error handling
  - Toast notifications

- **Database**
  - Prisma ORM with MySQL
  - Schema migrations
  - Type-safe database queries

## 🛠️ Technologies Used

- **Frontend**
  - Next.js 14 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui components
  - React Hook Form
  - Zod for schema validation

- **Backend**
  - Next.js API Routes
  - NextAuth.js v5 (beta)
  - Prisma ORM
  - MySQL Database

- **Authentication**
  - NextAuth.js
  - OAuth (Google, GitHub)
  - JWT

- **Email**
  - Nodemailer
  - Email templates with React Email

## 📦 Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- MySQL database
- Google OAuth credentials
- GitHub OAuth credentials
- Email service credentials (for email verification and password reset)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd next-auth
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following variables:
   or copy the .env.example

   ```
   DATABASE_URL="mysql://user:password@localhost:3306/db_name"
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000

   # OAuth Providers
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # Email Configuration (for Nodemailer)
   EMAIL_SERVER=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_FROM=no-reply@example.com
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🏗️ Project Structure

```
.
├── app/                    # App Router
│   ├── (protected)/       # Protected routes
│   ├── api/               # API routes
│   └── auth/              # Authentication pages
├── actions/               # Server actions
├── components/            # Reusable UI components
│   ├── auth/              # Auth components
│   └── ui/                # Shadcn/ui components
├── data/                  # Database queries
├── lib/                   # Utility functions
├── prisma/                # Prisma schema
├── public/                # Static files
└── schemas/               # Zod validation schemas
```

## 🔒 Authentication Flow

1. **Registration**
   - User signs up with email and password
   - Verification email is sent
   - User verifies email to activate account

2. **Login**
   - Email/Password or OAuth login
   - JWT session is created
   - Redirect to protected route

3. **Password Reset**
   - User requests password reset
   - Reset token is generated and emailed
   - User sets new password

## 🛡️ Middleware Protection

- Public routes: Accessible without authentication
- Auth routes: Redirect authenticated users to home
- Protected routes: Require authentication
- API routes: Protected with NextAuth.js

## 🙏 Documentation Used

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Shadcn/ui](https://ui.shadcn.com/)
