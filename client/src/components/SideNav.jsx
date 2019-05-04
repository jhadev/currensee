import React, { Component } from "react";
import API from "../utils/API";
import moment from "moment";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SideNav.css";

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
    date: new Date(),
    income: true,
    budget: {},
    value: "",
    monthsRecurring: 0,
    recurring: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(this.state.recurring);
  };

  handleDateChange = pickedDate => {
    this.setState({
      date: moment(pickedDate).format("MM/DD/YYYY")
    });
  };

  logout = event => {
    event.preventDefault();
    API.logout().then(res => {
      console.log(res);
      window.location.reload().catch(err => console.log(err));
    });
  };

  notifySubmit = () => {
    toast.success("Item successfully added to budget.", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  notifySubmitError = () => {
    toast.error(
      "Error. Please check if all fields are filled before submitting.",
      {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  };

  handleFormSubmit = (event, props) => {
    event.preventDefault();
    if (
      this.state.description !== "" &&
      this.state.amount > 0 &&
      this.state.date !== "" &&
      this.state.category !== "" &&
      !this.state.recurring
    ) {
      let budgetObject = {
        description: this.state.description,
        amount: this.state.amount,
        date: moment(this.state.date).format("L"),
        income: this.state.income,
        category: this.state.category
      };

      this.setState({ budget: budgetObject });

      API.budgetPost(budgetObject)
        .then(res => {
          this.notifySubmit();
          console.log("BUDGET STATE OBJECT: " + this.state.budget);
          this.setState({ budget: budgetObject });

          this.props.getCategorySum();
          this.props.getBudgetTable();
          this.props.getBudgetSum();
          this.props.getSumByMonthFalse();
          this.props.getSumByMonthTrue();
          this.props.getCategorySumForCurrentMonth();
        })
        .catch(err => console.log(err));
    } else if (this.state.recurring && this.state.monthsRecurring > 0) {
      let budgetArray = [];
      for (let i = 0; i < this.state.monthsRecurring; i++) {
        let budgetObject = {
          description: this.state.description,
          amount: this.state.amount,
          date: moment(this.state.date)
            .add(i, "M")
            .format("L"),
          income: this.state.income,
          category: this.state.category
        };
        this.setState({ budget: budgetObject });

        API.budgetPost(budgetObject).then(res => {
          this.notifySubmit();
          console.log("BUDGET STATE OBJECT: " + this.state.budget);
          this.setState({ budget: budgetArray });
          // window.location.reload();

          this.props.getCategorySum();
          this.props.getBudgetTable();
          this.props.getBudgetSum();
          this.props.getSumByMonthFalse();
          this.props.getSumByMonthTrue();
        });
      }
    } else {
      this.notifySubmitError();
    }
    this.setState({
      description: "",
      amount: 0,
      date: new Date(),
      income: true,
      category: "",
      value: "",
      budget: {},
      recurring: false
    });
  };
  //RADIO BUTTON METHODS
  handleChangeRadio = event => {
    this.setState({ value: event.target.value });
  };

  handleInputTrue = event => {
    this.setState({ income: true });
  };

  handleInputFalse = event => {
    this.setState({ income: false });
  };

  render = () => {
    return (
      <div className="top">
        <ToastContainer
          position="top-left"
          autoClose={3000}
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
        <Typography
          className="logo"
          align="center"
          variant="h3"
          color="textPrimary"
        >
          curren$ee
        </Typography>
        <Divider />
        <Grid className="logout" container justify="center">
          <Button
            variant="text"
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
        <Grid container className="logout" justify="center">
          <Link to={"/"}>
            <Button
              variant="text"
              size="small"
              color="primary"
              className="button"
              type="submit"
            >
              Home
            </Button>
          </Link>
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
              {/* <TextField
              id="standard-date"
              label="Date"
              className="textField"
              onChange={this.handleInputChange}
              value={this.state.date}
              placeholder="MM/DD/YYYY"
              margin="normal"
              name="date"
            /> */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className="mt-4 textField"
                  value={this.state.date}
                  label="Date"
                  margin="normal"
                  onChange={this.handleDateChange}
                  placeholder="Click to select a date"
                />
              </MuiPickersUtilsProvider>
              <FormGroup row className="ml-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.recurring}
                      onChange={this.handleCheckboxChange("recurring")}
                      value={!this.state.recurring}
                    />
                  }
                  label="Is this a recurring transaction?"
                />
              </FormGroup>
            </Grid>
            {this.state.recurring && (
              <Grid className="allMargin" container justify="center">
                <FormControl className="dropdownCat">
                  <InputLabel htmlFor="recurring-helper">
                    How many months?
                  </InputLabel>
                  <Select
                    value={this.state.monthsRecurring}
                    onChange={this.handleInputChange}
                    input={
                      <Input name="monthsRecurring" id="recurring-helper" />
                    }
                  >
                    <MenuItem value={2}>Date Selected + 1 Month</MenuItem>
                    <MenuItem value={3}>Date Selected + 2 Months</MenuItem>
                    <MenuItem value={4}>Date Selected + 3 Months</MenuItem>
                    <MenuItem value={5}>Date Selected + 4 Months</MenuItem>
                    <MenuItem value={6}>Date Selected + 5 Months</MenuItem>
                  </Select>
                  <FormHelperText>choose amount of months</FormHelperText>
                </FormControl>
              </Grid>
            )}
            <Grid className="allMargin catForm mt-1" container justify="center">
              <FormControl className="dropdownCat catForm">
                <InputLabel htmlFor="category-helper">Category</InputLabel>
                <Select
                  value={this.state.category}
                  onChange={this.handleInputChange}
                  input={<Input name="category" id="category-helper" />}
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
                {this.state.recurring
                  ? "SUBMIT BUDGET ITEMS"
                  : "SUBMIT BUDGET ITEM"}
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    );
  };
}

export default withStyles(styles)(SideNav);
