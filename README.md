# UserHub Frontend (React + Vite + TailwindCSS)

This is the frontend for the UserHub platform MVP.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Frontend will run at: [http://localhost:3000](http://localhost:3000)

Make sure your FastAPI backend is running at [http://localhost:8000](http://localhost:8000)

### 3. Build for Production

```bash
npm run build
```

---

## 📦 Features

- React 18 with React Router
- TailwindCSS styling
- Zustand state management
- Profile form connected to backend `/api/profiles`
- Ready to connect with AWS S3, Cognito, and Google Meet

---

## 🛠 Troubleshooting

If you see a Vite plugin error:

```bash
Error: Cannot find module '@vitejs/plugin-react'
```

Run:

```bash
npm install --save-dev @vitejs/plugin-react
```

---

MIT Licensed.
