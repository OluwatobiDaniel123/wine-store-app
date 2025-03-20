import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import CustomSlide from "./CustomSlide";

const Banner = () => {
  const [dotActive, setDocActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "7%",
          transform: "translateY(-50%)",
        }}
      >
        {/* <ul style={{ margin: "0px" }}> {dots} </ul> */}
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
        //{" "}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              {/* <ul style={{ margin: "0px" }}> {dots} </ul> */}
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc:
        "https://res.cloudinary.com/dbcygr0pi/image/upload/v1742409699/Vodka_and_Gin_Cocktail_bar_advertisement_Instagram_post_flyer_template_-_Made_with_PosterMyWall_jwkoel.jpg",
      text: "Whisky & Brandy",
      Subtext:
        "A premium whisky known for its smooth texture and rich, smoky undertones, ideal for those who enjoy a bold yet balanced taste.",
      buttonLink: "/shop",
      buttonText: "Shop Now",
    },
    {
      imgSrc:
        "https://res.cloudinary.com/dbcygr0pi/image/upload/v1742437010/Whiskey_and_cigar_night_flyer_template_-_Made_with_PosterMyWall_rsxxfu.jpg",
      text: "Know More",
      Subtext:
        "ChrisAlpha wine & liquor store is the ultimate destination for all your shopping needs. With a wide range of high-quality products, easy-to-use navigation, and secure payment options, we make online shopping simple and enjoyable. ",
      buttonLink: "/about",
      buttonText: "About-us",
    },
    {
      imgSrc:
        "https://res.cloudinary.com/dbcygr0pi/image/upload/v1742409699/Whisky_and_wine_cup_Template_-_Made_with_PosterMyWall_m4w3lg.jpg",
      text: " Reach Out To Us",
      Subtext:
        "We caters to wine and liquor enthusiasts, event planners, and everyday shoppers looking for premium beverages with the convenience of online shopping. Shop with confidence and discover the best at ChrisAlpha wine & liquor store today!",
      buttonLink: "/contact",
      buttonText: "Contact-us",
    },
  ];

  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
