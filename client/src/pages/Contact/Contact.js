import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import emailjs from "emailjs-com";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const initialValues = {
    clientName: "",
    email: "",
    messages: "",
  };

  const [InputValue, setInputValue] = useState(initialValues);
  const [errorValue, setErrorValue] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleInput = (e) => {
    setInputValue({ ...InputValue, [e.target.name]: e.target.value });
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form inputs
    let isValid = true;

    if (!InputValue.clientName) {
      setErrorValue((prev) => ({ ...prev, errClientName: "Enter your Name" }));
      isValid = false;
    }

    if (!InputValue.email) {
      setErrorValue((prev) => ({ ...prev, errEmail: "Enter your Email" }));
      isValid = false;
    } else if (!EmailValidation(InputValue.email)) {
      setErrorValue((prev) => ({ ...prev, errEmail: "Enter a Valid Email" }));
      isValid = false;
    }

    if (!InputValue.messages) {
      setErrorValue((prev) => ({ ...prev, errMessages: "Enter your Message" }));
      isValid = false;
    }

    // If validation passes, send the email
    if (isValid) {
      const templateParams = {
        client_name: InputValue.clientName,
        client_email: InputValue.email,
        message: InputValue.messages,
      };

      emailjs
        .send(
          "service_qh08omd",
          "template_icla7gq",
          templateParams,
          "uDj1nlX9BVEqunnYs"
        )
        .then(
          (result) => {
            console.log(result.text);
            setSuccessMsg(
              `Thank you dear ${InputValue.clientName}, your message has been received successfully. Further details will be sent to your email at ${InputValue.email}.`
            );
            // Reset form values
          },
          (error) => {
            console.error(error.text);
          }
        );
    }
  };

  return (
    <div className="max-w-container bg-[#eeeefc] mx-auto px-4">
      <Breadcrumbs title="Contact" prevLocation={prevLocation} />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <form onSubmit={handleSubmit} className="pb-20">
          <h1 className="font-titleFont font-semibold text-3xl">
            Fill up a Form
          </h1>
          <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Name
              </p>
              <input
                onChange={handleInput}
                value={InputValue.clientName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                name="clientName"
                placeholder="Enter your name here"
              />
              {errorValue.rrClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errorValue.errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Email
              </p>
              <input
                onChange={handleInput}
                value={InputValue.email}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="email"
                name="email"
                placeholder="Enter your email here"
              />
              {errorValue.errEmail && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errorValue.errEmail}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Messages
              </p>
              <textarea
                onChange={handleInput}
                value={InputValue.messages}
                name="messages"
                cols="30"
                rows="3"
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                type="text"
                placeholder="Enter your message here"
              ></textarea>
              {errorValue.errMessages && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errorValue.errMessages}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
            >
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Contact;
