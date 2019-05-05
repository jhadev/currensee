import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Navigation from "../components/Navigation";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

class Login extends Component {
  state = {
    isLoggedIn: false,
    username: "",
    password: ""
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  // Method to handle user login, should redirect to main page when done
  login = e => {
    e.preventDefault();
    API.login({ username: this.state.username, password: this.state.password })
      .then(res => {
        console.log(res.data);
        this.setState({ isLoggedIn: res.data });
      })
      .catch(err => {
        console.log(err.response);
        this.notifyError();
      });
  };

  notifyError = () => {
    toast.error("User not found or password is incorrect. Please try again.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };

  render() {
    // If user is logged in, take them to main page

    if (this.state.isLoggedIn) {
      return <Redirect to="/dash" />;
    }

    return (
      <div>
        <Navigation />
        <div className="container my-5">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
          <div className="row justify-content-center">
            <div className="col-md-6 col-12">
              <Card className="loginCard shadow">
                <CardContent>
                  <form>
                    <h3 className="logFont2">Login</h3>
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
                          onClick={this.login}
                        >
                          Login
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

export default Login;
