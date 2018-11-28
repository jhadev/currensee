import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Navbar from "../components/Navbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
      .catch(err => console.log(err.response));
  };

  render() {
    // If user is logged in, take them to main page

    if (this.state.isLoggedIn) {
      return <Redirect to="/dash" />;
    }

    return (
      <div className="background">
        <Navbar />
        <div className="container my-5">
          <div className="row justify-content-center">
            <Card className="login-card">
              <CardContent>
                <form>
                  <h3>Login!</h3>
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
                  <Button
                    /*disabled={
              !(
                props.description &&
                props.amount &&
                props.date &&
                props.category
              )
            }*/
                    variant="outlined"
                    color="primary"
                    className="submit-button"
                    type="submit"
                    onClick={this.login}
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
