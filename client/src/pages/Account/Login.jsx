import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const newLogin = { email, password };
    //   const { data } = await axios.post("http://localhost:5000/auth/login", {
    //     newLogin,
    //   });

    //   console.log("Login >>>>>", data);
    // } catch (err) {
    //   console.log(err.message);
    // }

    const newLogin = { email, password };

    console.log(newLogin);

    // fetch("http://localhost:5000/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify(newLogin),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));

    fetch(
      "https://wine-store-app-backend.vercel.app/?vercelToolbarCode=H3KMHbnQm2JghTB/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify(newLogin),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
