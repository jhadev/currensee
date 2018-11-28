import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./SideNav.css";
import API from "../utils/API";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "95%",
    padding: 20
  },
  textField: {
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  button: {
    width: "100%"
  }
});

class SideNav extends Component {
  state = {
    description: "",
    amount: 0,
    category: "",
    date: "",
    income: true,
    budget: {},
    value: ""
  };
  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  logout = event => {
    event.preventDefault();
    API
      .logout()
      .then(res => {
        console.log(res)
        window.location.reload()
      .catch(err => console.log(err));
      })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("this");
    // if (
    //   this.state.description &&
    //   this.state.amount &&
    //   this.state.date &&
    //   this.state.income &&
    //   this.state.category
    // )
    {
      let budgetObject = {
        description: this.state.description,
        amount: this.state.amount,
        date: this.state.date,
        income: this.state.income,
        category: this.state.category
      };

      this.setState({ budget: budgetObject });

      API.budgetPost(budgetObject)
        .then(res => {
          console.log(res);
          console.log("BUDGET STATE OBJECT: " + this.state.budget);
          this.setState({ budget: budgetObject });
          window.location.reload();

          // props.getCategorySum();
          // props.getBudgetTable();
          // props.getBudgetSum();
          // props.getSumByMonthFalse();
          // props.getSumByMonthTrue();
          // props.createMonthLabels();

          // this.setState({
          //   description: "",
          //   amount: "",
          //   date: "",
          //   income: "",
          //   income: "",
          //   category: ""})
        })
        .catch(err => console.log(err));
    }
  };
  //RADIO BUTTON METHODS
  handleChangeRadio = event => {
    this.setState({ value: event.target.value });
    console.log(this.state.income);
  };

  handleInputTrue = event => {
    this.setState({ income: true });
    console.log(this.state.income);
  };

  handleInputFalse = event => {
    this.setState({ income: false });
    console.log(this.state.income);
  };

  render = () => (
    <div className="top">
      <Typography
        className="logo"
        align="center"
        variant="p"
        color="textPrimary"
      >
        curren$ee
      </Typography>
      <Divider />
      <Grid className="logout" container justify="center">
      <Button
        variant="flat"
        size="small"
        color="secondary"
        className="button"
        type="submit"
        onClick={this.logout}
      >
        Logout
      </Button>
      </Grid>
      <Divider />
      <Grid container justify="center">
      <List>
        <Link to={`/`}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText className="home" primary={"Home"} />
          </ListItem>
        </Link>
      </List>
      </Grid>
      <Divider />
      <div className="container">
        <h6 className="title">Input your budget items</h6>
        <form
          noValidate
          autoComplete="off"
          style={{
            width: "100%"
          }}
          onSubmit={this.handleFormSubmit}
        >
          <Grid className="allMargin" container justify="center">
            <TextField
              id="standard-description"
              label="Description"
              className="textField"
              value={this.state.description}
              onChange={this.handleInputChange}
              margin="normal"
              name="description"
              placeholder="Paycheck"
            />
            <TextField
              id="standard-amount"
              label="Amount"
              className="textField"
              onChange={this.handleInputChange}
              value={this.state.amount}
              margin="normal"
              placeholder="100"
              name="amount"
            />
            <TextField
              id="standard-date"
              label="Date"
              className="textField"
              onChange={this.handleInputChange}
              value={this.state.date}
              placeholder="MM/DD/YYYY"
              margin="normal"
              name="date"
            />
          </Grid>
          <Grid className="allMargin" container justify="center">
            <FormControl className="dropdownCat">
              <InputLabel htmlFor="category-helper">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                input={<Input name="category" id="category=helper" />}
              >
                <MenuItem value={"Health"}>Health & Fitness</MenuItem>
                <MenuItem value={"Home"}>Home</MenuItem>
                <MenuItem value={"Income"}>Income</MenuItem>
                <MenuItem value={"Savings"}>Savings</MenuItem>
                <MenuItem value={"Shopping"}>Shopping</MenuItem>
                <MenuItem value={"Travel"}>Travel</MenuItem>
                <MenuItem value={"Utilities"}>Utilities</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
              <FormHelperText>choose your category</FormHelperText>
            </FormControl>
          </Grid>
          {/* RADIO BUTTONS FOR INCOME AND EXPENSE */}
          <Grid className="allMargin" container justify="center">
            <FormControl component="fieldset" className="formControl">
              <RadioGroup
                aria-label="Income"
                name="income"
                className="group"
                value={this.state.value}
                onChange={this.handleChangeRadio}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Income"
                  name="income"
                  onClick={this.handleInputTrue}
                />

                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Expense"
                  name="expense"
                  onClick={this.handleInputFalse}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid className="allMargin" container justify="center">
            <Button
              variant="contained"
              color="secondary"
              className="button"
              type="submit"
              onClick={this.handleFormSubmit}
            >
              Submit Budget Item
            </Button>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default withStyles(styles)(SideNav);
