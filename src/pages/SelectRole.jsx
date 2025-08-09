import { useState } from "react";

export default function SelectRole() {
  const [role, setRole] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      // Proceed to select-role function only
      const res = await fetch("http://localhost:8000/api/select-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      if (res.ok) {
        alert("Role selected successfully");
        window.location.href = "/profile"; // Redirect to profile page
      } else {
        const err = await res.json();
        alert("Error: " + (err.detail || res.statusText));
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Select Your Role</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <button
          onClick={() => setRole("creator")}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
        >
          Creator/Influencer
        </button>
        <button
          onClick={() => setRole("brand_manager")}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "5px" }}
        >
          Brand Manager
        </button>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!role}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: role ? "#f44336" : "#ccc", color: "white", border: "none", borderRadius: "5px" }}
      >
        Submit
      </button>
    </div>
  );
}
