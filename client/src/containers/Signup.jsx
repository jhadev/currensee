import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Navigation from "../components/Navigation";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./Signup.css";

class Signup extends Component {
  state = {
    success: false,
    username: "",
    password: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  // Method to register a new user
  register = e => {
    e.preventDefault();
    API.register({
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        console.log(res.data);
        this.setState({ success: res.data });
      })
      .catch(err => console.log(err.response.data));
  };

  render() {
    // If Register was a success, take them to the Login page
    if (this.state.success) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="background">
        <Navigation />
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-6">
              <Card className="loginCard">
                <CardContent>
                  <form>
                    <h3 className="logFont2">Register</h3>
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <TextField
                          id="standard-user"
                          type="text"
                          label="Username"
                          className="user m-6"
                          value={this.state.username}
                          onChange={this.handleInputChange}
                          margin="normal"
                          name="username"
                        />
                      </div>
                      <div className="col-12">
                        <TextField
                          id="standard-pass"
                          type="password"
                          label="Password"
                          className="pass"
                          onChange={this.handleInputChange}
                          value={this.state.password}
                          margin="normal"
                          name="password"
                        />
                      </div>
                      <div className="col-12">
                        <Button
                          disabled={
                            this.state.username === "" ||
                            this.state.password === ""
                          }
                          variant="contained"
                          color="secondary"
                          className="submitButton text-center mt-2"
                          type="submit"
                          onClick={this.register}
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
