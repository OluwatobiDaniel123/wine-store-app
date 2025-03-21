import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const BestSellers = () => {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    fetch("https://wine-store-app-backend.vercel.app/api/bestsellers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBestSeller(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 mdl:gap-2 lg:gap-2">
        {bestSeller?.map((product, i) => (
          <div
            className="px-2 transform scale-100 hover:scale-105 transition duration-300"
            key={i}
          >
            <Product
              _id={product._id}
              img={product.image}
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
