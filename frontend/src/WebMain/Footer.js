import paypal from "../Photos/paypal.png";
import visa from "../Photos/visa.png";
import amex from "../Photos/amex.png";
import discover from "../Photos/discover.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-danger">
              Company Name
            </h5>
            <p>
              Here, you can use rows and columns to organized your footer
              content. Lorem maybe use the other links o see oher products
            </p>
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="btn-floating btn-sm text-white me-3"
                    style={{ fontSize: "21px" }}
                  >
                    <i className="bi bi-facebook text-primary"></i>
                  </a>
                </li>

                <li className="list-inline-item">
                  <a
                    href="#"
                    className="btn-floating btn-sm text-white me-3"
                    style={{ fontSize: "21px" }}
                  >
                    <i className="bi bi-google text-danger"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="btn-floating btn-sm text-white me-3"
                    style={{ fontSize: "21px" }}
                  >
                    <i
                      className="bi bi-twitter"
                      style={{ color: "rgb(57, 215, 239)" }}
                    ></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="btn-floating btn-sm text-white me-3"
                    style={{ fontSize: "21px" }}
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="#"
                    className="btn-floating btn-sm text-white me-3"
                    style={{ fontSize: "23px" }}
                  >
                    <i className="bi bi-youtube text-danger"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-danger">
              Products
            </h5>
            {["The Provider", "Creativity", "Source Filies", "Content"].map(
              (iten, index) => (
                <p key={index}>
                  <a
                    href="#"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    {iten}
                  </a>
                </p>
              )
            )}
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-danger">
              Useful Links
            </h5>
            {[
              "Your account",
              "Become an affiliates",
              "Shipping rates",
              "Helps",
            ].map((iten, index) => (
              <p key={index}>
                <a
                  href="#"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  {iten}
                </a>
              </p>
            ))}
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-danger">
              Useful Links
            </h5>
            <p>
              <i className="bi bi-house-fill me-3"></i>New York, NY 2333, US
            </p>
            <p>
              <i className="bi bi-envelope-at-fill me-3"></i>bulkybook@gmail.com
            </p>
            <p>
              <i className="bi bi-telephone-fill me-3"></i>+1 444 587 6457
            </p>
            <p>
              <i className="bi bi-chat-left-text-fill me-3"></i>+1 888 045 6789
            </p>
          </div>
        </div>

        <div className="row align-items-center mt-4">
          <div className="col-md-7 col-lg-8">
            <p>
              {" "}
              Copyright @2023 All rights reservated by:
              <a href="#" style={{ textDecoration: "none" }}>
                <strong className="text-danger"> The Providers</strong>
              </a>
            </p>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <a href="#" className="me-3" style={{ fontSize: "21px" }}>
                    <img src={visa} width="32px" />
                  </a>
                </li>

                <li className="list-inline-item">
                  <a href="#" className="me-3" style={{ fontSize: "21px" }}>
                    <img src={paypal} width="32px" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className=" me-3" style={{ fontSize: "21px" }}>
                    <img src={amex} width="32px" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#" className="me-3" style={{ fontSize: "21px" }}>
                    <img src={discover} width="32px" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
