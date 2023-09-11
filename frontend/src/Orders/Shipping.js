import React, { useEffect, useState } from "react";
import { NavBar } from "../WebMain/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../Services/Services";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import { procesingOrder } from "../Services/Services";
import Swal from "sweetalert2";
import { Audio } from "react-loader-spinner";

const Shipping = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState("");
  const [carrier, setCarrier] = useState("");
  const [tracking, setTrackin] = useState("");

  useEffect(() => {
    getOrderById(window.BaseUrlGeneral + "Order/ById/" + id)
      .then((response) => {
        setTimeout(() => {
          setOrder(response.data);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const generate = () => {
    setCarrier(generateRandomNumbers("carr", "yjmv"));
    setTrackin(generateRandomNumbers("track", "yjmv"));
  };

  const generateRandomNumbers = (pr, su) => {
    for (let i = 0; i < 15; i++) pr += ~~(Math.random() * 10);
    return pr + su;
  };

  const shippedOrder = () => {
    let obj = {
      id: order.orderHeader.id,
      carrier:
        !order.orderHeader.carrier == "" ? order.orderHeader.carrier : carrier,
      tracking:
        !order.orderHeader.trackingNumber == ""
          ? order.orderHeader.trackingNumber
          : tracking,
      orderStatus: order.orderHeader.orderStatus,
    };
    procesingOrder(window.BaseUrlGeneral + "Order/ProcessingOrder", obj)
      .then((response) => {
        console.log(response);
        if ((response.status = 200)) {
          return navigate("/Order/All");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendRequest = () => {
    if (carrier == "" || tracking == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          order.orderHeader.paymentStatus !== "Pending"
            ? "Press button Generate Carrier and Tracking!"
            : "Payment pending",
      });
    } else {
      let obj = {
        id: order.orderHeader.id,
        carrier:
          !order.orderHeader.carrier == ""
            ? order.orderHeader.carrier
            : carrier,
        tracking:
          !order.orderHeader.trackingNumber == ""
            ? order.orderHeader.trackingNumber
            : tracking,
        orderStatus: order.orderHeader.orderStatus,
      };
      procesingOrder(window.BaseUrlGeneral + "Order/ProcessingOrder", obj)
        .then((response) => {
          console.log(response);
          if ((response.status = 200)) {
            return navigate("/Order/All");
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
        <div className="container mt-4">
          <div className="card">
            <div className="card-header bg-dark text-light ml-0 row container">
              <div className="col-12 d-none d-md-block col-md-6 pb-1">
                <i className="fas fa-shopping-cart"></i> Order Summary
              </div>
              <div className="col-12 col-md-4 offset-md-2 text-right">
                <a className="btn btn-outline-info form-control btn-sm">
                  Back to Orders
                </a>
              </div>
            </div>
            <div className="card-body">
              <div className="container rounded p-2">
                <div className="row">
                  <div className="col-12 col-lg-6 pb-4">
                    <div className="row">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">PickUp Details:</span>
                      </h4>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">Name</div>
                      <div className="col-9">
                        <input
                          readOnly
                          type="text"
                          value={order.orderHeader.name}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">Phone</div>
                      <div className="col-9">
                        <input
                          readOnly
                          type="text"
                          className="form-control"
                          value={order.orderHeader.phoneNumber}
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">Address</div>
                      <div className="col-9">
                        <input
                          type="text"
                          className="form-control"
                          value={order.orderHeader.streetAddress}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">City</div>
                      <div className="col-9">
                        <input
                          type="text"
                          className="form-control"
                          readOnly
                          value={order.orderHeader.city}
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">State</div>
                      <div className="col-9">
                        <input
                          type="text"
                          className="form-control"
                          value={order.orderHeader.state}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">Zip Code</div>
                      <div className="col-9">
                        <input
                          type="text"
                          className="form-control"
                          value={order.orderHeader.postalCode}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row my-1">
                      <div className="col-3">Carrier</div>
                      <div className="col-9">
                        <input
                          readOnly
                          id="carrier"
                          type="text"
                          className="form-control"
                          value={
                            order.orderHeader.carrier == null
                              ? carrier
                              : order.orderHeader.carrier
                          }
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">Tracking</div>
                      <div className="col-9">
                        <input
                          readOnly
                          type="text"
                          className="form-control"
                          value={
                            order.orderHeader.trackingNumber == null
                              ? tracking
                              : order.orderHeader.trackingNumber
                          }
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">Shipping Date</div>
                      <div className="col-9">
                        <input
                          value={order.orderHeader.paymentDate}
                          readOnly
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-3">Payment Status</div>
                      <div className="col-9">
                        <input
                          readOnly
                          className={
                            order.orderHeader.paymentStatus === "Pending"
                              ? "form-control text-danger fw-bold"
                              : "form-control"
                          }
                          value={order.orderHeader.paymentStatus}
                        />
                      </div>
                    </div>
                    {order.orderHeader.trackingNumber == null &&
                      order.orderHeader.carrier == null && (
                        <Button
                          variant="outline-primary"
                          className="form-control my-1 mt-2"
                          onClick={generate}
                          disabled={
                            order.orderHeader.paymentStatus === "Pending"
                          }
                        >
                          Generate Carrier and tracking automatically
                        </Button>
                      )}
                  </div>
                  <div className="col-12 col-lg-5 offset-lg-1">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-primary">Order Summary</span>
                    </h4>
                    <label className="btn btn-outline-primary form-control my-2">
                      Order Status - OrderStatus
                    </label>

                    <ul className="list-group mb-3">
                      <li className="list-group-item d-flex justify-content-between p-2">
                        <div className="container">
                          {order.orderDetails.map((items) => (
                            <div className="row mt-2" key={items.id}>
                              <div className="col-9">
                                <h6 className="my-0 text-primary fw-bold">
                                  {items.product.title}
                                </h6>
                                <small className="text-muted">
                                  Price : {items.price}
                                </small>
                                <br />
                                <small className="text-muted">
                                  Quantity : {items.count}
                                </small>
                              </div>
                              <div className="col-3">
                                <p className="text-danger fw-bold">
                                  $ {items.count * items.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </li>

                      <li className="list-group-item bg-info">
                        <div className="row container">
                          <div className="col-9">
                            <h5 className="text-danger">Total: </h5>
                          </div>
                          <div className="col-3 text-right">
                            <h5 className="text-danger">
                              $ {order.orderHeader.orderTotal}
                            </h5>
                          </div>
                        </div>
                      </li>
                    </ul>
                    {/* <Button variant={btn.color} className="form-control my-1">
                      {btn.message}
                    </Button> */}
                    {order.orderHeader.orderStatus == "Pending" ? (
                      <Button
                        variant="primary"
                        onClick={() => sendRequest()}
                        className="form-control my-1"
                      >
                        Start Processing
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => shippedOrder()}
                        className="form-control my-1"
                      >
                        Shipping
                      </Button>
                    )}
                    <Button variant="danger" className="form-control my-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shipping;
