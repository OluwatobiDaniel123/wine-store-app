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
    <div className="">
      <div className="flex border-2 justify-between">
        <h1 className="font-sans text-blue-800 p-4 font-bold text-xl">
          ACCOUNT DETAILS{" "}
        </h1>
        <FaUserCircle className="text-7xl p-4" />
      </div>

      <div className="  p-6  font-extrabold">
        <div>
          <h3 className="text-3xl font-semibold text-blue-800 ">About Me</h3>
          <div className="flex flex-col gap-6 justify-between">
            <div className="shadow-xl rounded-md h-64 p-6 ">
              <h1>Welcome, {name}</h1>
              <p>Email: {email}</p>
            </div>

            <div className="shadow-xl rounded-md h-64 p-6 ">
              <p>Address: {address}</p>
              <p>City: {city}</p>
              <p>Country: {country}</p>
              <p>Phone No: {phone}</p>
            </div>
            <button
              className="bg-[#0f0f59] rounded-lg text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-[#05052e] duration-300 font-bold"
              onClick={HandleLogOut}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
