# Nextpress Chat

## Table of Contents

- [Nextpress Chat](#nextpress-chat)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Key Features](#key-features)
  - [Technologies Used](#technologies-used)
    - [Frontend Technologies](#frontend-technologies)
    - [Backend Technologies](#backend-technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation and Setup](#installation-and-setup)
      - [Frontend Setup](#frontend-setup)
      - [Backend Setup](#backend-setup)

## Overview

Nextpress Chat is a modern real-time messaging application built with Next.js and Express. It allows users to connect with friends, exchange messages in real-time, and manage their profile. The application provides a seamless and responsive chat experience with features like online status indicators and avatar customization.

![Main Chat Interface](./readme-images/main-chat.png)
![User Profile View](./readme-images/user-view.png)
![Login Page](./readme-images/log-in-page.png)

## Key Features

- **Real-time Messaging**: Exchange messages with contacts in real-time using WebSocket technology
- **Contact Management**: View your contacts and add new friends
- **User Authentication**: Secure signup, login, and password recovery flows
- **Profile Customization**: Change your avatar and manage your profile
- **Online Status**: See which of your contacts are currently online
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Message History**: Access and browse through your conversation history

## Technologies Used

### Frontend Technologies

- **Framework**: [Next.js 14](https://nextjs.org/) with React 18
- **TypeScript**: For type-safe code and improved developer experience
- **Real-time Communication**: WebSockets via react-use-websocket
- **State Management**: React Query (TanStack Query) for server state
- **Form Management**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with components from Radix UI
- **Authentication**: Custom JWT-based authentication system

### Backend Technologies

- **Framework**: Node.js with Express.js
- **Language**: TypeScript for type-safe development
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Communication**: WebSockets (ws) for real-time messaging
- **Email Service**: Nodemailer for sending emails (password reset, email confirmation)

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- pnpm for package management
- Docker and Docker Compose (for running PostgreSQL database)

### Installation and Setup

#### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nextpress-chat.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd nextpress-chat/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Configure environment variables:

   - Create a `.env` file based on `.env.example`
   - Set the following variables:
     ```
     NEXT_PUBLIC_WS_SERVER_URL=ws://localhost:3001
     URL=http://localhost:3000
     NEXT_PUBLIC_API_URL=http://localhost:3001
     ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd nextpress-chat/backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:

   - Create a `.env` file based on `.env.example`
   - Set the following variables:

     ```
     POSTGRES_USER="your_postgres_user"
     POSTGRES_PASSWORD="your_postgres_password"
     POSTGRES_DB="nextpress-chat"
     DATABASE_URL="postgresql://your_postgres_user:your_postgres_password@localhost:54322/nextpress-chat"

     PORT=3001
     JWT_SECRET_KEY=your_jwt_secret_key
     MAIL_FROM=your_email@example.com
     MAIL_PASSWORD=your_email_password
     FRONTEND_URL="http://localhost:3000"
     ```

4. Start the PostgreSQL database using Docker:

   ```bash
   docker-compose -f docker-compose.local.yml up -d
   ```

5. Run Prisma migrations to set up the database:

   ```bash
   pnpm db-migrate:dev
   ```

6. Start the development server:

   ```bash
   pnpm dev
   ```

7. The backend server will be running at [http://localhost:3001](http://localhost:3001)
