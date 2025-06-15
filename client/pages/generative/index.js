import React from "react";
import Link from "next/link";
import { FaImage, FaMicrophoneAlt, FaRobot, FaVideo } from "react-icons/fa";

const features = [
  {
    title: "Text Generator",
    icon: <FaRobot className="text-4xl text-blue-600" />,
    link: "/text-generative",
    description: "Generate intelligent text using AI",
  },
  {
    title: "Image Generator",
    icon: <FaImage className="text-4xl text-pink-600" />,
    link: "/image-generative",
    description: "Create stunning images from prompts",
  },
  {
    title: "Video Generator",
    icon: <FaVideo className="text-4xl text-purple-600" />,
    link: "/video-generative",
    description: "Generate AI-based videos from ideas",
  },
  {
    title: "Audio Generator",
    icon: <FaMicrophoneAlt className="text-4xl text-green-600" />,
    link: "/audio-generative",
    description: "Create voice/audio from your input",
  },
];

const boxs = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">
        Explore Generative AI Features
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Link key={index} href={feature.link} passHref>
            <div
              className="aspect-square bg-white rounded-3xl shadow-md 
                   hover:shadow-2xl hover:bg-blue-50
                   transition-all duration-300 transform hover:scale-[1.05]
                   cursor-pointer flex flex-col items-center justify-between p-8
                   focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <div className="text-6xl mb-4 text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                {feature.icon}
              </div>

              <div className="text-center px-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default boxs;
