import React from "react";
import { useSelector } from "react-redux";
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
} from "../../assets/images/index";

const Profile = () => {
  const User = useSelector((state) => state.orebiReducer.userInfo);
  console.log(User);

  return (
    <div className="max-w-container mx-auto px-4 flex justify-between">
      <div>
        <img className="w-80 rounded-3xl" src={saleImgOne} />
      </div>
      <div>
        <p>Name</p>
      </div>
      <div>
        <p>Age</p>
      </div>
    </div>
  );
};

export default Profile;
