# 🏥 MediCare+

A modern, responsive Health Management Web Application for discovering hospitals, browsing doctor directories, and seamlessly booking medical appointments.

MediCare+ bridges the gap between patients and healthcare providers. It provides an intuitive interface for users to find the right medical care, check doctor availability in real-time, and securely manage their health appointments from a personalized dashboard.

## ✨ Features

* **User Authentication:** Secure JWT-based registration and login system with encrypted passwords.
* **Hospital Discovery:** Browse a comprehensive directory of hospitals, view details, and filter by services.
* **Doctor Directory:** Search for doctors, view their profiles, specialties, and real-time availability.
* **Appointment Booking:** Real-time appointment scheduling system with double-booking prevention.
* **User Dashboard:** A personalized space to manage profile details, view upcoming appointments, and securely cancel bookings.
* **Emergency Services:** Quick access portal for emergency hotlines, ambulance services, and immediate care guidelines.

## 🖥️ Screenshots / Preview

<!-- Add application screenshots here -->
*(Screenshots of the Dashboard, Hospital Directory, and Appointment Booking flow will be added here)*

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 19 (via Vite)
* **Styling:** Tailwind CSS v4
* **Icons:** Lucide React
* **Routing:** React Router DOM v7
* **HTTP Client:** Axios

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose v9
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **Middleware:** CORS, custom error handlers

## 📂 Project Structure

```text
Health-Management/
├── backend/                  # Express server & API
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Request handlers (auth, hospitals, doctors, appointments)
│   │   ├── middleware/       # JWT protection & error handling
│   │   ├── models/           # Mongoose schemas
│   │   └── routes/           # API route definitions
│   ├── server.js             # Express application entry point
│   └── package.json
│
├── medicare-plus/            # React frontend application
│   ├── src/
│   │   ├── api/              # Axios instance and API services
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── pages/            # Page components (Home, Dashboard, Doctors, etc.)
│   │   ├── App.jsx           # Main application router
│   │   └── main.jsx          # React DOM rendering
│   ├── tailwind.config.js    # Tailwind styling configuration
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/Mnvv08/Health-Management.git
cd Health-Management
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (see Environment Variables below).

Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd medicare-plus
npm install
```

Create a `.env` file in the `medicare-plus` directory.

Start the frontend development server:
```bash
npm run dev
```

## 🔐 Environment Variables

You need to configure the following environment variables. Do not commit these files to version control.

**`backend/.env`**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**`medicare-plus/.env`**
```env
VITE_API_URL=http://localhost:5001/api
```

## 🚀 Running the Application

Once both servers are running:
* **Frontend:** Open your browser and navigate to `http://localhost:5173`
* **Backend API:** The API will be available at `http://localhost:5001/api`

## 🔌 API / Backend

The RESTful API provides the following major endpoints:

### Authentication
* `POST /api/auth/register` - Create a new user account
* `POST /api/auth/login` - Authenticate a user and return a JWT
* `GET /api/auth/me` - Get current authenticated user profile

### Hospitals
* `GET /api/hospitals` - Retrieve all hospitals
* `GET /api/hospitals/:id` - Get specific hospital details
* `POST /api/hospitals` - Add a new hospital (Admin)

### Doctors
* `GET /api/doctors` - Retrieve all doctors
* `GET /api/doctors/:id` - Get specific doctor details
* `POST /api/doctors` - Add a new doctor profile (Admin)

### Appointments
* `POST /api/appointments` - Book a new appointment
* `GET /api/appointments/slots` - Get booked slots for a specific doctor & date
* `GET /api/appointments/my` - Retrieve all appointments for the logged-in user
* `GET /api/appointments/:id` - Get specific appointment details
* `PUT /api/appointments/:id/cancel` - Cancel an existing appointment

## 🗄️ Database

This project uses **MongoDB** as its primary database, interacting through the Mongoose ODM.
Core collections include:
* **Users:** Stores authentication credentials, profile data, and roles.
* **Hospitals:** Stores hospital details, locations, and available facilities.
* **Doctors:** Stores physician profiles, specialties, and affiliations.
* **Appointments:** Links users with doctors for specific time slots, managing booking states.

## 🔒 Authentication & Security

* **JWT Authentication:** Stateful sessions are avoided. A JSON Web Token is issued on login and must be attached as a `Bearer` token in the `Authorization` header for protected routes.
* **Password Hashing:** Passwords are cryptographically hashed using `bcryptjs` via Mongoose pre-save hooks before entering the database.
* **Protected Routes:** Both the React frontend (via AuthContext) and Express backend (via custom middleware) strictly protect sensitive routes from unauthenticated access.

## 🌍 Deployment

The application is architected for modern cloud deployment:
* **Frontend:** Optimized for Vercel. Ensure `VITE_API_URL` is set in the Vercel dashboard.
* **Backend:** Configured for Render. Ensure all secrets are added to the Render environment and `NODE_ENV` is set to `production`.

## 🧪 Testing

Testing infrastructure is not currently included in this version.

## 🔮 Future Improvements

* Telemedicine video consultations integration
* Patient reviews and 5-star rating system for doctors
* Electronic Health Records (EHR) document upload
* Real-time push notifications for appointment reminders
* Interactive map integration for nearby hospital discovery

## 🤝 Contributing

Contributions are welcome! Please follow this workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

Licensing has not yet been specified for this project.

## 👨‍💻 Author

**Mnvv08**  
*(Sourced from repository git history)*
