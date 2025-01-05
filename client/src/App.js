import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Account/Profile";
import { useState, useEffect } from "react";
import LockedPage from "./pages/Lock_Page/Lock_Page";

import Main from "./dashboard/Main";
import Dashboard from "./dashboard/Pages/Dashbaord";
import Inventory from "./dashboard/Pages/Inventory";
import Orders from "./dashboard/Pages/Orders";
import Customers from "./dashboard/Pages/Customers";
import ProductUpload from "./dashboard/Pages/ProductUpload/ProductUpload";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="/" element={<LockedPage />}> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/category/:category" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/dashboard" element={<Main />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/upload_product" element={<ProductUpload />}></Route>

      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
    </Route>
  )
);

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("ageVerification");
    if (storedData) {
      const { verified, expiry } = JSON.parse(storedData);

      if (verified && new Date().getTime() < expiry) {
        setShowPopup(false);
        return;
      }
    }
    setShowPopup(true);
  }, []);

  const handleVerification = (isOver19) => {
    if (isOver19) {
      const expirationPeriod = 5 * 60 * 1000;
      const expiry = new Date().getTime() + expirationPeriod;

      localStorage.setItem(
        "ageVerification",
        JSON.stringify({ verified: true, expiry })
      );
    } else {
      alert("You must be over 18 to access this site.");
      window.location.href = "https://google.com";
    }
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              width: "300px",
            }}
          >
            <h2>Age Verification</h2>
            <p>Are you over 18 years old?</p>
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => handleVerification(true)}
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => handleVerification(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {!showPopup && (
        <div className="font-bodyFont">
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}

export default App;
