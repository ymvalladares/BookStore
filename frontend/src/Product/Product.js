import React, { useEffect, useState } from "react";
import { NavBar } from "../WebMain/NavBar";
import { getProducts } from "../Services/Services";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { DeleteProduct } from "../Services/Services";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));

export const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState("");

  useEffect(() => {
    getProducts(window.BaseUrlGeneral + "product")
      .then((response) => {
        setTimeout(() => {
          setProducts(response.data);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const openSweet = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((response) => {
      if (response.isConfirmed == true) {
        DeleteProduct(window.BaseUrlGeneral + "product/delete/" + id)
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              navigate("/welcome/" + token.userName);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <NavBar />
      {!products ? (
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
          <div className="d-grid justify-content-md-end">
            <Button
              variant="primary me-2"
              className=" mt-3"
              href="/product/upset"
            >
              New Product
            </Button>{" "}
          </div>
          {products == "" ? (
            <p>no dates</p>
          ) : (
            <div className="table-responsive">
              <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                  <tr className="text-center">
                    <th>Title</th>
                    <th>ISBC</th>
                    <th>Price</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>CoverType</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center">{item.title}</td>
                        <td className="text-center">{item.isbc}</td>
                        <td className="text-center">{item.price}</td>
                        <td className="text-center">{item.author}</td>
                        <td className="text-center">{item.category.name}</td>
                        <td className="text-center">{item.coverTypes.name}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="primary me-2"
                              href={`/product/upset/` + item.id}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              onClick={() => openSweet(item.id)}
                              variant="secondary"
                            >
                              Delete
                            </Button>{" "}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </>
  );
};
