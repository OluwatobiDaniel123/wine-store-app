import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { name: "", description: "", price: "", color: "", badge: "", image: null },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const handleImageChange = (index, event) => {
    const newProducts = [...products];
    newProducts[index].image = event.target.files[0];
    setProducts(newProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        description: "",
        price: "",
        color: "",
        badge: "",
        image: null,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    products.forEach((product, index) => {
      const { image, ...productData } = product;
      formData.append("products", JSON.stringify(productData));
      formData.append("images", image);
    });

    try {
      // https://wine-store-app-backend.vercel.app/api/products
      const response = await axios.post(
        // "https://wine-store-app-backend.vercel.app/api/specialofferdata",
        "https://wine-store-app-backend.vercel.app/api/bestsellers",
        formData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // navigate("/dashboard");

      console.log("Products uploaded:", response.data);
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);

      console.error("Error uploading products:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Upload Products</h2>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Product {index + 1}</h3>
            <label className="block text-sm font-medium text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(index, e)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={(e) => handleChange(index, e)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => handleChange(index, e)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700">
              Categories:
            </label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={(e) => handleChange(index, e)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700">
              Badge:
            </label>
            <input
              type="text"
              name="badge"
              value={product.badge}
              onChange={(e) => handleChange(index, e)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700">
              Image:
            </label>
            <input
              type="file"
              name="images"
              multiple
              onChange={(e) => handleImageChange(index, e)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          className="mb-4 w-full bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Add Another Product
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Upload Products
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
