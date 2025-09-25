import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "./admin cmp/Sidebar";

const Admin = () => {
  const [comments, setComments] = useState([]);
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newBill, setNewBill] = useState("");
  const [newBillDescription, setNewBillDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  // Fetch problems (backend integration)
  const fetchProblems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/problems/getbills");
      if (res.ok) {
        const data = await res.json();
        setProblems(data.problems.map((p) => p.title));
        if (data.problems.length > 0) setSelectedProblem(data.problems[0].title);
      } else {
        console.error("Failed to fetch problems:", res.statusText);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchProblems();
      setLoading(false);
      setTimeout(() => setFadeIn(true), 100);
    };
    fetchData();
  }, []);

  // Mock data (demo fallback)
  useEffect(() => {
    if (comments.length === 0) {
      setComments([
        { id: 1, text: "Great initiative", sentiment: "positive" },
        { id: 2, text: "Needs improvement", sentiment: "negative" },
        { id: 3, text: "Okay bill", sentiment: "neutral" },
        { id: 4, text: "Excellent work", sentiment: "positive" },
        { id: 5, text: "Poor implementation", sentiment: "negative" },
      ]);
    }
  }, [comments]);

  /* Sentiment Chart Data */
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
    summary:
      "The feedback expresses mixed opinions. Many highlight poor organization and disruption, but several comments also appreciate the initiative and find it helpful.",
  };

  const filteredProblems = problems.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  

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
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <main className={`flex-1 p-8 md:p-12 transition-all ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        {activeSection === "dashboard" && (
          <div className="space-y-10">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Legislature Bills Dashboard
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Total Comments", value: comments.length },
                { title: "Total Bills", value: problems.length },
                { title: "Total Users", value: "N/A" },
              ].map((card, index) => (
                <div key={index} className="bg-white/80 p-8 rounded-3xl shadow-xl text-center">
                  <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                  <p className="text-6xl font-extrabold">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Problem Selector */}
            <div className="bg-white/80 p-8 rounded-3xl shadow-xl relative">
              <h2 className="text-2xl font-semibold mb-6">Select Bill for Analysis</h2>
              <div
                className="border p-4 rounded-2xl cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedProblem || "No bills available"}
              </div>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-2xl shadow-2xl max-h-60 overflow-y-auto z-50">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search bills..."
                    className="border-b p-4 w-full outline-none"
                  />
                  <ul>
                    {filteredProblems.map((p, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelectedProblem(p);
                          setDropdownOpen(false);
                        }}
                        className="p-4 hover:bg-blue-50 cursor-pointer"
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
              <div className="bg-white/80 p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-semibold mb-6">Public Sentiment Distribution</h2>
                <div className="w-full h-80">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={index} fill={sentimentColors[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Feedback Summary */}
              <div className="bg-white/80 p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-semibold mb-6">Feedback Summary</h2>
                <p className="text-slate-600 leading-relaxed text-lg italic">
                  {analysis.summary}
                </p>
              </div>
            </div>

            {/* Word Cloud */}
            <div className="bg-white/80 p-8 rounded-3xl shadow-xl flex flex-wrap gap-4 justify-center">
              <h2 className="text-2xl font-semibold mb-6 w-full text-center">Key Themes</h2>
              {words.map((word, index) => {
                const color =
                  word.sentiment === "positive"
                    ? "bg-emerald-50 text-emerald-600"
                    : word.sentiment === "negative"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-purple-50 text-purple-600";
                return (
                  <span
                    key={index}
                    className={`px-6 py-3 rounded-full shadow-md ${color}`}
                  >
                    {word.text}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === "add" && (
          <div className="flex flex-col items-center justify-center min-h-full">
            <h1 className="text-5xl font-bold mb-8">Add a New Bill</h1>
            <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-2xl">
              <p className="text-slate-600 mb-8">
                Enter the details of the new legislative bill to add it for public feedback.
              </p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Bill Title</label>
                  <input
                    type="text"
                    value={newBill}
                    onChange={(e) => setNewBill(e.target.value)}
                    placeholder="e.g., Digital Privacy Bill 2025"
                    className="w-full px-6 py-4 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Bill Description</label>
                  <textarea
                    value={newBillDescription}
                    onChange={(e) => setNewBillDescription(e.target.value)}
                    placeholder="Enter description..."
                    className="w-full px-6 py-4 border rounded-xl"
                  ></textarea>
                </div>
                <button className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg">
                  Submit Bill
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;