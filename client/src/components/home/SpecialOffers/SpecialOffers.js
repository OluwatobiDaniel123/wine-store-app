import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { useParams } from "react-router-dom";

const SpecialOffers = () => {
  const { category } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://wine-store-app-backend.vercel.app/api/specialofferdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data2) => {
        console.log(data2);

        setData(data2);
      })
      .catch((error) => console.error(error));
  }, []);

  const catData = data.filter((item) => item.cat === category);

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />

      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {[...(data || []), ...(catData || [])]
          .filter(
            (value, index, self) =>
              self.findIndex((v) => v._id === value._id) === index
          )
          .map((data, i) => (
            <div
              key={i}
              className="transform scale-100 hover:scale-105 transition duration-300"
            >
              {" "}
              <Product
                _id={data._id}
                img={data.img}
                productName={data.productName}
                price={data.price}
                color={data.color}
                badge={true}
                des={data.des}
                cat={data.cat}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
