import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import image from "../public/gemini-native-image.png";

export default function Home() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image.src})` }}
    >
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in">
          Generative <span className="text-blue-500">AI</span> Application
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 animate-fade-in delay-100">
          Experience the power of artificial intelligence that can generate text, images, and more — powered by Google Gemini.
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-200">
          <Link
            href="https://github.com/tusharRajput45/Generative-AI-Application"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition duration-300"
          >
            <FaGithub className="text-xl" />
            View on GitHub
          </Link>

          <Link
            href="/generative"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition duration-300"
          >
            Try It Now
          </Link>
        </div>
      </div>
    </main>
  );
}
