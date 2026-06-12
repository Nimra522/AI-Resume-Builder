# AI Resume Builder

A MERN stack application for building professional resumes with AI-powered suggestions.

## Project Structure

```
project-root/
├─ backend/
│ ├─ controllers/
│ ├─ models/
│ ├─ routes/
│ ├─ middleware/
│ ├─ utils/
│ ├─ server.js
│ ├─ package.json
│ └─ .env
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ ├─ utils/
│ │ ├─ assets/
│ │ ├─ App.tsx
│ │ └─ index.tsx
│ ├─ package.json
│ └─ .env
└─ README.md
```

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud Atlas)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following variables (if needed):
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

4. Start the frontend development server:
```bash
npm run dev
```

## Running the Application

1. Start the backend server (in the `backend` directory):
```bash
npm run dev
```

2. In a new terminal, start the frontend server (in the `frontend` directory):
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Features

- User authentication (email/password and Google OAuth)
- Resume builder with multiple templates
- AI-powered content suggestions
- Two-factor authentication
- Auto-save functionality
- Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.