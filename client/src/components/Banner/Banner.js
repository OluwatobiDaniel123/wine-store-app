import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { bannerImgOne } from "../../assets/images";

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
      imgSrc: bannerImgOne,
      text: "Whisky-drinks",
      Subtext:
        "Explore our premium printers and consumables for exceptional results",
      buttonLink: "/shop",
      buttonText: "Shop Now",
    },
    {
      imgSrc: bannerImgOne,
      text: "Red-Wine",
      Subtext:
        "Discover our wide range of printers and consumables designed for pro.",
      buttonLink: "/about",
      buttonText: "About-us",
    },
    {
      imgSrc: bannerImgOne,
      text: "Non-Alcholic",
      Subtext:
        "Maximize productivity with our advanced printers and high-quality co ",
      buttonLink: "/contact",
      buttonText: "Contact-us",
    },
  ];

  return (
    <div className="w-full  bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
