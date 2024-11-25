import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const [newArrival, setNewArrival] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/NewArrivalProduct")
      .then((res) => res.json())
      .then((data) => {
        setNewArrival(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Error fetching new arrivals:", err);
      });
  }, []);

  return (
    <div className="w-full h-3/5 pb-16">
      <Heading heading="New Arrivals" />
      <span>No Product For Now</span>

      <Slider {...settings}>
        {newArrival?.map((product, i) => (
          <div
            className="px-2 h-96 shadow-lg transform scale-100 hover:scale-105 transition duration-300"
            key={i}
          >
            <Product
              _id={product._id}
              img={product.img} // Assuming `img` is the URL of the product image
              productName={product.productName}
              price={product.price}
              color={product.color}
              badge={product.badge}
              des={product.des}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
