import { useUserStore } from "../store/useUserStore";
import { useState } from "react";

export default function Profile() {
  const { user, setUser } = useUserStore();
  const [form, setForm] = useState({
    id: "",
    role: "creator",
    name: "",
    title: "",
    email: "",
    bio: "",
    city: "",
    state: "",
    country: "",
    discipline: "",
    medium: "",
    subgenre: "",
    profilePicUrl: "",
    coverPicUrl: "",
    links: []
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + (err.detail || res.statusText));
        return;
      }
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="id" placeholder="ID" className="w-full border p-2" onChange={handleChange} />
        <select name="role" className="w-full border p-2" onChange={handleChange}>
          <option value="creator">Creator</option>
          <option value="brand_manager">Brand Manager</option>
        </select>
        <input name="name" placeholder="Name" className="w-full border p-2" onChange={handleChange} />
        <input name="title" placeholder="Title" className="w-full border p-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full border p-2" onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" className="w-full border p-2" onChange={handleChange}></textarea>
        <input name="city" placeholder="City" className="w-full border p-2" onChange={handleChange} />
        <input name="state" placeholder="State" className="w-full border p-2" onChange={handleChange} />
        <input name="country" placeholder="Country" className="w-full border p-2" onChange={handleChange} />
        <input name="discipline" placeholder="Discipline" className="w-full border p-2" onChange={handleChange} />
        <input name="medium" placeholder="Medium" className="w-full border p-2" onChange={handleChange} />
        <input name="subgenre" placeholder="Subgenre" className="w-full border p-2" onChange={handleChange} />
        <input name="profilePicUrl" placeholder="Profile Pic URL" className="w-full border p-2" onChange={handleChange} />
        <input name="coverPicUrl" placeholder="Cover Pic URL" className="w-full border p-2" onChange={handleChange} />
        <input name="links" placeholder="Comma-separated links" className="w-full border p-2" onChange={e => setForm(prev => ({ ...prev, links: e.target.value.split(",") }))} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
      </form>
      {user && <div className="mt-4 text-green-600">Saved: {user.name}</div>}
    </div>
  );
}
