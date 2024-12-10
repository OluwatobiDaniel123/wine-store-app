import React, { useEffect, useState } from "react";

import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    fetch("https://wine-store-app-server.vercel.app/api/bestsellers")
      .then((res) => res.json())
      .then((data) => {
        setBestSeller(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Error fetching new arrivals:", err);
      });
  }, []);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10 ">
        {bestSeller?.map((product, i) => (
          <div
            className="px-2 transform scale-100 hover:scale-105 transition duration-300"
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
      </div>
    </div>
  );
};

export default BestSellers;
