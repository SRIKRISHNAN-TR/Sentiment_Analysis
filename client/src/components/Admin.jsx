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
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const [addingBill, setAddingBill] = useState(false);
  const [loading, setLoading] = useState(true);

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
    };
    fetchData();
  }, []);

  /* Pie Chart Data */
  const sentimentData = [
    { name: "Positive", value: comments.filter((c) => c.sentiment === "positive").length },
    { name: "Neutral", value: comments.filter((c) => c.sentiment === "neutral").length },
    { name: "Negative", value: comments.filter((c) => c.sentiment === "negative").length },
  ];

  const sentimentColors = {
    Positive: "#22c55e",
    Neutral: "#9ca3af",
    Negative: "#ef4444",
  };

  /* Word Cloud */
  // NOTE: This data is still hardcoded. You would need a backend function
  // to analyze comments and generate this dynamically.
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
    if (newBill.trim() === "") return;

    setAddingBill(true);
    setStatusMessage({ message: "", type: "" });

    try {
      const res = await fetch("http://localhost:5000/api/problems/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newBill, createdBy: "admin" }), // Assuming a simple createdBy for now
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage({ message: "Bill added successfully!", type: "success" });
        setNewBill("");
        // Re-fetch problems to update the UI with the new bill
        await fetchProblems();
      } else {
        setStatusMessage({ message: "Error: " + data.error, type: "error" });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ message: "Server error", type: "error" });
    } finally {
      setAddingBill(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans antialiased">
      {/* Sidebar */}
      <aside className="w-64 bg-[#003366] text-white flex flex-col p-6 shadow-xl z-20">
        <h2 className="text-2xl font-bold text-blue-200 mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4 flex-grow">
          <button onClick={() => setActiveSection("dashboard")} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200  
            ${activeSection === "dashboard" ? "bg-blue-800 text-white font-semibold" : "text-blue-200 hover:bg-blue-800 hover:text-white"}`}>
            <ChartPieIcon /> Dashboard
          </button>
          <button onClick={() => setActiveSection("add")} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200  
            ${activeSection === "add" ? "bg-blue-800 text-white font-semibold" : "text-blue-200 hover:bg-blue-800 hover:text-white"}`}>
            <CommentDotsIcon /> Add Bill
          </button>
        </nav>
        <button className="flex items-center gap-3 p-3 rounded-xl text-blue-200 hover:bg-blue-800 hover:text-white transition-all duration-200 mt-auto">
          <SignOutIcon /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">
        {activeSection === "dashboard" && (
          <div className="space-y-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Legislature Bills Dashboard</h1>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Comments</h3>
                <p className="text-6xl font-extrabold text-[#00509e]">{comments.length}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Bills</h3>
                <p className="text-6xl font-extrabold text-[#00509e]">{problems.length}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Users</h3>
                <p className="text-6xl font-extrabold text-[#00509e]">N/A</p>
              </div>
            </div>

            {/* Problem Selector */}
            <div className="bg-white p-8 rounded-3xl shadow-lg relative z-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Select Bill for Analysis</h2>
              <div className="border border-gray-300 rounded-2xl p-4 cursor-pointer bg-gray-50 flex items-center justify-between transition-all hover:bg-gray-100"
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                <span className="text-gray-700 text-lg">{selectedProblem || "No bills available"}</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {dropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl max-h-60 overflow-y-auto">
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bills..."
                    className="border-b border-gray-200 p-4 w-full outline-none text-lg" />
                  <ul className="py-2">
                    {filteredProblems.map((p, index) => (
                      <li key={index} onClick={() => { setSelectedProblem(p); setDropdownOpen(false); }}
                        className={`p-4 cursor-pointer transition-all hover:bg-gray-100 ${selectedProblem === p ? "bg-blue-100 font-medium text-blue-800" : ""}`}>
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
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Public Sentiment Distribution</h2>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={sentimentColors[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Feedback Summary</h2>
                <p className="text-gray-600 leading-relaxed text-lg italic">{analysis.summary}</p>
              </div>
            </div>
            {/* Word Cloud */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200 flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Key Themes Word Cloud</h2>
              <div className="w-full flex flex-wrap justify-center gap-4 p-4">
                {words.map((word, index) => {
                  let textColor =
                    word.sentiment === "positive"
                      ? "text-green-600"
                      : word.sentiment === "negative"
                        ? "text-red-600"
                        : "text-gray-600";

                  return (
                    <span
                      key={index}
                      className={`px-5 py-2 rounded-full shadow-md border border-gray-200 text-base font-medium ${textColor} transform transition-transform hover:scale-110`}
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
          <div className="flex flex-col items-center justify-center min-h-full">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Add a New Bill</h1>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-lg text-center">
              <p className="text-gray-600 mb-6">Enter the name of the new legislative bill to add it for public feedback.</p>
              <input
                type="text"
                value={newBill}
                onChange={(e) => setNewBill(e.target.value)}
                placeholder="e.g., The Digital Privacy Bill 2025"
                className="w-full px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={handleAddBill}
                className="w-full bg-[#00509e] text-white py-3 rounded-lg text-lg font-semibold transition-all hover:bg-[#003366] disabled:bg-gray-400"
                disabled={!newBill.trim() || addingBill}
              >
                {addingBill ? "Adding..." : "Add Bill"}
              </button>
              {statusMessage.message && (
                <div className={`mt-4 p-3 rounded-lg font-medium text-center ${statusMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {statusMessage.message}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
