import { useState } from "react";

export default function SignupLogin() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return password.length >= minLength && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      alert("Password must be at least 8 characters long and include a special character.");
      return;
    }

    const endpoint = isLogin ? "http://localhost:8000/api/login" : "http://localhost:8000/api/signup";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + (err.detail || res.statusText));
        return;
      }
      const message = isLogin ? "Login successful!" : "Signup successful!";
      alert(message);
      const data = await res.json();
      console.log("signup>>>>>>", data);
      localStorage.setItem("access_token", data.access_token); // Store the token in localStorage
      if (!isLogin) {
        // After signup, verify email
        // const verifyRes = await fetch("http://localhost:8000/api/verify-email", {
        //   method: "POST",
        //   headers: {
        //     "Authorization": `Bearer ${data.access_token}`
        //   }
        // });
        // if (verifyRes.ok) {
        //   alert("Signup successful! Email verified. You can now login.");
        //   setIsLogin(true); // Switch to login UI
        // } else {
        //   const verifyErr = await verifyRes.json();
        //   alert("Signup successful, but email verification failed: " + (verifyErr.detail || JSON.stringify(verifyErr) || verifyRes.statusText));
        // }
        // return;
      }
      if (isLogin) {
        window.location.href = "/select-role"; // Redirect to select-role after login
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/google-login";
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              name="first_name"
              placeholder="First Name"
              className="w-full border p-2"
              onChange={handleChange}
            />
            <input
              name="last_name"
              placeholder="Last Name"
              className="w-full border p-2"
              onChange={handleChange}
            />
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={handleChange}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <div className="mt-4">
        <button
          className="w-full bg-red-600 text-white py-2 rounded"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          className="text-blue-600 underline"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
}
