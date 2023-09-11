import React from "react";
import imgUser from "../Photos/user.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import styles from "./Card.module.css";

const CardExample = (props) => {
  return (
    <Card className={styles.card} style={{ width: "18rem", cursor: "pointer" }}>
      <Card.Img
        variant="top"
        height="300px"
        className="mt-2"
        src={
          props.product.imageURL
            ? "https://localhost:44358/" + props.product.imageURL
            : // "https://192.168.86.162:45455/" + props.product.imageURL
              imgUser
        }
      />
      <Card.Body>
        <Card.Title className="text-danger fw-bold">
          {props.product.title}
        </Card.Title>
        <Card.Text className="text-info">
          By <b>{props.product.author}</b>
        </Card.Text>
        <Card.Text className="fw-bold">
          List price:{" "}
          <strike>
            <b>{props.product.listPrice}</b>
          </strike>
        </Card.Text>
        <Card.Text className="fw-bold">
          As low as: <b>{props.product.price}</b>
        </Card.Text>
        <div className="d-grid gap-2 mb-2">
          <Button
            href={`/Customer/Details/` + props.product.id}
            variant="primary"
          >
            Details
          </Button>
        </div>
      </Card.Body>

      <Badge className={styles.card_badge} pill bg="danger">
        40 % Off
      </Badge>
    </Card>
  );
};

export default CardExample;
