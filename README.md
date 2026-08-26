# MediCare+

MediCare+ is a modern, responsive Health Management Web Application built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS. It allows users to search for hospitals, browse doctor directories, and book medical appointments seamlessly.

## Features
- **User Authentication:** Secure JWT-based login and registration.
- **Hospital Directory:** Browse and filter hospitals by speciality and rating.
- **Doctor Directory:** Search for doctors, view their profiles, and check their availability.
- **Appointment Booking:** Real-time appointment booking system with double-booking prevention.
- **User Dashboard:** Manage profile details, view upcoming appointments, and cancel bookings.
- **Emergency Services:** Quick access to emergency hotlines and ambulance services.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS v4, Lucide React (Icons), React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Mnvv08/Health-Management.git
cd Health-Management
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd medicare-plus
npm install
```
Create a `.env` file in the `medicare-plus` directory:
```env
VITE_API_URL=http://localhost:5001/api
```
Start the frontend server:
```bash
npm run dev
```

## Deployment Notes
- **Backend (Render):** Set `NODE_ENV=production` and `FRONTEND_URL=https://your-vercel-url.vercel.app`. The first request might take 30-60 seconds if hosted on a free tier.
- **Frontend (Vercel):** The `vercel.json` ensures that React Router works correctly on refresh. Ensure you set `VITE_API_URL` to your live backend URL in the Vercel dashboard.

---
*Built with ❤️ for better healthcare access.*
