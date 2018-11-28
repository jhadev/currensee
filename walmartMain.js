import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

class Main extends Component {
  state = {
    isLoggedIn: true,
    username: "",
    itemToSearch: "",
    itemImages: []
  };

  // Check login status on load
  componentDidMount() {
    this.loginCheck();
  }

  // Check login status
  loginCheck = () => {
    API.loginCheck()
      .then(res =>
        this.setState({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  };

  handleWalmartChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSearch = event => {
    event.preventDefault();

    API.getWalmart(this.state.itemToSearch)
      .then(res => {
        console.log(res.data);
        this.setState({
          itemImages: res.data.items,
          itemToSearch: ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // If user isn't logged in, don't let them see this page
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      //<h1>You Made it to the main page {this.state.isLoggedIn.username}!</h1>
      <div className="row">
        <div className="col-12">
          <h1>Search on Walmart.com</h1>
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <input
            className="form-control"
            value={this.state.itemToSearch}
            onChange={this.handleInputChange}
            name="itemToSearch"
            placeholder="Search for a product"
            type="text"
            list="item-list"
          />

          <button
            className="btn btn-block btn-outline-primary mt-2 mb-5"
            onClick={this.handleSearch}
          >
            Search For Products
          </button>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <div className="row align-items-center">
                {this.state.itemImages.length === 0 ? (
                  <h3>Product Results</h3>
                ) : (
                  this.state.itemImages.map(item => {
                    return (
                      <div key={item} className="col-12 col-md-12 text-center">
                        <img
                          src={item.mediumImage}
                          alt={item}
                          className="img-fluid"
                        />
                        <p>{item.name}</p>
                        <p>{item.salePrice}</p>
                        <button className="btn btn-outline-primary m-2 text-center">
                          View on Walmart.com
                        </button>
                        <button className="btn btn-primary m-2 text-center">
                          Add to Budget
                        </button>
                      </div>
                    );
                  })
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;





import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import LeftNav from "../components/LeftNav"
import { Input, FormBtn } from "../components/Form";

class Main extends Component {
  state = {
    isLoggedIn: true,
    username: "",
    description: "",
    amount: 0,
    date: "",
    income: true
  };

  // Check login status on load
  componentDidMount() {
    this.loginCheck()
  }


  // Check login status
  loginCheck = () => {
    API.loginCheck()
      .then(res =>
        this.setState({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (
      this.state.description &&
      this.state.amount &&
      this.state.date &&
      this.state.income
    ) {
      API.budgetPost({
        description: this.state.description,
        amount: this.state.amount,
        date: this.state.date,
        income: this.state.income
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    // If user isn't logged in, don't let them see this page
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
      <form>
        <Input
          value={this.state.description}
          onChange={this.handleInputChange}
          name="description"
          placeholder="Description (required)"
        />
        <Input
          value={this.state.amount}
          onChange={this.handleInputChange}
          name="amount"
          placeholder="Amount (required)"
        />
        <Input
          value={this.state.date}
          onChange={this.handleInputChange}
          name="date"
          placeholder="Date (Optional)"
        />
        <FormBtn
          disabled={
            !(
              this.state.description &&
              this.state.amount &&
              this.state.date &&
              this.state.income
            )
          }
          onClick={this.handleFormSubmit}
        >
          Submit Book
        </FormBtn>
      </form>
      </div>
    );
  }
}

export default Main;