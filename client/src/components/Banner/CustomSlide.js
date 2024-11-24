import React from "react";
import { useState, useEffect } from "react";
import { drinks, drink_1, drink_4, drink3 } from "../../assets/images";
import { Link } from "react-router-dom";

const ImgBox = [{ img_1: drink_1, img_2: drinks, img_3: drink_4 }];

const CustomSlide = ({ text, Subtext, buttonText, buttonLink }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = Object.values(ImgBox[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [imageArray.length]);
  return (
    <div>
      <div
        style={{
          position: "relative",
          backgroundImage: `url(${imageArray[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "450px",
            marginRight: "100px",
            padding: "20px",
          }}
        >
          <h1
            style={{
              marginBottom: "15px",
              fontSize: "2.5rem",
              color: "white",
              fontWeight: "700",
            }}
          >
            {text}
          </h1>
          <p
            style={{
              marginBottom: "25px",
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            {Subtext}
          </p>

          <Link to={buttonLink}>
            <button className="bg-[#0f0f59] rounded-lg text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-[#05052e] duration-300 font-bold">
              {buttonText}
            </button>
          </Link>
        </div>
        <div>
          <img src={drink3} />
        </div>
      </div>
    </div>
  );
};

export default CustomSlide;
