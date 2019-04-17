import React from "react";
import "./Jumbotron.css";
import Grid from "@material-ui/core/Grid";

const Jumbotron = () => (
  <div className="jumbotron jumbotron-fluid styles">
    <div className="container">
      <Grid container justify="center">
        <div>
          <h1 style={{ fontSize: 80 }} className="textStyle">
            curren$ee
          </h1>
          <p style={{ fontSize: 30 }} className="textStyle">
            keep yours in sight
          </p>
        </div>
      </Grid>
    </div>
    <Grid container justify="center">
      <div>
        <p style={{ fontSize: 18, padding: 60 }} className="textStyle">
          Welcome to Current$ee! A fully dynamic budgeting tool built with the
          user in mind to help relieve the stress when it comes to managing your
          personal investments and expenses! Sign up now to get started!
        </p>
      </div>
    </Grid>
  </div>
);

export default Jumbotron;
