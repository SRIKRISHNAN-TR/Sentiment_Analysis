import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* -------- Inline Icons -------- */
const ChartPieIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5" fill="currentColor">
    <path d="M497.94 286.39L497.9 286.35c-15.5-27.42-32.96-51.1-51.78-71.18c-30.82-33.4-66.52-57.77-106.58-71.59c-34.93-12.1-71.52-16.14-108.5-12.16c-38.41 4.2-76.32 15.39-111.45 34.61C82.8 190.6 50.84 220.6 28.16 257.65c-22.68 37.05-34.2 81.76-32.61 127.65c.98 28.5 8.92 56.62 23.95 82.91c12.22 21.05 28.27 40.52 47.67 57.65c19.4 17.13 41.53 31.86 65.59 43.76c24.06 11.9 50.08 20.37 77.29 25.12c27.21 4.75 54.81 5.48 82.26 1.83c27.45-3.65 54.5-12.37 79.5-26.04c25-13.67 47.4-32.1 66.24-54.85c18.84-22.75 34.02-49.1 45.42-77.92c11.4-28.82 18.66-60.05 21.5-91.89c.35-4.1-.06-8.24-.95-12.32L497.94 286.39zM256 464c-22.62-1.7-44.82-7.39-65.43-16.71c-20.6-9.31-39.69-22.56-56.32-38.83c-16.63-16.27-29.47-36.19-38.38-57.94c-8.91-21.75-13.78-45.19-14.39-68.86c-1.12-42.54 12.04-83.69 36.31-118.78c18.52-27.17 42.92-49.88 71.3-66.27c28.38-16.4 60.18-26.4 92.48-29.83c31.43-3.34 62.77-.3 92.83 8.94c30.06 9.24 57.64 24.3 82.35 44.59c24.71 20.29 45.92 45.62 62.6 74.83c.96 1.66 1.9 3.32 2.76 4.97c-6.84-1.35-13.91-2.03-21.03-2.03c-53.05 0-104.9 21.16-142.49 58.75c-37.59 37.59-58.75 89.44-58.75 142.49c0 7.12.68 14.19 2.03 21.03c-2.82.91-5.65 1.76-8.52 2.53c-1.92.51-3.83 1.05-5.75 1.6zM256 256c-17.67 0-32-14.33-32-32s14.33-32 32-32s32 14.33 32 32s-14.33 32-32 32z"/>
  </svg>
);

const CommentDotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5" fill="currentColor">
    <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-64 160c-17.67 0-32-14.33-32-32s14.33-32 32-32s32 14.33 32 32s-14.33 32-32 32zm-128 0c-17.67 0-32-14.33-32-32s14.33-32 32-32s32 14.33 32 32s-14.33 32-32 32zm-128 0c-17.67 0-32-14.33-32-32s14.33-32 32-32s32 14.33 32 32z"/>
  </svg>
);

const SignOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5" fill="currentColor">
    <path d="M497.94 256L497.9 256c-15.5-27.42-32.96-51.1-51.78-71.18c-30.82-33.4-66.52-57.77-106.58-71.59c-34.93-12.1-71.52-16.14-108.5-12.16c-38.41 4.2-76.32 15.39-111.45 34.61C82.8 190.6 50.84 220.6 28.16 257.65c-22.68 37.05-34.2 81.76-32.61 127.65c.98 28.5 8.92 56.62 23.95 82.91c12.22 21.05 28.27 40.52 47.67 57.65c19.4 17.13 41.53 31.86 65.59 43.76c24.06 11.9 50.08 20.37 77.29 25.12c27.21 4.75 54.81 5.48 82.26 1.83c27.45-3.65 54.5-12.37 79.5-26.04c25-13.67 47.4-32.1 66.24-54.85c18.84-22.75 34.02-49.1 45.42-77.92c11.4-28.82 18.66-60.05 21.5-91.89c.35-4.1-.06-8.24-.95-12.32L497.94 256zM256 464c-22.62-1.7-44.82-7.39-65.43-16.71c-20.6-9.31-39.69-22.56-56.32-38.83c-16.63-16.27-29.47-36.19-38.38-57.94c-8.91-21.75-13.78-45.19-14.39-68.86c-1.12-42.54 12.04-83.69 36.31-118.78c18.52-27.17 42.92-49.88 71.3-66.27c28.38-16.4 60.18-26.4 92.48-29.83c31.43-3.34 62.77-.3 92.83 8.94c30.06 9.24 57.64 24.3 82.35 44.59c24.71 20.29 45.92 45.62 62.6 74.83c.96 1.66 1.9 3.32 2.76 4.97c-6.84-1.35-13.91-2.03-21.03-2.03c-53.05 0-104.9 21.16-142.49 58.75c-37.59 37.59-58.75 89.44-58.75 142.49c0 7.12.68 14.19 2.03 21.03c-2.82.91-5.65 1.76-8.52 2.53c-1.92.51-3.83 1.05-5.75 1.6zM256 256c-17.67 0-32-14.33-32-32s14.33-32 32-32s32 14.33 32 32s-14.33 32-32 32z"/>
  </svg>
);

/* -------- Main Component -------- */
const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [comments, setComments] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newBill, setNewBill] = useState("");
  const [newBillDescription, setNewBillDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [addingBill, setAddingBill] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  // Function to fetch problems from the backend
  const fetchProblems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/problems");
      if (res.ok) {
        const data = await res.json();
        setProblems(data.problems.map(p => p.title));
        if (data.problems.length > 0) {
          setSelectedProblem(data.problems[0].title);
        }
      } else {
        console.error("Failed to fetch problems:", res.statusText);
      }
    } catch (err) {
      console.error("Network error when fetching problems:", err);
    }
  };

  // Function to fetch comments from the backend
  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
      } else {
        console.error("Failed to fetch comments:", res.statusText);
      }
    } catch (err) {
      console.error("Network error when fetching comments:", err);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProblems(), fetchComments()]);
      setLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    };
    fetchData();
  }, []);

  // Mock data for demo purposes
  useEffect(() => {
    if (comments.length === 0) {
      setComments([
        { id: 1, text: "Great initiative", sentiment: "positive", createdAt: new Date() },
        { id: 2, text: "Needs improvement", sentiment: "negative", createdAt: new Date() },
        { id: 3, text: "Okay bill", sentiment: "neutral", createdAt: new Date() },
        { id: 4, text: "Excellent work", sentiment: "positive", createdAt: new Date() },
        { id: 5, text: "Poor implementation", sentiment: "negative", createdAt: new Date() },
      ]);
    }
    if (problems.length === 0) {
      setProblems([
        "Digital Privacy Act 2025",
        "Climate Action Bill",
        "Healthcare Reform Act",
        "Education Modernization Bill"
      ]);
      setSelectedProblem("Digital Privacy Act 2025");
    }
  }, [comments.length, problems.length]);

  /* Pie Chart Data */
  const sentimentData = [
    { name: "Positive", value: comments.filter((c) => c.sentiment === "positive").length },
    { name: "Neutral", value: comments.filter((c) => c.sentiment === "neutral").length },
    { name: "Negative", value: comments.filter((c) => c.sentiment === "negative").length },
  ];

  const sentimentColors = {
    Positive: "#10b981",
    Neutral: "#8b5cf6",
    Negative: "#f59e0b",
  };

  /* Word Cloud */
  const words = [
    { text: "mandatory training", sentiment: "negative" },
    { text: "poorly organized", sentiment: "negative" },
    { text: "disruptive", sentiment: "negative" },
    { text: "excellent", sentiment: "positive" },
    { text: "helpful", sentiment: "positive" },
    { text: "unclear", sentiment: "neutral" },
  ];

  const analysis = {
    summary: "The feedback expresses mixed opinions. Many highlight poor organization and disruption, but several comments also appreciate the initiative and find it helpful.",
  };

  const filteredProblems = problems.filter((p) => p.toLowerCase().includes(search.toLowerCase()));

  const handleAddBill = async () => {
    if (newBill.trim() === "" || newBillDescription.trim() === "") {
      setStatusMessage({ message: "Please fill in both title and description", type: "error" });
      return;
    }

    setAddingBill(true);
    setStatusMessage({ message: "", type: "" });

    try {
      const res = await fetch("http://localhost:5000/api/problems/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          title: newBill, 
          description: newBillDescription,
          createdBy: "admin" 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({ message: "Bill added successfully!", type: "success" });
        setNewBill("");
        setNewBillDescription("");
        // Re-fetch problems to update the UI with the new bill
        await fetchProblems();
      } else {
        setStatusMessage({ message: "Error: " + data.error, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ message: "Server error. Please check if the backend is running.", type: "error" });
    } finally {
      setAddingBill(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animation-delay-75"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col p-6 shadow-2xl backdrop-blur-lg border-r border-slate-700/50 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-indigo-600/10 animate-pulse"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8 animate-fade-in">
            Admin Panel
          </h2>
          
          <nav className="flex flex-col gap-3 flex-grow">
            <button 
              onClick={() => setActiveSection("dashboard")} 
              className={`group flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden
                ${activeSection === "dashboard" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25" 
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-lg hover:shadow-slate-900/25"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <ChartPieIcon className="relative z-10 transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative z-10">Dashboard</span>
            </button>
            
            <button 
              onClick={() => setActiveSection("add")} 
              className={`group flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ease-out transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden
                ${activeSection === "add" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25" 
                  : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-lg hover:shadow-slate-900/25"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CommentDotsIcon className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10">Add Bill</span>
            </button>
          </nav>
          
          <button className="group flex items-center gap-3 p-4 rounded-2xl text-slate-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 mt-auto transform hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <SignOutIcon className="relative z-10 transition-transform duration-300 group-hover:rotate-12" />
            <span className="relative z-10">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 p-8 md:p-12 overflow-auto transition-all duration-1000 ease-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {activeSection === "dashboard" && (
          <div className="space-y-10">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 animate-pulse">
                Legislature Bills Dashboard
              </h1>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Total Comments", value: comments.length, color: "from-blue-500 to-purple-600", delay: "delay-100" },
                { title: "Total Bills", value: problems.length, color: "from-purple-500 to-pink-600", delay: "delay-200" },
                { title: "Total Users", value: "N/A", color: "from-pink-500 to-red-600", delay: "delay-300" }
              ].map((card, index) => (
                <div key={index} className={`group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 flex flex-col items-center justify-center transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in-up ${card.delay} cursor-pointer relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-700 group-hover:text-slate-900 transition-colors duration-300">{card.title}</h3>
                  <p className={`text-6xl font-extrabold bg-gradient-to-br ${card.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {card.value}
                  </p>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Problem Selector */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 relative z-10 animate-fade-in-up delay-400">
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">Select Bill for Analysis</h2>
              <div 
                className="border border-slate-200 rounded-2xl p-4 cursor-pointer bg-gradient-to-r from-slate-50 to-white flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:border-blue-300 group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-slate-700 text-lg group-hover:text-slate-900 transition-colors duration-200">{selectedProblem || "No bills available"}</span>
                <svg className={`w-5 h-5 text-slate-500 transition-all duration-300 group-hover:text-blue-500 ${dropdownOpen ? "rotate-180 scale-110" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-lg border border-slate-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto z-50 animate-fade-in-down">
                  <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder="Search bills..."
                    className="border-b border-slate-200 p-4 w-full outline-none text-lg bg-transparent focus:bg-blue-50/50 transition-colors duration-300" 
                  />
                  <ul className="py-2">
                    {filteredProblems.map((p, index) => (
                      <li 
                        key={index} 
                        onClick={() => { setSelectedProblem(p); setDropdownOpen(false); }}
                        className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${selectedProblem === p ? "bg-gradient-to-r from-blue-100 to-purple-100 font-medium text-blue-800 border-l-4 border-blue-500" : "hover:translate-x-2"}`}
                        style={{animationDelay: `${index * 50}ms`}}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Charts + Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 flex flex-col items-center animate-fade-in-up delay-500 hover:shadow-2xl transition-shadow duration-500">
                <h2 className="text-2xl font-semibold mb-6 text-slate-900">Public Sentiment Distribution</h2>
                <div className="w-full h-80 group">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={sentimentData} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={100} 
                        dataKey="value" 
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        className="group-hover:scale-105 transition-transform duration-500"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={sentimentColors[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(8px)'
                        }}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 animate-fade-in-up delay-600 hover:shadow-2xl transition-shadow duration-500 group">
                <h2 className="text-2xl font-semibold mb-6 text-slate-900 group-hover:text-blue-900 transition-colors duration-300">Feedback Summary</h2>
                <div className="relative">
                  <p className="text-slate-600 leading-relaxed text-lg italic group-hover:text-slate-800 transition-colors duration-300">{analysis.summary}</p>
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
                </div>
              </div>
            </div>

            {/* Word Cloud */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 flex flex-col items-center animate-fade-in-up delay-700 hover:shadow-2xl transition-shadow duration-500">
              <h2 className="text-2xl font-semibold mb-6 text-slate-900">Key Themes Word Cloud</h2>
              <div className="w-full flex flex-wrap justify-center gap-4 p-4">
                {words.map((word, index) => {
                  let colorClasses =
                    word.sentiment === "positive"
                      ? "text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
                      : word.sentiment === "negative"
                        ? "text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
                        : "text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300";

                  return (
                    <span
                      key={index}
                      className={`px-6 py-3 rounded-full shadow-lg border-2 text-base font-medium transform transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer animate-fade-in ${colorClasses}`}
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeSection === "add" && (
          <div className="flex flex-col items-center justify-center min-h-full animate-fade-in-up">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8">
              Add a New Bill
            </h1>
            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/50 w-full max-w-2xl text-center transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">Enter the details of the new legislative bill to add it for public feedback.</p>
              <div className="space-y-6">
                <div className="text-left">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bill Title</label>
                  <input
                    type="text"
                    value={newBill}
                    onChange={(e) => setNewBill(e.target.value)}
                    placeholder="e.g., The Digital Privacy Bill 2025"
                    className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50/50 backdrop-blur-sm hover:border-slate-300"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Bill Description</label>
                  <textarea
                    value={newBillDescription}
                    onChange={(e) => setNewBillDescription(e.target.value)}
                    placeholder="Provide a detailed description of the bill, its objectives, and key provisions..."
                    rows="4"
                    className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-slate-50/50 backdrop-blur-sm hover:border-slate-300 resize-none"
                  />
                </div>
                <button
                  onClick={handleAddBill}
                  className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  disabled={!newBill.trim() || !newBillDescription.trim() || addingBill}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {addingBill && (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    )}
                    {addingBill ? "Adding..." : "Add Bill"}
                  </span>
                </button>
                {statusMessage.message && (
                  <div className={`p-4 rounded-2xl font-medium text-center transition-all duration-500 transform ${
                    statusMessage.type === "success" 
                      ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border-2 border-emerald-200" 
                      : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-2 border-red-200"
                  }`}>
                    {statusMessage.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        
        .animation-delay-75 {
          animation-delay: 0.075s;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Admin;