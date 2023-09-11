import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { NavBar } from "../WebMain/NavBar";
import { getCoverTypes } from "../Services/Services";
import Button from "react-bootstrap/Button";
import { Audio } from "react-loader-spinner";

function CoverType() {
  const [coverType, setCoverType] = useState("");
  let i = 1;

  useEffect(() => {
    getCoverTypes(window.BaseUrlGeneral + "coverType")
      .then((response) => {
        setTimeout(() => {
          setCoverType(response.data);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      {!coverType ? (
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
              href="/coverType/create"
            >
              New CoverType
            </Button>{" "}
          </div>
          {!coverType ? (
            <p>no dates</p>
          ) : (
            <div className="table-responsive">
              <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coverType.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="text-center">{i++}</td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center">
                            <Button
                              variant="primary me-2"
                              href={`/coverType/` + item.id}
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
          )}
        </div>
      )}
    </>
  );
}

export default CoverType;
