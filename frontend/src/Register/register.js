import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./CreateUser.module.css";
import { useNavigate } from "react-router-dom";
import { create } from "../Services/Services";
import { getRoles } from "../Services/Services";
import { NavBar } from "../WebMain/NavBar";

//SOLO HAY Q INSTALAR EL PAQUETE DE FORMIK Y DE YUP

const tokenPrimary = JSON.parse(localStorage.getItem("TOKEN_KEY"));

const schema = Yup.object().shape({
  name: Yup.string().required().min(5).max(40),
  userName: Yup.string().required().min(4).max(15),
  email: Yup.string().required().email("Invalid email address format").max(255),
  city: Yup.string().required(),
  phoneNumber: Yup.string().required().min(8).max(14),
  postalCode: Yup.string().required().min(5).max(7),
  streetAddress: Yup.string().required(),
  state: Yup.string().required(),
  password: Yup.string().required().min(7),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
  role: Yup.string().required(),
});

const Register = () => {
  const [roles, allRoles] = useState("");
  const [error, setError] = useState("");
  const [admin, isAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));
    if (token) {
      isAdmin(true);
      getRoles(window.BaseUrlGeneral + "Roles")
        .then((response) => {
          allRoles(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const constDates = async (props, actions) => {
    console.log(props);
    const values = {
      name: props.name,
      username: props.userName,
      email: props.email,
      phonenumber: props.phoneNumber,
      city: props.city,
      postalcode: props.postalCode,
      phonenumber: props.phoneNumber,
      streetaddress: props.streetAddress,
      state: props.state,
      password: props.password,
      confirmPassword: props.confirmPassword,
      role: props.role || null,
    };
    console.log(values);
    create(window.BaseUrlGeneral + "account/register", values)
      .then((response) => {
        console.log(response);
        if ((response.status = 200 && admin)) {
          navigate("/welcome/" + tokenPrimary.userName);
        } else {
          navigate("/login");
        }
        actions.resetForm();
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      });
  };

  return (
    <div>
      {tokenPrimary ? <NavBar /> : ""}
      <div className={classes.fondo}>
        <div className="container mt-5">
          <Formik
            validationSchema={schema}
            onSubmit={constDates}
            initialValues={{
              name: "",
              userName: "",
              email: "",
              phoneNumber: "",
              city: "",
              postalCode: "",
              streetAddress: "",
              state: "",
              password: "",
              confirmPassword: "",
              role: roles ? "" : "Individual",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              isSubmitting,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                // className={classes.summary}
              >
                {error && (
                  <Alert
                    variant="danger"
                    className="text-center"
                    closeLabel="Close alert"
                  >
                    {error == "Name is token"
                      ? "This email already exist"
                      : "Problems"}
                  </Alert>
                )}

                <Row className="mb-3">
                  <div className="d-md-flex">
                    <Form.Group
                      md="4"
                      controlId="validationFormik01"
                      className="col-md-6 me-md-2 mt-2"
                    >
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={errors.name}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="none"
                      />

                      {touched.name && errors.name && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.name}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group
                      md="4"
                      controlId="validationFormik11"
                      className="col-md-6 mt-2"
                    >
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="User Name"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        isInvalid={errors.userName}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.userName && errors.userName && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.userName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>

                  <div className="d-md-flex">
                    <Form.Group
                      className="col-md-6 me-md-2 mt-2"
                      mb="6"
                      controlId="validationFormik02"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="yordan@gmail.com"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.email && errors.email && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.email}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="col-md-6 mt-2"
                      md="3"
                      controlId="validationFormik03"
                    >
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        isInvalid={!!errors.phoneNumber}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.phoneNumber}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>

                  <div className="d-md-flex">
                    <Form.Group
                      className="me-md-2 col-md-6 mt-2"
                      md="3"
                      controlId="validationFormik04"
                    >
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="City"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        isInvalid={!!errors.city}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.city && errors.city && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.city}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="col-md-6 mt-2"
                      md="3"
                      controlId="validationFormik05"
                    >
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode"
                        value={values.postalCode}
                        onChange={handleChange}
                        isInvalid={!!errors.postalCode}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.postalCode && errors.postalCode && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.postalCode}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>

                  <div className="d-md-flex">
                    <Form.Group
                      className="me-md-2 col-md-6 mt-2"
                      md="3"
                      controlId="validationFormik06"
                    >
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Street Address"
                        name="streetAddress"
                        value={values.streetAddress}
                        onChange={handleChange}
                        isInvalid={!!errors.streetAddress}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.streetAddress && errors.streetAddress && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.streetAddress}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="col-md-6 mt-2"
                      md="3"
                      controlId="validationFormik07"
                    >
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="State"
                        name="state"
                        value={values.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.state && errors.state && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.state}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>

                  <div className="d-md-flex">
                    <Form.Group
                      className="me-md-2 mt-2 col-md-6"
                      md="3"
                      controlId="validationFormik08"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.password && errors.password && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.password}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group
                      className="me-md-2 mt-2 col-md-6"
                      md="3"
                      controlId="validationFormik09"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                        isValid={!isValid}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />

                      {touched.confirmPassword && errors.confirmPassword && (
                        <Form.Control.Feedback
                          className={classes.error}
                          type="invalid"
                        >
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>

                  <div className="d-md-flex">
                    {admin && (
                      <Form.Group
                        className="col-md-6 mt-2"
                        md="3"
                        controlId="validationFormik10"
                      >
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={handleChange}
                          value={values.role}
                          name="role"
                          onBlur={handleBlur}
                          isValid={!isValid}
                        >
                          <option value="">-- Select role --</option>
                          {Object.keys(roles).map((item) => (
                            <option
                              key={roles[item].id}
                              value={roles[item].name}
                              className="text-dark"
                            >
                              {roles[item].name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    )}
                  </div>
                </Row>
                <div className="d-md-flex justify-content-center">
                  {!admin && (
                    <Button className="me-2" variant="success" href="/login">
                      Sign In
                    </Button>
                  )}
                  <Button type="submit" variant="primary">
                    {admin ? "Create New User" : "Sign Up"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
