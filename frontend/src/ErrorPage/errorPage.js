import React from "react";

export const ErrorPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-danger">
        Server Error Internal - refreshing the page will make the error
        disappear!
      </h1>
      <div>
        <h5 className="text-danger fw-bold">Error</h5>
        <p className="fw-bold">
          Note: If you are seeing this the Angular is provably not to blame
        </p>
        <p className="fw-bold">What to do next?</p>
        <ol>
          <li className="fw-bold">Open the chrome dev tools</li>
          <li className="fw-bold">Inspect the network tab</li>
          <li className="fw-bold">Check the faling request</li>
          <li className="fw-bold">
            Examine the request URL - make sure it is corect
          </li>
          <li className="fw-bold">
            Reproduce the error in Postman - if we see same response, then the
            issue is not Angular
          </li>
        </ol>
        <p className="fw-bold">
          Following is the stack trace - this is where your investigation should
          start!
        </p>
      </div>
    </div>
  );
};
