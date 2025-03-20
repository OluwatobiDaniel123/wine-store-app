const API_URL = "http://localhost:5000/api/orders";

export const getOrders = async (userId) => {
  try {
    const response = await fetch(`${API_URL}?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch orders");
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://wine-store-app-backend.vercel.app/api/products")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching inventory:", error);
    });
};
export const deleteProduct = () => {
  fetch("https://wine-store-app-backend.vercel.app/api/deleteProduct", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: "_id" }), // Replace with actual product ID
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

export const getCustomers = () => {
  return fetch("https://wine-store-app-backend.vercel.app/api/users")
    .then((res) => res.json())
    .then((users) => {
      return users;
    })
    .catch((error) => {
      console.error("Error fetching User:", error);
    });
};

export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
