
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
