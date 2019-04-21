import React from "react";
import "./Jumbotron.css";

const Jumbotron = () => (
  <div className="styles">
    <div className="container">
      <div className="row text-center">
        <div className="col-md-6 col-12">
          <h1 style={{ fontSize: 70 }} className="textStyle">
            curren$ee
          </h1>
          <p style={{ fontSize: 30 }} className="textStyle">
            keep yours in sight
          </p>
        </div>
        <div className="col-md-6 col-12">
          <p style={{ fontSize: 18, padding: 50 }} className="textStyle">
            Welcome to Current$ee! A fully dynamic budgeting tool built with the
            user in mind to help relieve the stress when it comes to managing
            your personal investments and expenses! Sign up now to get started!
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Jumbotron;
