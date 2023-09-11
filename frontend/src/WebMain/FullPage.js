import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import { NavBar } from "./NavBar";
import { getProductBiId } from "../Services/Services";
import Avatar from "../Avatar/Avatar";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
import DoubleCard from "../DoubleCard/DoubleCard";
import { Audio } from "react-loader-spinner";

const FullPage = () => {
  const [products, setProducts] = useState("");

  useEffect(() => {
    getProductBiId(window.BaseUrlGeneral + "product").then((response) => {
      // console.log(response);
      setTimeout(() => {
        setProducts(response.data);
      }, 200);
    });
  }, []);

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
        <>
          <div className="container mt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products.map((item) => {
                return <DoubleCard product={item} key={item.id} />;
              })}
            </div>
          </div>
          <Avatar
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
            }}
          />
          <Footer />
        </>
      )}
    </>
  );
};

export default FullPage;
