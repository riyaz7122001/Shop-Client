import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
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
<<<<<<< HEAD

  return (
    <div className="login">
      <div className="login_container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="text-center">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <h5>Name</h5>
            <input
              className="login_input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="confirmPassword">
            <h5>Confirm Password</h5>
            <input
              className="login_input"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
=======
return (
    <Container className="small-container">
      <div className="small-container">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Group>
          <div className="mb-3">
            <Button variant="info" type="submit">Sign Up</Button>
          </div>
          <div className="mb-3">
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </div>
    </Container>
  );  
};
>>>>>>> refs/remotes/backend/main

          <div className="mb-3">
            <button type="submit" className="login_signIn">
              Sign Up
            </button>
          </div>
          <div className="login_register_button">
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default SignupScreen;
