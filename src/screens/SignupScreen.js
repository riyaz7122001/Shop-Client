import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

const SignupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please Enter all the details properly...");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  //   return (
  //   <div className="Signup">
  //     <div className="signInfo">
  //       <h1 className="signup_header">Signup</h1>
  //       <input
  //         type="text"
  //         name="name"
  //         placeholder="Enter your name"
  //         autoCapitalize="false"
  //         autoComplete="false"
  //         autoCorrect="false"
  //         onChange={handleChange}
  //         value={value.name}
  //       />
  //       <input
  //         type="email"
  //         name="email"
  //         placeholder="Enter your email"
  //         autoCapitalize="false"
  //         autoComplete="false"
  //         autoCorrect="false"
  //         onChange={handleChange}
  //         value={value.email}
  //       />
  //       <input
  //         type="password"
  //         name="password"
  //         placeholder="Enter your password"
  //         autoCapitalize="false"
  //         autoComplete="false"
  //         autoCorrect="false"
  //         onChange={handleChange}
  //         value={value.password}
  //       />

  //       <div className="footer">
  //         <span className="error">{error}</span>
  //         <button onClick={handleSignup} disabled={buttonDisabled}>
  //           Signup
  //         </button>
  //         <p>
  //           Already have any account?{" "}
  //           <span>
  //             <NavLink exact to="/login">
  //               Login
  //             </NavLink>
  //           </span>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SignupScreen;
