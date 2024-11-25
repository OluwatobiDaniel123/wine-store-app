import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
// import { SplOfferData } from "../../../constants";
import { useParams } from "react-router-dom";

const SpecialOffers = () => {
  const { category } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/specialofferdata")
      .then((res) => res.json())
      .then((SplOfferData) => {
        setData(SplOfferData);
      })
      .catch((err) => {
        console.log("Error fetching new arrivals:", err);
      });
  }, []);

  const catData = data.filter((item) => item.cat === category);

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <span>No Product For Now</span>

      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {/* {data &&
          catData.map((data) => (
            <Product
              key={data._id}
              _id={data._id}
              img={data.img}
              productName={data.productName}
              price={data.price}
              color={data.color}
              badge={true}
              des={data.des}
            />
          ))} */}
        {/* [...(data || []), ...(catData || [])].map((data) */}
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
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
