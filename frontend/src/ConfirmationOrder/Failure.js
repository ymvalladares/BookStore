import React from "react";
import { useNavigate } from "react-router-dom";
import "./Failure.css";

const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));

const Failure = () => {
  const navigate = useNavigate();

  return (
    <section className="page_404 mt-5">
      <div className="container">
        <div className="row">
          <div className="offset-1 col-sm-10 text-center">
            <div className="four_zero_four_bg">
              <h1 className="text-center">404</h1>
            </div>
            <div className="content_box_404">
              <h3 className="h2">Look like You are Lost</h3>
              <p>The page you are looking for not available</p>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button
              onClick={() => {
                return navigate("/welcome");
              }}
              className="btn btn-primary"
            >
              Go to home
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("TOKEN_KEY");
                return navigate("/login");
              }}
              className="btn btn-primary"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Failure;
