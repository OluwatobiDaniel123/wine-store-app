import React from "react";
import { useState, useEffect } from "react";
import { drinks, drink_1, drink_4, drink3 } from "../../assets/images";
import { Link } from "react-router-dom";

const ImgBox = [
  {
    img_1:
      "https://res.cloudinary.com/dbcygr0pi/image/upload/v1742409699/Vodka_and_Gin_Cocktail_bar_advertisement_Instagram_post_flyer_template_-_Made_with_PosterMyWall_jwkoel.jpg",
    img_2:
      "https://res.cloudinary.com/dbcygr0pi/image/upload/v1742437271/Whiskey_and_cigar_night_flyer_template_-_Made_with_PosterMyWall_1_rvedg5.jpg",
    img_3:
      "https://res.cloudinary.com/dbcygr0pi/image/upload/v1742409699/Whisky_and_wine_cup_Template_-_Made_with_PosterMyWall_m4w3lg.jpg",
  },
];

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
          height: "100vh",
        }}
      >
        <div style={{ padding: "15px", width: "900px" }}>
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
              fontSize: "1rem",
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
      </div>
    </div>
  );
};

export default CustomSlide;
