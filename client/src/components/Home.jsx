import { useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const bills = location.state?.bill;

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
        console.error(`Gemini API error (attempt ${retries}):`, err);
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
      console.error(err);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 via-yellow-100 to-yellow-200 p-6">
      
      <div className="max-w-2xl mx-auto p-6 mb-10 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Description
        </h1>
        {bills ? (
          <div className="text-center">
            <h3 className="text-lg text-gray-700 mb-2">{bills.description}</h3>
            <small className="text-sm text-gray-500">
              Created By: {bills.createdBy}
            </small>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading bill details...</p>
        )}
      </div>


      <p className="mt-2 text-yellow-800 text-lg max-w-2xl mx-auto leading-relaxed text-center">
        Submit your suggestion for draft legislation and receive instant{" "}
        <strong>AI-powered</strong>{" "}
        sentiment analysis.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm border border-yellow-200 shadow-xl rounded-2xl p-8 w-full max-w-2xl mt-8 transition hover:shadow-2xl"
      >
        <label
          className="block text-yellow-900 text-lg font-semibold mb-3"
          htmlFor="comment"
        >
          Suggestion / Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your policy feedback..."
          className="w-full h-28 p-4 border border-yellow-300 rounded-lg focus:ring-4 focus:ring-yellow-400 focus:outline-none transition-shadow text-gray-700 text-base"
        />

        <button
          type="submit"
          className={`mt-6 w-full bg-yellow-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
            loading
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-yellow-700 hover:shadow-lg"
          }`}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Submit Feedback"}
        </button>
      </form>

      {/* Error */}
      {errorMessage && (
        <div className="mt-4 p-4 text-center bg-red-100 text-red-700 rounded-lg shadow-md max-w-xl w-full">
          {errorMessage}
        </div>
      )}

      {/* Result */}
      {result && (
        <div
          className={`mt-10 p-8 rounded-2xl shadow-md text-center max-w-xl w-full border border-yellow-300 bg-yellow-50 transition-all duration-300 ${getSentimentClass()}`}
        >
          <h2 className="text-2xl font-bold text-yellow-900 mb-4">
            Sentiment Analysis Result
          </h2>
          <p className="text-xl text-yellow-800">
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
          <p className="text-lg text-yellow-700 mt-2">
            Summary:{" "}
            <span className="font-semibold text-yellow-900">
              {result.summary}
            </span>
          </p>

          {result.keywords.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-bold mb-2 text-yellow-900">
                Word Cloud
              </h2>
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
  );
};


export default Home;
