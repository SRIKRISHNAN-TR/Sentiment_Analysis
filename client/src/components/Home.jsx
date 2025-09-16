import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./NavbarComponent";

const Home = () => {
  const location = useLocation();
  const bill = location.state?.bill || null;

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = "AIzaSyBLMyDFa-p3bT7zXFyc5aQ8e6PQkP6b2uc";

  const analyzeFeedback = async (text) => {
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Analyze this feedback text: "${text}". Return JSON with: {"sentiment": "positive | negative | neutral", "summary": "short summary", "keywords": ["list of key terms"]}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const maxRetries = 3;
    let retries = 0;
    let delay = 1000;

    while (retries < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return JSON.parse(result.candidates[0].content.parts[0].text);
      } catch (err) {
        retries++;
        if (retries < maxRetries) {
          await new Promise((res) => setTimeout(res, delay));
          delay *= 2;
        } else {
          throw err;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!comment.trim()) {
      setErrorMessage("Please enter a suggestion.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const apiResponse = await analyzeFeedback(comment);

      const sentimentScore =
        apiResponse.sentiment === "positive"
          ? 1
          : apiResponse.sentiment === "negative"
          ? -1
          : 0;

      setResult({
        sentiment: sentimentScore,
        summary: apiResponse.summary,
        keywords: apiResponse.keywords,
      });
    } catch (err) {
      setErrorMessage("Error analyzing feedback.");
      setResult({
        sentiment: 0,
        summary: "Error analyzing feedback.",
        keywords: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const getSentimentClass = () =>
    result
      ? result.sentiment > 0
        ? "bg-green-100 text-green-900"
        : result.sentiment < 0
        ? "bg-red-100 text-red-900"
        : "bg-gray-100 text-gray-900"
      : "";

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        {bill ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{bill.title}</h1>
            <p className="text-gray-700 mt-2">
              <strong>Ministry:</strong> {bill.ministry}
            </p>
            <p className="text-gray-700">
              <strong>Introduced:</strong> {bill.introduced}
            </p>
            <p className="text-gray-700">
              <strong>Passed in LS:</strong> {bill.passedLS}
            </p>
            <p className="text-gray-700">
              <strong>Passed in RS:</strong> {bill.passedRS}
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Description:</strong> {bill.description}
            </p>
          </div>
        ) : (
          <p className="text-red-500 font-semibold">No bill selected.</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your policy feedback..."
            className="w-full h-28 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-shadow"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-md hover:shadow-lg disabled:bg-indigo-400"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Submit Feedback"}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-4 p-4 text-center bg-red-100 text-red-700 rounded-lg shadow-md max-w-xl w-full">
            {errorMessage}
          </div>
        )}

        {result && (
          <div
            className={`mt-8 p-6 rounded-xl shadow-lg text-center font-semibold w-full max-w-xl transition-all duration-300 ${getSentimentClass()}`}
          >
            <p className="text-xl">
              Sentiment Score:{" "}
              <span
                className={
                  result.sentiment > 0
                    ? "text-green-700"
                    : result.sentiment < 0
                    ? "text-red-700"
                    : "text-gray-700"
                }
              >
                {result.sentiment}
              </span>
            </p>
            <p className="text-sm font-normal text-gray-700 mt-2">
              Summary: {result.summary}
            </p>

            {result.keywords.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">Keywords</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  {result.keywords.map((word, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 px-3 py-1 rounded-full text-yellow-900 font-medium shadow-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
