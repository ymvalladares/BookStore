import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavBar } from "../WebMain/NavBar";
import { createdCategory } from "../Services/Services";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const CreatedCover = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  let name;

  const giveName = (e) => {
    name = e.target.value;
  };

  const sendValues = (e) => {
    e.preventDefault();
    const values = {
      name: name,
    };
    createdCategory(window.BaseUrlGeneral + "coverType/create", values)
      .then((response) => {
        if ((response.status = 200)) {
          return navigate("/coverType");
        }
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <>
      <NavBar />
      {error && (
        <Alert className="mt-3 col-6 offset-3" variant="danger">
          {error}
        </Alert>
      )}
      <Form onSubmit={sendValues} className="container mt-2 col-6">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Action"
            onChange={giveName}
            required
          />
        </Form.Group>
        <div className="col text-center">
          <Button
            variant="outline-primary"
            type="submit"
            className="text-center"
          >
            Add CoverType
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreatedCover;
