"use client";

import { useState } from "react";
import { FaTextHeight } from "react-icons/fa";
import { FiCopy, FiRefreshCcw } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setError("");
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generative/text`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) throw new Error("Failed to generate text.");

      const data = await res.json();

      if (!data || !data.text) {
        setError("No generated text found.");
        setResult("");
      } else {
        setResult(data.text);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        toast.success("Copied to clipboard!");
      } catch {
        toast.error("Failed to copy text.");
      }
    }
  };

  const handleClear = () => {
    setPrompt("");
    setResult("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-4">
          <FaTextHeight className="text-blue-500" />
          AI Text Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Type your prompt here..."
            disabled={loading}
            aria-label="Prompt input"
          />

          {error && (
            <p
              className="text-red-600 text-sm font-medium"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
              aria-label="Generate text"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-800 flex items-center gap-2"
              disabled={loading}
              aria-label="Clear input and output"
            >
              <FiRefreshCcw />
              Clear
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Generated Text</h2>
              <button
                onClick={handleCopy}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm cursor-pointer"
                aria-label="Copy generated text"
              >
                <FiCopy />
                Copy
              </button>
            </div>
            <div
              className="bg-gray-100 p-4 rounded-md text-gray-800 whitespace-pre-wrap border border-gray-200"
              aria-live="polite"
            >
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
