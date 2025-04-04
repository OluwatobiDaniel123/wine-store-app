import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function Items({ currentItems }) {
  return (
    <>
      {currentItems.map((item) => (
        <div
          className="w-full transform scale-100 hover:scale-105 transition duration-300"
          key={item._id}
        >
          <Product
            _id={item._id}
            img={item.image}
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
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );

  useEffect(() => {
    // fetch("https://wine-store-app-backend.vercel.app/api/product", {
    fetch("https://wine-store-app-backend.vercel.app/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setNewProduct(data);
        setFetchError(null);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const [filterCategories, setFilterCategories] = useState(false);

  const filteredItems = useMemo(() => {
    return newProduct.filter((item) => {
      const isBrandSelected =
        selectedBrands.length === 0 ||
        selectedBrands.some((brand) => brand.title === item.brand);

      const isCategorySelected =
        !filterCategories ||
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => category.title === item.cat);

      return isBrandSelected && isCategorySelected;
    });
  }, [newProduct, selectedBrands, selectedCategories, filterCategories]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 mdl:gap-4 lg:gap-4 ">
        {fetchError && <p className="text-red-500">{fetchError}</p>}
        {loading ? (
          <div>
            <div className="spinner-grow m-5" role="status"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <Items currentItems={currentItems} />
        )}
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
          ariaLabelBuilder={(page) => `Go to page ${page}`}
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
