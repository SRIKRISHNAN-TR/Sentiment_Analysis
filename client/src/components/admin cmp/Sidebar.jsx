import React from "react";
import { useNavigate } from "react-router-dom";
import { ChartPieIcon, CommentDotsIcon, SignOutIcon } from "./Icons";

function Sidebar({ activeSection, setActiveSection }) {
  const navigate = useNavigate();

  const handleAddBill = () => {
    setActiveSection("add");
    navigate("/add-bill");
  };

  const handleDashboard = () => {
    setActiveSection("dashboard");
    navigate("/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col p-6 shadow-2xl border-r border-slate-700/50">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-3 flex-grow">
        <button
          onClick={handleDashboard}
          className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
            activeSection === "dashboard"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              : "text-slate-300 hover:bg-slate-700/50"
          }`}
        >
          <ChartPieIcon />

          Dashboard

        </button>
        <button
          onClick={handleAddBill}
          className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
            activeSection === "add"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              : "text-slate-300 hover:bg-slate-700/50"
          }`}
        >
          <CommentDotsIcon />

          Add Bill

        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-4 rounded-2xl text-slate-300 hover:bg-red-500/20 hover:text-red-300"
        >
          <SignOutIcon />

          Logout

        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
