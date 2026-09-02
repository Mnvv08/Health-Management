<div align="center">
  <h1>🏥 MediCare+</h1>
  <p><strong>Your Complete Digital Healthcare Companion</strong></p>

  <!-- Badges -->
  <a href="https://health-management-ecru.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-00E5FF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</div>

<br />

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ℹ️ About the Project
MediCare+ is a full-stack, modern health management web application designed to bridge the gap between patients and healthcare providers. It provides a seamless interface for discovering top-rated hospitals, browsing specialized doctors, checking real-time availability, and securely booking appointments, all from one unified dashboard.

## 🚀 Live Demo
**URL:** [https://health-management-ecru.vercel.app](https://health-management-ecru.vercel.app)

> **⚠️ Note on Performance:** The backend API is hosted on Render's free tier. If the service has been inactive, **the first request (like logging in or loading data) may take 30-60 seconds** as the server wakes up from sleep. Subsequent requests will be lightning fast!

## 📸 Screenshots

<!-- Add screenshots here -->
![Landing Page](placeholder-image-url-1)
*Landing Page with Hero Section*

![Hospital Directory](placeholder-image-url-2)
*Nearby Hospitals Listing*

![Doctor Booking](placeholder-image-url-3)
*Doctor Appointment Booking UI*

## ✨ Features
* 🎨 **Beautiful UI:** Stunning landing page with a modern hero section.
* 🏥 **Hospital Directory:** Discover nearby hospitals, filter by services, and read detailed facility reviews.
* 👨‍⚕️ **Doctor Search:** Browse doctors with intelligent specialty filters.
* 📅 **Appointment Management:** Real-time appointment booking interface with double-booking prevention.
* 🚑 **Emergency Services:** Dedicated SOS page, first aid guides, and instant emergency contacts.
* ℹ️ **About Page:** Project mission and team information.
* 🔒 **Secure Authentication:** Robust JWT-based Register and Login system.
* 📊 **User Dashboard:** Personalized hub to view, manage, and cancel active appointments.
* 📱 **Fully Responsive:** Flawless experience across desktop, tablet, and mobile devices.

## 💻 Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, React Router DOM, Axios, Lucide React |
| **Backend** | Node.js, Express.js, JWT, bcryptjs, CORS |
| **Database** | MongoDB Atlas, Mongoose |
| **Deployment** | Vercel (Frontend), Render (Backend) |

## 📂 Project Structure

```text
Health-Management/
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── config/           # DB connection
│   │   ├── controllers/      # Route logic
│   │   ├── middleware/       # JWT Auth & Error handling
│   │   ├── models/           # Mongoose schemas
│   │   └── routes/           # Express routers
│   ├── server.js             # Entry point
│   └── package.json
│
├── medicare-plus/            # React + Vite frontend
│   ├── src/
│   │   ├── api/              # Axios services
│   │   ├── components/       # Reusable UI elements
│   │   ├── context/          # React context providers
│   │   ├── pages/            # View components
│   │   ├── App.jsx           # Main router
│   │   └── main.jsx          # React DOM render
│   ├── tailwind.config.js    # Tailwind setup
│   └── package.json
│
└── README.md
```

## 🛠️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites
* Node.js (v16 or higher)
* MongoDB Database (Local or Atlas)
* Git

### 1. Clone the repo
```bash
git clone https://github.com/Mnvv08/Health-Management.git
cd Health-Management
```

### 2. Backend Setup
Navigate into the backend and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

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

Create a `.env` file in the `/medicare-plus` directory:
```env
VITE_API_URL=http://localhost:5001/api
```

Start the frontend development server:
```bash
npm run dev
```
The app will be running at `http://localhost:5173`.

## 🔌 API Endpoints

The RESTful API provides the following endpoints:

| Route | Method | Endpoint | Description |
| :--- | :---: | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Register a new user |
| **Auth** | `POST` | `/api/auth/login` | Authenticate user & get token |
| **Auth** | `GET` | `/api/auth/me` | Get current logged-in user |
| **Hospitals** | `GET` | `/api/hospitals` | Get all hospitals |
| **Hospitals** | `GET` | `/api/hospitals/:id`| Get specific hospital details |
| **Doctors** | `GET` | `/api/doctors` | Get all doctors |
| **Doctors** | `GET` | `/api/doctors/:id` | Get specific doctor details |
| **Appointments**| `POST` | `/api/appointments` | Book a new appointment |
| **Appointments**| `GET` | `/api/appointments/slots` | Get booked slots for a doctor |
| **Appointments**| `GET` | `/api/appointments/my` | Get all appointments for user |
| **Appointments**| `PUT` | `/api/appointments/:id/cancel`| Cancel an appointment |

## 🌍 Deployment

* **Frontend (Vercel):** The frontend is seamlessly deployed using Vercel. Ensure `VITE_API_URL` is set in the Vercel project environment variables pointing to the Render backend URL.
* **Backend (Render):** Deployed as a Node Web Service on Render. Environment variables (MONGO, JWT, FRONTEND_URL) are configured within the Render dashboard.
* **Database (MongoDB Atlas):** Hosted securely on the cloud. The Render instance's IP configuration is managed in Atlas network access.

## 🤝 Contributing

Contributions are always welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Manav**
* **GitHub:** [@Mnvv08](https://github.com/Mnvv08)
* **Project Link:** [https://github.com/Mnvv08/Health-Management](https://github.com/Mnvv08/Health-Management)
