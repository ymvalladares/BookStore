import React, { useEffect } from "react";
import imageConfirmation from "../Photos/lawn_leaf.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { paymentStatus } from "../Services/Services";

const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));

const Success = () => {
  const { id } = useParams();

  useEffect(() => {
    paymentStatus(window.BaseUrlGeneral + "Cart/PaymentSuccesfully/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="col-12 text-center">
        <h1 className="text-primary text-center">Order Placed Successfully!</h1>
        Your Order Number is : {id} <br />
        <br />
        <img src={imageConfirmation} width="40%" />
      </div>
      <div className="col-12 text-center" style={{ color: "maroon" }}>
        <br />
        Your order has been placed successfully! <br />
      </div>
      <div className="d-grid justify-content-md-end">
        <Button
          className="mt-4"
          variant="outline-primary"
          size="lg"
          href={"/welcome/" + token.userName}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default Success;
