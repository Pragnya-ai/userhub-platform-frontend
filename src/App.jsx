import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupLogin from "./pages/SignupLogin";
import Profile from "./pages/Profile";
import SelectRole from "./pages/SelectRole";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/select-role" element={<SelectRole />} />
      </Routes>
    </Router>
  );
}

export default App;
