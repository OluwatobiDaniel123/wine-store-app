import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { UserInfo } from "../../redux/orebiSlice"; // Adjust the path as per your project structure
import { logoLight } from "../../assets/images";
import { setCart } from "../../redux/orebiSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const [InputValue, setInputValue] = useState({ email: "", password: "" });
  const [ErrorInputValue, setErrorInputValue] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const HandleInput = (e) => {
    setInputValue({ ...InputValue, [e.target.name]: e.target.value });
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    fetch("https://wine-store-app-backend.vercel.app/auth/login", {
      method: "POST",
      body: JSON.stringify(InputValue),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          navigate("/profile");
        } else {
          console.error("Login failed:", data.message);
        }
        dispatch(
          UserInfo({
            name: data.user.clientName,
            email: data.user.email,
            address: data.user.address,
            city: data.user.city,
            country: data.user.country,
            phone: data.user.phone,
          })
        );

        dispatch(setCart(data.products || []));
        toast.success("Login successful!");
      })
      .catch((error) => console.error(error));

    const errors = {};
    if (!InputValue.email) {
      errors.errEmail = "Enter your Email";
    } else if (!EmailValidation(InputValue.email)) {
      errors.errEmail = "Enter a Valid Email";
    }

    if (!InputValue.password) {
      errors.errPassword = "Enter your password";
    } else if (InputValue.password.length < 6) {
      errors.errPassword = "Passwords must be at least 6 characters";
    }

    setErrorInputValue(errors);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>

          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>

          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with CHRISALPHAWINE
              </span>
              <br />
              Log in to access your account, track your orders, and enjoy
              personalized shopping.
            </p>
          </div>

          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © CHRISALPHAWINE
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/profile">
              <button className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Start shopping now
              </button>
            </Link>
          </div>
        ) : (
          <form
            className="w-full lgl:w-[450px] h-screen flex items-center justify-center"
            onSubmit={handleSignIn}
          >
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Work Email
                  </p>
                  <input
                    onChange={HandleInput}
                    value={InputValue.email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    name="email"
                    placeholder="john@workemail.com"
                  />
                  {ErrorInputValue.errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {ErrorInputValue.errEmail}
                    </p>
                  )}
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={HandleInput}
                    value={InputValue.password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    name="password"
                    placeholder="Create password"
                  />
                  {ErrorInputValue.errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      {ErrorInputValue.errPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
                >
                  Sign In
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
