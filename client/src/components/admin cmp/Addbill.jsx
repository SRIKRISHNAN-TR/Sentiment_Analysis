import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AddBill = () => {
  const [billTitle, setBillTitle] = useState("");
  const [billDescription, setBillDescription] = useState("");
  const [message, setMessage] = useState("");
  const [createdBy , setCreatedBy]= useState("");
  const [activeSection, setActiveSection] = useState("add");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/problems/addbills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: billTitle, description: billDescription, createdBy: createdBy }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Bill added successfully ✅");
        setBillTitle("");
        setBillDescription("");
        setCreatedBy("");
      } else {
        setMessage(data.error || "Failed to add bill");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="flex min-h-screen gap-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Add a New Bill</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Bill Title</label>
            <input
              type="text"
              value={billTitle}
              onChange={(e) => setBillTitle(e.target.value)}
              placeholder="e.g., Digital Privacy Bill 2025"
              className="w-full px-6 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Bill Description</label>
            <textarea
              value={billDescription}
              onChange={(e) => setBillDescription(e.target.value)}
              placeholder="Enter description..."
              className="w-full px-6 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 pb-50"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" >Author</label>
            <input
              type="text"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Created By"
              className="w-full px-6 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
          >
            Submit Bill
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center font-medium text-slate-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddBill;
