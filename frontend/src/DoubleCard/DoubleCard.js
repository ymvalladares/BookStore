import React from "react";
import styles from "./DoubleCard.module.css";
import imgUser from "../Photos/user.png";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const DoubleCard = (props) => {
  return (
    <div className="col">
      <figure className={styles.card}>
        <img
          src={
            props.product.imageURL
              ? // ? "https://localhost:44358/" + props.product.imageURL
                "https://192.168.1.68:45455/" + props.product.imageURL
              : imgUser
          }
        />
        <div className={styles.capa}>
          <h3 className="fw-bold mt-5">Title: {props.product.title}</h3>
          <h3 className="fw-bold">By: {props.product.author}</h3>
          <p className="fw-bold">
            As low as: <b>$ {props.product.price}</b>
          </p>
          <div className="container ">
            <div className="d-grid gap-2 mb-2 mt-4 text-primary">
              <Button
                href={`/Customer/Details/` + props.product.id}
                variant="warning"
                className="fw-bold"
              >
                Details
              </Button>
            </div>
          </div>
        </div>
        <Badge className={styles.card_badge} pill bg="danger">
          40 % Off
        </Badge>
      </figure>
    </div>
  );
};

export default DoubleCard;
