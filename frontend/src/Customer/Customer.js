import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBiId } from "../Services/Services";
import user from "../Photos/user.png";
import { NavBar } from "../WebMain/NavBar";
import Spinner from "react-bootstrap/Spinner";
import { Summary } from "../Services/Services";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));

const Customer = () => {
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [errorInput, setErrorInput] = useState("");
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
        <div className="mt-5">
          <input hidden asp-for="ProductId" />
          <div className="card  container mt-4">
            <div className="card-header bg-primary text-light ml-0  row ">
              <div className="col-12 col-md-6">
                <h1 className="text-white-50">{product.title}</h1>
                <p className="text-warning">{product.author}</p>
              </div>
              <div className="col-12 col-md-6 text-end pt-4">
                <span className="badge bg-info pt-2" style={{ height: "30px" }}>
                  {product.category.name}
                </span>
                <span
                  className="badge bg-warning pt-2 ms-2"
                  style={{ height: "30px" }}
                >
                  {product.coverTypes.name}
                </span>
              </div>
            </div>
            <div className="card-body row container">
              <div className="container rounded p-2">
                <div className="row">
                  <div className="col-lg-8 col-xs-12">
                    <div className=" pl-2">
                      <h5 className="text-muted">ISBN : {product.isbc}</h5>
                    </div>
                    <div className=" pl-2">
                      <h5 className="text-muted pb-2">
                        List Price: <strike>{product.listPrice}</strike>
                      </h5>
                    </div>
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
                    <div className="row pl-2 mt-4">
                      <p className="text-secondary">{product.description}</p>
                    </div>
                    <div className="pl-2">
                      <div className="d-flex">
                        <label className="text-primary me-3">Count:</label>
                        <input
                          className="form-control border border-primary"
                          type="number"
                          min="1"
                          onChange={giveValue}
                        />
                      </div>
                      {errorInput && (
                        <span className="text-danger">{errorInput}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3 offset-lg-1 text-center mt-2">
                    <img
                      src={
                        product
                          ? "https://localhost:44358/" + product.imageURL
                          : user
                      }
                      width="100%"
                      className="rounded"
                      style={{ height: "370px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-12 col-md-6 pb-1">
                  <button
                    className="btn btn-success form-control"
                    style={{ height: "50px" }}
                    onClick={() => {
                      return navigate("/welcome/" + token.userName);
                    }}
                  >
                    Back to List
                  </button>
                </div>
                <div className="col-12 col-md-6 pb-1">
                  <button
                    type="button"
                    value="Add to Cart"
                    className="btn btn-primary form-control"
                    style={{ height: "50px" }}
                    onClick={summary}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;
