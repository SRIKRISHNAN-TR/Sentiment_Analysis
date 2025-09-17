import React, { useState } from "react";

function Home() {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Please enter a suggestion.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/predict-sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log(`Error connecting to API ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow-sm">
          Government eConsultation Portal
        </h1>
        <p className="mt-4 text-blue-800 text-lg max-w-2xl mx-auto leading-relaxed">
          Submit your suggestion for draft legislation and receive instant{" "}
          <span className="font-semibold text-blue-900">AI-powered</span>{" "}
          sentiment analysis.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm border border-blue-200 shadow-xl rounded-2xl p-8 w-full max-w-2xl transition hover:shadow-2xl"
      >
        <label
          className="block text-blue-900 text-lg font-semibold mb-3"
          htmlFor="comment"
        >
          Suggestion / Comment
        </label>
        <textarea
          id="comment"
          className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 text-gray-700 text-base"
          rows="6"
          placeholder="Type your suggestion here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`mt-6 w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-blue-700 hover:shadow-lg"
          }`}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-10 bg-blue-50 border border-blue-300 p-8 rounded-2xl shadow-md text-center max-w-xl w-full">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Sentiment Analysis Result
          </h2>
          <p className="text-xl text-blue-800">
            Sentiment:{" "}
            <span className="font-bold text-blue-900">{result.label}</span>
          </p>
          <p className="text-lg text-blue-700 mt-2">
            Confidence:{" "}
            <span className="font-semibold text-blue-900">
              {(result.score * 100).toFixed(1)}%
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
