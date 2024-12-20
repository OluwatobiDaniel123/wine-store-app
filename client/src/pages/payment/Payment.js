import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import PaystackPop from "@paystack/inline-js";
import { useSelector } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { totalAmt, shippingCharge } = useSelector(
    (state) => state.orebiReducer.checkoutData
  );

  const TotalAmt = totalAmt + shippingCharge;

  const { name, email } = useSelector((state) => state.orebiReducer.user);
  console.log(name, email);

  const [paymentData, setPaymentData] = useState({
    amount: TotalAmt,
    name: name,
    email: email,
  });

  const HandleInput = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const HandleSUbmit = (e) => {
    e.preventDefault();
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_test_39c77ec63722966d5894708cc17252166da01be9",
      amount: paymentData.amount * 100,
      name: paymentData.name,
      email: paymentData.email,

      onSuccess(transaction) {
        console.log(transaction);
        navigate("/");
        toast.success(
          `Payment successful! Reference: ${transaction.reference}`
        );
        dispatch(resetCart());
        setPaymentData({ amount: "", name: "", email: "" });
      },

      onCancel() {
        console.log("You canceled the transaction.");
      },
    });
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <form
          onSubmit={HandleSUbmit}
          className="w-full lgl:w-[450px] flex items-center justify-center"
        >
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Pay Now
            </h1>

            <div className="flex flex-col gap-.5">
              <p className="font-titleFont text-base font-semibold text-gray-600">
                Amount
              </p>
              <input
                value={paymentData.amount}
                className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                type="number"
                name="amount"
                placeholder="Amount"
                onChange={HandleInput}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Name
                </p>
                <input
                  onChange={HandleInput}
                  value={paymentData.name}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  name="name"
                  placeholder="Name"
                  readOnly
                />
              </div>

              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email
                </p>
                <input
                  onChange={HandleInput}
                  value={paymentData.email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                  readOnly
                />
              </div>

              <button
                type="submit"
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
                Pay
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
