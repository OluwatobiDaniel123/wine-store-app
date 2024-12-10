import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOutUser, resetCart } from "../../redux/orebiSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const {
    isAuthenticated,
    user: { name, email, address, city, country, phone },
  } = useSelector((state) => state.orebiReducer);
  console.log(name);

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
    <div>
      <h1>Welcome, {name}</h1>
      <p>Email: {email}</p>
      <p>Email: {address}</p>
      <p>Email: {city}</p>
      <p>Email: {country}</p>
      <p>Email: {phone}</p>
      <button onClick={HandleLogOut}>LogOut</button>
    </div>
  );
};

export default Profile;
