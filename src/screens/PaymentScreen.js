import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Checkout from "../components/Checkout";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  // checing if shipping address is present or not..
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_PAYMENT_METHOD",
      payload: paymentMethodName,
    });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <Checkout step1 step2 step3></Checkout>
      <div className="container small-container">
        <Helmet>Payment Gateway</Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button
              className="login_register_button"
              style={{ textDecoration: "none" }}
              variant="info"
              type="submit"
            >
              Continue
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentScreen;
