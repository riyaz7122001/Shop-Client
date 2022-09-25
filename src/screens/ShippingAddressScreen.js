import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import Checkout from "../components/Checkout";

const ShippingAddressScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const makeShipping = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      })
    );
    navigate("/payment");
  };

  return (
    <div>
      {" "}
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <Checkout step1 step2></Checkout>
      <div className="login">
        <div className="login_container">
          <h3 className="text-center">Shipping Address</h3>
          <Form onSubmit={makeShipping}>
            <Form.Group className="mb-3" controlId="fullName">
              <h6>Full Name</h6>
              <input
                type="text"
                value={fullName}
                className="login_input"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <h6>Address</h6>
              <input
                type="text"
                value={address}
                className="login_input"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <h6>City</h6>
              <input
                value={city}
                className="login_input"
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <h6>Postal Code</h6>
              <input
                value={postalCode}
                className="login_input"
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <h6>Country</h6>
              <input
                value={country}
                className="login_input"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>

            <div className="mb-3">
              <button className="login_register_button" type="submit">
                Continue
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressScreen;
