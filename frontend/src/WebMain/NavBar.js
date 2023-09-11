import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import imgUser from "../Photos/user.png";
import "./NavBar.css";
import { getItemsCart } from "../Services/Services";
import Container from "react-bootstrap/Container";
import jwt_decode from "jwt-decode";

export const NavBar = () => {
  const [userActive, setUserActive] = useState("");
  const [itemsCar, setItemsCar] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));

    if (!token) {
      navigate("/login");
    }

    const decoded = jwt_decode(token);
    setUserActive(decoded);

    getItemsCart(window.BaseUrlGeneral + "Cart")
      .then((response) => {
        setItemsCar(response.data.listCart);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //logout
  const deleteToken = () => {
    localStorage.removeItem("TOKEN_KEY");
    navigate("/login");
  };

  //events
  const mouseOver = (e) => {
    e.target.style.color = "red";
  };
  const mouseOut = (e) => {
    e.target.style.color = "white";
  };

  //offcanvas
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand="lg" bg="primary" className="ajusteNavbar">
      <Container fluid>
        <Navbar.Brand className="text-light ms-5">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "80px" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to={"/welcome"}
              className="text-light ms-3"
              active="true"
            >
              Home
            </Nav.Link>
            {userActive.role == "Admin" && (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  Content Management
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/categories" className="fw-bold">
                    Category
                  </Dropdown.Item>
                  <Dropdown.Item href="/coverType" className="fw-bold">
                    Cover Types
                  </Dropdown.Item>
                  <Dropdown.Item href="/product" className="fw-bold">
                    Products
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/register" className="fw-bold text-info">
                    Create new user
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Nav.Link as={Link} to="/Order/All" className="text-light ms-3">
              Orders
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/Cart"}
              className="text-light ms-3 position-relative"
            >
              <i className="bi bi-cart-check-fill"></i>
              {itemsCar.length > 0 && (
                <span className="position-sm-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle badge">
                  {itemsCar.length}
                </span>
              )}
            </Nav.Link>
          </Nav>
          <div
            className="d-flex justify-content-end me-5"
            id="basic-navbar-nav"
          >
            <Navbar.Text className="fw-bold me-2 mt-2">
              Hello {userActive.given_name}
            </Navbar.Text>
            <Dropdown className="mt-2" align="end">
              <Dropdown.Toggle>
                <img
                  src={imgUser}
                  className="rounded-circle"
                  style={{ height: "24px" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark" className="mt-2 ">
                <Dropdown.Item>
                  <div className="d-flex mt-2">
                    <img
                      src={imgUser}
                      className="rounded-circle me-3"
                      style={{ height: "40px" }}
                    />
                    <p className="fw-bold mt-2">{userActive.name}</p>
                  </div>
                  <div className="d-grid gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill mb-2"
                      type="button"
                    >
                      View Profile
                    </button>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <div>
                    <p className="fw-bold">Cuenta</p>
                    <p
                      className="ajuste fw-bold  ms-3"
                      onMouseOver={mouseOver}
                      onMouseOut={mouseOut}
                    >
                      Try Free Premiun
                    </p>
                    <p
                      onMouseOver={mouseOver}
                      onMouseOut={mouseOut}
                      className="ajuste"
                    >
                      Settings and Privacity
                    </p>
                    <p
                      onMouseOver={mouseOver}
                      onMouseOut={mouseOut}
                      className="ajuste"
                    >
                      Help
                    </p>
                    <p
                      onMouseOver={mouseOver}
                      onMouseOut={mouseOut}
                      className="ajuste"
                    >
                      Lenguaje
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <div>
                    <p className="fw-bold">Manage</p>
                    <p
                      onMouseOver={mouseOver}
                      onMouseOut={mouseOut}
                      className="ajuste"
                    >
                      Publications and Activity
                    </p>
                    <p
                      onMouseOver={mouseOver}
                      onMouseOut={mouseOut}
                      className="ajuste"
                    >
                      Job Posting Accounts
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={deleteToken}>
                  <p className="fw-bold ">
                    <i className="bi bi-box-arrow-right me-2 text-danger"></i>
                    Log out
                  </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Navbar.Text>
              <i
                className="bi bi-grid-3x3-gap-fill fw-bold fs-3 ms-3"
                style={{ cursor: "pointer" }}
                onClick={handleShow}
              ></i>
              <Offcanvas placement="end" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  Some text as placeholder. In real life you can have the
                  elements you have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
              </Offcanvas>
            </Navbar.Text>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
