import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { NavBar } from "../WebMain/NavBar";
import { getCategories } from "../Services/Services";
import Button from "react-bootstrap/Button";
import { Audio } from "react-loader-spinner";

function Category() {
  const [categories, setCategories] = useState("");
  let i = 1;

  useEffect(() => {
    getCategories(window.BaseUrlGeneral + "category")
      .then((response) => {
        setTimeout(() => {
          setCategories(response.data);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      {!categories ? (
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
              href="/categories/create"
            >
              New Category
            </Button>{" "}
          </div>

          <div className="table-responsive">
            <Table className="mt-4" striped bordered hover size="sm">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Name</th>
                  <th>Display Order</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="text-center">{i++}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.displayOrder}</td>
                      <td className="text-center">{item.createdDateTime}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="primary me-2"
                            href={`/categories/` + item.id}
                          >
                            Edit
                          </Button>{" "}
                          <Button variant="secondary">Delete</Button>{" "}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}

export default Category;
