import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart, setCheckoutData } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import Total from "./Total";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const checkoutData = useSelector((state) => state.orebiReducer.checkoutData);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const price = products.reduce((acc, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 0;
      return acc + itemPrice * itemQuantity;
    }, 0);

    const shipping = price <= 200 ? 30 : price <= 400 ? 25 : 20;

    dispatch(setCheckoutData({ totalAmt: price, shippingCharge: shipping }));
  }, [dispatch, products]);

  const handleCheckout = async () => {
    if (!userId) {
      alert("Please log in to place an order.");
      navigate("/login");
      return;
    }

    const orderData = {
      userId,
      items: products.map((item) => ({
        title: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      totalAmount: checkoutData.totalAmt + checkoutData.shippingCharge,
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
        dispatch(resetCart()); // Clear the cart
        navigate("/orders"); // Redirect to orders page
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item, i) => (
              <div key={i}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <p className="text-sm mdl:text-base font-semibold">
                Apply Coupon
              </p>
            </div>
            <p className="text-lg font-semibold">Update Cart</p>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold flex items-center tracking-wide font-titleFont">
                    <TbCurrencyNaira />
                    {checkoutData.totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold flex items-center tracking-wide font-titleFont">
                    <TbCurrencyNaira />
                    {checkoutData.shippingCharge}
                  </span>
                </p>
                <Total />
              </div>
              <div className="flex justify-end">
                <Link
                  to={{
                    pathname: "/paymentgateway",
                  }}
                >
                  <button
                    onClick={handleCheckout}
                    className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              wine, whisky, etc. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import { resetCart, setCheckoutData } from "../../redux/orebiSlice";
// import { TbCurrencyNaira } from "react-icons/tb";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const products = useSelector((state) => state.orebiReducer.products);
//   const checkoutData = useSelector((state) => state.orebiReducer.checkoutData);
//   const userId = localStorage.getItem("userId"); // Replace with actual auth system

//   useEffect(() => {
//     const price = products.reduce((acc, item) => {
//       const itemPrice = item.price || 0;
//       const itemQuantity = item.quantity || 0;
//       return acc + itemPrice * itemQuantity;
//     }, 0);

//     const shipping = price <= 200 ? 30 : price <= 400 ? 25 : 20;

//     dispatch(setCheckoutData({ totalAmt: price, shippingCharge: shipping }));
//   }, [dispatch, products]);

//   // 🛒 Submit Order Function
//   const handleCheckout = async () => {
//     if (!userId) {
//       alert("Please log in to place an order.");
//       return;
//     }

//     const orderData = {
//       userId,
//       items: products.map((item) => ({
//         title: item.title,
//         price: item.price,
//         quantity: item.quantity,
//         total: item.price * item.quantity,
//       })),
//       totalAmount: checkoutData.totalAmt + checkoutData.shippingCharge,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/orders/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Order placed successfully!");
//         dispatch(resetCart()); // Clear the cart
//         navigate("/orders"); // Redirect to orders page
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   return (
//     <div className="max-w-container mx-auto px-4">
//       <Breadcrumbs title="Cart" />
//       {products.length > 0 ? (
//         <div className="pb-20">
//           {/* Cart Table */}
//           <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
//             <h2 className="col-span-2">Product</h2>
//             <h2>Price</h2>
//             <h2>Quantity</h2>
//             <h2>Sub Total</h2>
//           </div>
//           {/* Cart Items */}
//           <div className="mt-5">{/* Render Cart Items Here */}</div>

//           {/* Checkout Section */}
//           <div className="max-w-7xl flex justify-end mt-4">
//             <div className="w-96 flex flex-col gap-4">
//               <h1 className="text-2xl font-semibold text-right">Cart Totals</h1>
//               <p className="flex items-center justify-between border py-1.5 text-lg px-4">
//                 Subtotal{" "}
//                 <span className="font-semibold">
//                   <TbCurrencyNaira />
//                   {checkoutData.totalAmt}
//                 </span>
//               </p>
//               <p className="flex items-center justify-between border py-1.5 text-lg px-4">
//                 Shipping Charge{" "}
//                 <span className="font-semibold">
//                   <TbCurrencyNaira />
//                   {checkoutData.shippingCharge}
//                 </span>
//               </p>
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-primeColor text-white hover:bg-black py-2"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <motion.div className="flex flex-col items-center">
//           <p>Your cart is empty.</p>
//           <Link to="/shop">
//             <button className="bg-primeColor text-white py-2 px-4">
//               Continue Shopping
//             </button>
//           </Link>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Cart;
