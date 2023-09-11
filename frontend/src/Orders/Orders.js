import React, { useEffect, useState } from "react";
import { NavBar } from "../WebMain/NavBar";
import { getOrders } from "../Services/Services";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { PrintOrder } from "../Services/Services";
import { Audio } from "react-loader-spinner";
import { ProgressBar } from "react-loader-spinner";

import { Auth_service } from "../Services/auth_service";

const Orders = () => {
  const history = useNavigate();
  const [updateStatus, setUpdateStatus] = useState("All");
  const [rol, setRole] = useState("");
  const [dowloading, setDowloading] = useState(false);
  const [orders, setOrders] = useState("");
  //used for group buttons
  const [radioValue, setRadioValue] = useState("1");
  let i = 1;

  useEffect(() => {
    const role = Auth_service(JSON.parse(localStorage.getItem("TOKEN_KEY")));
    setRole(role.role);

    getOrders(window.BaseUrlGeneral + "Order/status/" + updateStatus)
      .then((response) => {
        setTimeout(() => {
          setOrders(response.data);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [updateStatus]);

  const setCount = (status) => {
    history("/Order/" + status);
    setUpdateStatus(status);
  };

  const print = (id) => {
    PrintOrder("https://192.168.1.68:45455/GeneratePdf/" + id)
      .then((response) => {
        //Open in a new window
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const pdfWindow = window.open();
        pdfWindow.location.href = fileURL;

        //Download the file
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement("a");
        // link.href = url;
        // link.setAttribute("download", "BulkiBook.pdf");
        // document.body.appendChild(link);
        // link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavBar />
      {!orders ? (
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
          <div className="d-flex justify-content-center">
            <ButtonGroup aria-label="Basic example" className="pt-4 ">
              {["All", "Pending", "InProcess", "Shipped"].map(
                (radio, index) => (
                  <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    variant={"outline-primary"}
                    name="radio"
                    value={radio}
                    checked={radioValue === radio}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    onClick={() => setCount(radio)}
                  >
                    {radio}
                  </ToggleButton>
                )
              )}
            </ButtonGroup>
          </div>

          <div className="table-responsive">
            <Table className="mt-4" striped bordered hover size="xs">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Order Total</th>
                  {rol == "Admin" ? <th>Actions</th> : ""}
                  <th>Print</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="text-center">{i++}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">{item.phoneNumber}</td>
                      <td className="text-center">
                        {item.applicationUser.email}
                      </td>
                      <td className="text-center">{item.orderStatus}</td>
                      <td className="text-center">{item.paymentStatus}</td>
                      <td className="text-center">{item.orderTotal}</td>
                      {rol == "Admin" ? (
                        <td className="text-center">
                          <Button
                            variant="primary me-2"
                            href={`/Order/Shipping/` + item.id}
                          >
                            Shipping
                          </Button>{" "}
                        </td>
                      ) : (
                        ""
                      )}
                      <td className="text-center">
                        {!dowloading ? (
                          <Button
                            variant="primary me-2"
                            onClick={() => print(item.id)}
                          >
                            Print
                          </Button>
                        ) : (
                          <ProgressBar
                            height="80"
                            width="80"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass="progress-bar-wrapper"
                            borderColor="#F4442E"
                            barColor="#51E5FF"
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
