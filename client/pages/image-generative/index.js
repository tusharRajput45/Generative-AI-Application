"use client";

import { useState } from "react";
import { FaDownload, FaImage } from "react-icons/fa";
import { FiCopy, FiRefreshCcw } from "react-icons/fi";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
    setImageUrl("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/generative/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to generate image.");

      const data = await res.json();

      // Backend sends base64 string, prepend data URI
      const imageUrl = `data:image/png;base64,${data.image}`;
      setImageUrl(imageUrl);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (imageUrl) {
      try {
        await navigator.clipboard.writeText(imageUrl);
        alert("Image URL copied to clipboard!");
      } catch {
        alert("Failed to copy URL.");
      }
    }
  };

  const handleClear = () => {
    setPrompt("");
    setImageUrl("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-4">
          <FaImage className="text-blue-500" />
          AI Image Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            placeholder="Describe the image you want to generate..."
            disabled={loading}
          />

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Generating..." : "Generate Image"}
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

        {imageUrl && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Generated Image
              </h2>

              <div className="flex gap-4">
                <button
                  onClick={handleCopy}
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm cursor-pointer"
                  title="Copy image URL"
                >
                  <FiCopy />
                  Copy URL
                </button>

                <a
                  href={imageUrl}
                  download="generated-image.png"
                  className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm cursor-pointer"
                  title="Download image"
                >
                  <FaDownload /> Download
                </a>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              <img
                src={imageUrl}
                alt="Generated result"
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
