import React, { useContext, useEffect, useState } from "react";
import { getItemsCart } from "../Services/Services";
import { NavBar } from "../WebMain/NavBar";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

//const url = "https://localhost:44358/WebBook/Cart";
const url = "https://192.168.86.26:45455/WebBook/Cart";

const CartShopping = () => {
  const [items, setItems] = useState("");
  const history = useNavigate();

  useEffect(() => {
    getItemsCart(window.BaseUrlGeneral + "Cart")
      .then((response) => {
        setTimeout(() => {
          console.log(response.data);
          setItems(response.data);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onsubmit = (e) => {
    e.preventDefault();

    history("/Cart/Summary");
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
        <form onSubmit={onsubmit}>
          <div className="container mt-5">
            <div className="card">
              <div className="card-header bg-dark text-light ml-0">
                <div className="row">
                  <div className="col-6 pt-2">
                    <i className="fa fa-shopping-cart"></i> &nbsp; Shopping Cart
                  </div>
                  <div className="col-6 text-end">
                    <a className="btn btn-outline-info btn-sm">
                      Continue Shopping
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-body">
                {!items.listCart.lenght > 0 ? (
                  items.listCart.map((shop) => {
                    return (
                      <div className="row" key={shop.id}>
                        <div className="d-none d-lg-block col-lg-1 text-center py-2">
                          <img
                            src={
                              "https://localhost:44358/" + shop.product.imageURL
                            }
                            className="rounded"
                            height="80px"
                            width="80px"
                          />
                        </div>
                        <div className="col-lg-6 pt-md-3">
                          <h5>
                            <strong>{shop.product.title}</strong>
                          </h5>
                          <p>
                            <small>{shop.product.description}</small>
                          </p>
                        </div>
                        <div className="col-lg-5 text-center row">
                          <div className="col-4 text-md-right pt-4">
                            <h6>
                              <strong>
                                {shop.price}
                                <span className="text-muted">
                                  &nbsp;x &nbsp;
                                </span>
                                {shop.count}
                              </strong>
                            </h6>
                          </div>
                          <div className="col-6 col-sm-4 col-lg-6 pt-2">
                            <div className="w-75 btn-group" role="group">
                              <a
                                className="btn btn-primary"
                                // onClick={() => {
                                //   plus(shop);
                                // }}
                              >
                                <i className="bi bi-plus-square"></i>
                              </a>
                              &nbsp;
                              <a
                                className="btn btn-warning"
                                // onClick={() => {
                                //   decrease(shop);
                                // }}
                              >
                                <i className="bi bi-dash-square"></i>
                              </a>
                            </div>
                          </div>
                          <div className="col-2 col-sm-4 col-lg-2 text-right pt-2">
                            <a
                              className="btn btn-danger"
                              // onClick={() => {
                              //   remove(shop.id);
                              // }}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-info">
                    There are not item yet
                  </p>
                )}

                <br />

                <div className="row">
                  <div className="col-12 col-md-6 offset-md-6 col-lg-4 offset-lg-8 pr-4">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between bg-light">
                        <span className="text-info"> Total (USD)</span>
                        <strong className="text-info">
                          $ {items.orderHeader.orderTotal}
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="card-footer row">
                  <div className="col-sm-12 col-lg-4 col-md-6 offset-lg-8 offset-md-6 ">
                    {console.log(items.listCart)}
                    <button
                      className="btn btn-success form-control"
                      disabled={items.listCart.lenght > 0 ? true : false}
                    >
                      Summary
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

export default CartShopping;
