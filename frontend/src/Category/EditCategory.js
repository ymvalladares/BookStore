import React, { useEffect, useState } from "react";
import { NavBar } from "../WebMain/NavBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCategoryBiId } from "../Services/Services";
import { UpdateCategory } from "../Services/Services";
import { Audio } from "react-loader-spinner";

const EditCategory = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getCategoryBiId(window.BaseUrlGeneral + "category/byid/" + id)
      .then((response) => {
        setTimeout(() => {
          setUser(response.data);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const giveValue = (e) => {
    setUser({
      id: user.id,
      name: user.name,
      displayOrder: e.target.value,
    });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    UpdateCategory(window.BaseUrlGeneral + "category/edit", user)
      .then((response) => {
        if (response.status == 200) {
          return navigate("/categories");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar />
      {!user ? (
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
        <Form className="container mt-2 col-6" onSubmit={saveChanges}>
          <Form.Control type="text" readOnly hidden value={user.id || ""} />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="fw-bold"
              type="text"
              readOnly
              value={user.name || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Display Order</Form.Label>
            <Form.Control
              type="number"
              value={user.displayOrder || ""}
              onChange={giveValue}
            />
          </Form.Group>
          <div className="col text-center">
            <Button
              variant="outline-primary"
              type="submit"
              className="text-center"
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default EditCategory;
