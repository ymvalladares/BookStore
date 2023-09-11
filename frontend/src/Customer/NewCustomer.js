import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBiId } from "../Services/Services";
import book from "../Photos/customer_book.webp";
import { NavBar } from "../WebMain/NavBar";
import Accordion from "react-bootstrap/Accordion";
import { Summary } from "../Services/Services";
import Button from "react-bootstrap/Button";
import StarRatings from "react-star-ratings";
import { Audio } from "react-loader-spinner";

const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));

const NewCustomer = () => {
  const [product, setProduct] = useState({});
  const [valueInput, setValueInput] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [order, setOrder] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductBiId(window.BaseUrlGeneral + "product/ById/" + id)
      .then((response) => {
        setTimeout(() => {
          setProduct(response.data);
          setOrder(true);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const giveValue = (e) => {
    setValueInput(e.target.value);
  };

  const summary = (e) => {
    e.preventDefault();
    if (valueInput == "") {
      setErrorInput("Please into a count");
      return false;
    }
    if (valueInput) {
      let obj = {
        productId: product.id,
        count: valueInput,
        applicationUserId: "1",
      };
      Summary(window.BaseUrlGeneral + "Home/Add_Product_Car", obj)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            return navigate("/welcome");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <NavBar />
      {!order ? (
        <div className="position-absolute top-50 start-50 translate-middle fs-5">
          <Audio
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </div>
      ) : (
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-5">
              <img src={book} style={{ height: "600px", width: "100%" }} />
            </div>
            <div className="col-md-7">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Store Product #{product.id}
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      <p className="fw-bold text-success col-sm-4">
                        Title: {product.title}
                      </p>
                      <div className="col-sm-8">
                        <StarRatings
                          rating={4.5}
                          starDimension="22px"
                          starSpacing="6px"
                          starRatedColor="orange"
                        />
                      </div>
                    </div>
                    <p className="fw-bold text-primary">
                      Author: {product.author}
                    </p>

                    <div className="mt-4">
                      <div className="row text-center pl-2">
                        <div className="p-1 col-3  border-bottom">
                          <div>Quantity</div>
                        </div>
                        <div className="p-1 col-3  border-bottom">
                          <div>1-50</div>
                        </div>
                        <div className="p-1 col-3 border-bottom">
                          <div>51-100</div>
                        </div>
                        <div className="p-1 col-3  border-bottom">
                          <div>100+</div>
                        </div>
                      </div>
                      <div
                        className="row text-center pl-2 fw-bold"
                        style={{ color: "maroon" }}
                      >
                        <div className="p-1 col-3">
                          <div>Price</div>
                        </div>
                        <div className="p-1 col-3">
                          <div>{product.price}</div>
                        </div>
                        <div className="p-1 col-3">
                          <div>{product.price50}</div>
                        </div>
                        <div className="p-1 col-3">
                          <div>{product.price100}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pl-2 mt-4">
                      <div className="d-flex">
                        <label
                          className={
                            errorInput
                              ? "text-danger fw-bold me-3"
                              : "text-primary fw-bold me-3"
                          }
                        >
                          Count:
                        </label>
                        <input
                          className={
                            errorInput
                              ? "form-control border border-danger"
                              : "form-control border border-primary"
                          }
                          type="number"
                          min="1"
                          onChange={giveValue}
                        />
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <Button
                        className="me-3"
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                          return navigate("/welcome");
                        }}
                      >
                        Back to List
                      </Button>

                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={summary}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Description Product</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Shipping policies</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Additional Information</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewCustomer;
