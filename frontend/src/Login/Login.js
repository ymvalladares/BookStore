import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import imageFace from "../Photos/facebook.png";
import imageGoogle from "../Photos/google.png";
import "./Login.css";
import { login } from "../Services/Services";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { loginGogle } from "../Services/Services";
import Swal from "sweetalert2";
import { FidgetSpinner } from "react-loader-spinner";

function Login() {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [log, setLog] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("TOKEN_KEY"));
    if (token) {
      history("/welcome");
    } else {
      history("/login");
    }
  }, []);

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      // loginGogle(
      //   window.BaseUrlGeneral +
      //     `account/loginGoogle/?token=${codeResponse.access_token}`,
      //   {}
      // )
      //   .then((response) => {
      //     if ((response.status = "200")) {
      //       localStorage.setItem("TOKEN_KEY", JSON.stringify(response.data));
      //       return history("/welcome");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     Swal.fire(error.response.data);
      //   });
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handlerObject = (e) => {
    setLog(true);
    e.preventDefault();
    let obj = {
      email: email,
      password: password,
    };

    login(window.BaseUrlGeneral + "account/login", obj)
      .then((response) => {
        console.log(response);
        if ((response.status = "200")) {
          localStorage.setItem("TOKEN_KEY", JSON.stringify(response.data));
          return history("/welcome");
        }
      })
      .catch((error) => {
        setTimeout(() => {
          if (error.message == "Network Error") {
            return history("*");
          }
          setError(error.response.data);
          setLog(false);
        }, 700);
      });
  };

  const handlerEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlerPassword = (event) => {
    setPassword(event.target.value);
  };

  const showMe = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container w-75 bg-primary mt-5 rounded ">
        <div className="row align-items-stretch">
          <div className="col-md-6 d-none d-lg-block bg"></div>
          <div className="col-md-6 bg-white p-5 rounded-end">
            <div className="text-end">
              <h2 className="fw-bold text-center">Welcome</h2>
            </div>

            {/* Login */}
            <form action="#" onSubmit={handlerObject}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className={
                    error == "Invalid user"
                      ? "form-control border border-danger"
                      : "form-control border border-primary"
                  }
                  name="email"
                  onChange={handlerEmail}
                />
                {/* {error == "Invalid user" ? (
                  <span className="text-danger">{error}</span>
                ) : (
                  ""
                )} */}
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type={!showPassword ? "password" : "text"}
                    className={
                      error == "Invalid password"
                        ? "form-control border border-danger"
                        : "form-control border border-primary"
                    }
                    onChange={handlerPassword}
                    name="password"
                  />
                  {password != "" ? (
                    !showPassword ? (
                      <i
                        onClick={showMe}
                        className="bi bi-eye-slash-fill input-icon"
                        style={{ cursor: "pointer" }}
                      ></i>
                    ) : (
                      <i
                        onClick={showMe}
                        style={{ cursor: "pointer" }}
                        className="bi bi-eye-fill input-icon"
                      ></i>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="checkbox"
                  name="connected"
                  className="form-check-input me-2"
                  defaultChecked
                />
                <label className="form-check-label">keep me connected</label>
              </div>
              <div className="d-grid">
                <Button
                  type="submit"
                  variant="outline-primary"
                  disabled={email && password ? false : true}
                  placeholder={
                    email && password ? "" : "Write your credentials"
                  }
                  className="fw-bold"
                >
                  {!log ? (
                    "Login"
                  ) : (
                    <FidgetSpinner
                      visible={true}
                      height="21"
                      width="21"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                      ballColors={["#ff0000", "#00ff00", "#0000ff"]}
                      backgroundColor="#F4442E"
                    />
                  )}
                </Button>
              </div>
              <div className="my-3">
                <span className="fw-bold">
                  Do you haven't account? <Link to="/register">Register</Link>
                </span>
                <br />
                <span className="fw-bold">
                  <a href="#">Recover Password</a>
                </span>
              </div>
            </form>

            {/* Login con redes sociales */}
            <div className="container w-100 my-5">
              <div className="row text-center">
                <div className="col-12 fw-bold">Login with</div>
              </div>
              <div className="row">
                <div className="col">
                  <button className="btn btn-outline-primary w-100 my-1">
                    <div className="row align-items-center">
                      <div className="col-2 d-none d-md-block">
                        <img src={imageFace} width="32px" />
                      </div>
                      <div className="col-12 col-md-10 text-center">
                        Facebook
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col">
                  <button
                    onClick={() => loginGoogle()}
                    className="btn btn-outline-primary w-100 my-1"
                  >
                    <div className="row align-items-center">
                      <div className="col-2 d-none d-md-block">
                        <img src={imageGoogle} width="32px" />
                      </div>
                      <div className="col-12 col-md-10 text-center">Google</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
