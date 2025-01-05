import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOutUser, resetCart } from "../../redux/orebiSlice";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const {
    isAuthenticated,
    user: { name, email, address, city, country, phone },
  } = useSelector((state) => state.orebiReducer);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const HandleLogOut = () => {
    dispatch(LogOutUser());
    dispatch(resetCart());
    navigate("/");
    toast.info("Logged out successfully!");
  };

  return (
    <div className="p-6">
      <div className="flex border-2 justify-between p-4">
        <h1 className="font-sans text-blue-800 font-bold text-xl">
          ACCOUNT DETAILS
        </h1>
        <FaUserCircle className="text-7xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="shadow-xl rounded-md p-6">
          <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
          <p>Email: {email}</p>
        </div>

        <div className="shadow-xl rounded-md p-6">
          <p>Address: {address}</p>
          <p>City: {city}</p>
          <p>Country: {country}</p>
          <p>Phone No: {phone}</p>
        </div>
      </div>

      <button
        className="bg-[#0f0f59] rounded-lg text-white text-lg font-bold w-full md:w-[185px] h-[50px] hover:bg-[#05052e] duration-300 mt-6"
        onClick={HandleLogOut}
      >
        LogOut
      </button>
    </div>
  );
};

export default Profile;
