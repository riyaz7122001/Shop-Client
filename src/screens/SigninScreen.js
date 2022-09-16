import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      console.log(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // checking if user is signin already then redirct it
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <div className="login">
        <div className="login_container">
          <Helmet>
            <title>Sign In</title>
          </Helmet>
          <h1 className="text-center">Sign In</h1>
          <form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <h5>Email</h5>
              <input
                className="login_input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <h5>Password</h5>
              <input
                className="login_input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <div className="mb-3">
              <button type="submit" className="login_signIn">
                Sign in
              </button>
            </div>
            <p>
              By signing-in you Agree to Our Condition of Use & Sale. Please See
              our Privacy Notice, our Cookies and our Interest-Based Ads Notice.{" "}
            </p>
            <div className="login_register_button">
              New customer?{" "}
              <Link
                style={{ textDecoration: "none" }}
                to={`/signup?redirect=${redirect}`}
              >
                Create your account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninScreen;