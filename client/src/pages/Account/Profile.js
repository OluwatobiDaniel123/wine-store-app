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
    <div className="text-center">
      <h1 className="font-sans text-blue-800 p-4 font-bold text-2xl">
        ACCOUNT DETAILS{" "}
      </h1>

      <div className="   ">
        <div className=" border-4 p-6  font-extrabold">
          <FaUserCircle className="text-9xl p-2" />
          <div>
            <h3 className="text-3xl font-semibold text-blue-800 ">About Me</h3>
            <div className="flex justify-between h-72">
              <div className="border-4 p-6 w-96">
                <h1>Welcome, {name}</h1>
                <p>Email: {email}</p>
              </div>
              <div className="border-4 p-6 w-96">
                <p>Address: {address}</p>
                <p>City: {city}</p>
                <p>Country: {country}</p>
                <p>Phone No: {phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-[#0f0f59] rounded-lg text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-[#05052e] duration-300 font-bold"
        onClick={HandleLogOut}
      >
        LogOut
      </button>
    </div>
  );
};

export default Profile;
