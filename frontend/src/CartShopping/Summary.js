import React, { useEffect, useState } from "react";
import { getItemsCart } from "../Services/Services";
import { NavBar } from "../WebMain/NavBar";
import { summaryPost } from "../Services/Services";
import { Audio } from "react-loader-spinner";
import moment from "moment";

let date = new Date();

const Summary = () => {
  const [items, setItems] = useState("");

  useEffect(() => {
    let fecha = date.setDate(date.getDate() + 5);
    console.log(date.toLocaleDateString("en-US"));

    getItemsCart(window.BaseUrlGeneral + "Cart")
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const datesFix = (date, days) => {
  //   let goodDate = date.setDate(date.getDate() + days);
  //   return goodDate;
  // };

  const summarySend = async (e) => {
    e.preventDefault();

    let obj = {
      name: items.listCart[0].applicationUser.name,
      streetAddress: items.listCart[0].applicationUser.streetAddress,
      city: items.listCart[0].applicationUser.city,
      state: items.listCart[0].applicationUser.state,
      postalCode: items.listCart[0].applicationUser.postalCode,
      postalCode: items.listCart[0].applicationUser.postalCode,
      phoneNumber: items.listCart[0].applicationUser.phoneNumber,
      orderTotal: items.orderHeader.orderTotal,
      applicationUserId: items.listCart[0].applicationUserId,
    };
    summaryPost(window.BaseUrlGeneral + "Cart/Summary", obj)
      .then((response) => {
        console.log(response.data);
        window.location.replace(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar />
      {!items ? (
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
        <form onSubmit={summarySend}>
          <br />
          <div className="container">
            <div className="card">
              <div className="card-header bg-dark text-light ml-0">
                <div className=" row container">
                  <div className="col-6">
                    <i className="fa fa-shopping-cart"></i> &nbsp; Order Summary
                  </div>
                  <div className="col-6 text-end">
                    <a className="btn btn-outline-info btn-sm">Back to Cart</a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="container rounded p-2">
                  <div className="row">
                    <div className="col-12 col-lg-6 pb-4">
                      <div className="row">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-info">Shipping Details:</span>
                        </h4>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Name</label>
                        </div>
                        <div className="col-9">
                          <input
                            className="form-control"
                            defaultValue={
                              items.listCart[0].applicationUser.name
                            }
                          />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Phone</label>
                        </div>
                        <div className="col-9">
                          <input
                            className="form-control"
                            defaultValue={
                              items.listCart[0].applicationUser.phoneNumber
                            }
                          />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Street Address</label>
                        </div>
                        <div className="col-9">
                          <input
                            className="form-control"
                            defaultValue={
                              items.listCart[0].applicationUser.streetAddress
                            }
                          />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>City</label>
                        </div>
                        <div className="col-9">
                          <input
                            className="form-control"
                            defaultValue={
                              items.listCart[0].applicationUser.city
                            }
                          />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>State</label>
                        </div>
                        <div className="col-9">
                          <input
                            className="form-control"
                            defaultValue={
                              items.listCart[0].applicationUser.state
                            }
                          />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-3">
                          <label>Postal Code</label>
                        </div>
                        <div className="col-9">
                          <input
                            className="form-control"
                            defaultValue={
                              items.listCart[0].applicationUser.postalCode
                            }
                          />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-5 offset-lg-1">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-info">Order Summary:</span>
                      </h4>
                      <ul className="list-group mb-3">
                        {items.listCart.map((shop) => {
                          return (
                            <div key={shop.product.id}>
                              <li className="list-group-item d-flex justify-content-between">
                                <div>
                                  <h6 className="my-0 text-warning">
                                    {shop.product.title}
                                  </h6>
                                  <small className="text-muted">
                                    Quantity: {shop.count}
                                  </small>
                                </div>
                                <span className="text-muted">
                                  $ {shop.price * shop.count}
                                </span>
                              </li>
                            </div>
                          );
                        })}
                        <li className="list-group-item d-flex justify-content-between bg-light">
                          <small className="text-info">Total (USD)</small>
                          <strong className="text-info">
                            $ {items.orderHeader.orderTotal}
                          </strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-12 col-md-8 pt-2">
                    <p
                      style={{
                        color: "maroon",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      Estimate Arrival Date:&nbsp; &nbsp;
                      {moment().add(7, "days").calendar()} -&nbsp;
                      {moment().add(14, "days").calendar()}
                    </p>
                  </div>
                  <div className="col-12 col-md-4">
                    <button
                      type="submit"
                      value="Place Order"
                      className="btn btn-primary form-control"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Summary;
