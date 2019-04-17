import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Navigation from "../components/Navigation";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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

  notifyError = () => {
    toast.error("User not found, please try again.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
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

  render() {
    // If user is logged in, take them to main page

    if (this.state.isLoggedIn) {
      return <Redirect to="/dash" />;
    }

    return (
      <div className="background">
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
              <Card className="login-card">
                <CardContent>
                  <form>
                    <h3 className="logFont">Login</h3>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Username"
                      />
                      <small id="usernameHelp" className="form-text text-muted">
                        Enter your username
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={this.login}
                    >
                      Login
                    </button>
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
