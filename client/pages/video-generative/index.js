"use client";

import { useState } from "react";
import { FiCopy, FiRefreshCcw, FiVideo } from "react-icons/fi";

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
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
    setVideoUrl("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generative/video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to generate video.");

      const data = await res.json();
      setVideoUrl(data.videoUrl); // backend must return video URL
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (videoUrl) {
      await navigator.clipboard.writeText(videoUrl);
      alert("Video URL copied to clipboard!");
    }
  };

  const handleClear = () => {
    setPrompt("");
    setVideoUrl("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🎥 AI Video Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Describe your video idea..."
            disabled={loading}
          />

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Generating..." : "Generate Video"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-800 flex items-center gap-2"
              disabled={loading}
            >
              <FiRefreshCcw />
              Clear
            </button>
          </div>
        </form>

        {videoUrl && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Generated Video
              </h2>
              <button
                onClick={handleCopy}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm cursor-pointer"
              >
                <FiCopy />
                Copy URL
              </button>
            </div>
            <video
              src={videoUrl}
              controls
              className="w-full rounded-md border border-gray-200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
