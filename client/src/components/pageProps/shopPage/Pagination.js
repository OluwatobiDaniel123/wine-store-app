import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";

function Items({ currentItems }) {
  return (
    <>
      <span>No Product For Now</span>

      {currentItems.map((item, i) => (
        <div
          className="w-full transform scale-100 hover:scale-105 transition duration-300"
          key={i}
        >
          <Product
            _id={item._id}
            img={item.img}
            productName={item.productName}
            price={item.price}
            color={item.color}
            badge={item.badge}
            des={item.des}
            pdf={item.pdf}
            ficheTech={item.ficheTech}
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [newProduct, setNewProduct] = useState([]);

  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );

  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );

  useEffect(() => {
    fetch("http://192.168.0.170:5000/api/product")
      .then((res) => res.json())
      .then((data) => {
        setNewProduct(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Error fetching new arrivals:", err);
      });
  }, []);

  const filteredItems = newProduct.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === item.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.title === item.cat);

    return isBrandSelected && isCategorySelected;
  });

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10 ">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel="Next"
          previousLabel="Previous"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          containerClassName="flex text-base gap-2 font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
        />
        <p className="text-base font-normal text-lightText">
          Products {itemOffset + 1} to{" "}
          {Math.min(endOffset, filteredItems.length)} of {filteredItems.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
