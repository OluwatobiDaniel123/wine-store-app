import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LockedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <div className="text-center w-full relative">
        <DotLottieReact
          src="https://lottie.host/a6afae99-52e4-4c8e-b6eb-c5ff8c94df72/sHBJyfeUAJ.lottie"
          loop
          autoplay
          style={{ width: "300px", height: "300px", margin: "0 auto" }}
        />
        <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-shadow">
          <h1 className="text-4xl text-black font-bold mb-4">
            🔒 This Site is Locked
          </h1>
          <p className="text-lg text-black font-bold">
            We're working under maintenance. Please check back later!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockedPage;
