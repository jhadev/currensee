import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import API from "../utils/API";
import SideNav from "../components/SideNav";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Chart } from "primereact/chart";
import { DataTable, Column } from "primereact/datatable";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Main.css";

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    backgroundImage:
      "url(https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)"
  }
});

class Main extends Component {
  state = {
    isLoggedIn: true,
    username: "",
    itemToSearch: "",
    itemImages: [],
    mobileOpen: false,
    walmart: {},
    categoryRange: "",
    activePageHeader: "Dashboard",
    activePage: "Search",
    arrayForPieChart: [],
    arrayForBudgetTable: [],
    arrayForSumByIncome: [],
    budgetTotal: 0,
    arrayForTrueIncome: [],
    arrayForFalseIncome: [],
    monthLabels: [],
    modal: false,
    search: "",
    value: ""
  };

  // Check login status on load
  componentDidMount() {
    this.loginCheck();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  // Check login status
  loginCheck = () => {
    API.loginCheck()
      .then(res =>
        this.setState({
          isLoggedIn: res.data.isLoggedIn,
          username: res.data.username
        })
      )
      .then(res => {
        this.getCategorySum();
        this.getBudgetTable();
        this.getBudgetSum();
        this.getSumByMonthFalse();
        this.getSumByMonthTrue();
        this.createMonthLabels();
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  };

  getBudgetTable = () => {
    API.getMonth().then(res => {
      // console.log("BUDGET DATA" + JSON.stringify(res.data));

      this.setState({ arrayForBudgetTable: res.data });
      console.log(
        "ARRAY FOR BUDGET DATA: " +
          JSON.stringify(this.state.arrayForBudgetTable)
      );
    });
  };

  getBudgetSum = () => {
    API.getSumByIncome().then(res => {
      console.log("BUDGET DATA" + JSON.stringify(res.data));

      this.setState({ arrayForSumByIncome: res.data });
      console.log(
        "ARRAY FOR BUDGET SUM: " +
          JSON.stringify(this.state.arrayForSumByIncome)
      );
      this.setBudgetSum();
    });
  };

  setBudgetSum = () => {
    const { arrayForSumByIncome } = this.state;
    if (
      arrayForSumByIncome.length === 1 &&
      arrayForSumByIncome[0]._id.income === false
    ) {
      this.setState({
        budgetTotal: arrayForSumByIncome[0].budgetTotal * -1
      });
    } else if (
      arrayForSumByIncome.length === 1 &&
      arrayForSumByIncome[0]._id.income === true
    ) {
      this.setState({
        budgetTotal: arrayForSumByIncome[0].budgetTotal
      });
    } else if (arrayForSumByIncome.length === 2) {
      if (arrayForSumByIncome[0]._id.income === true) {
        let income = arrayForSumByIncome[0].budgetTotal;
        let expense = arrayForSumByIncome[1].budgetTotal;
        let budgetTotal = income - expense;
        this.setState({ budgetTotal: budgetTotal });
      }
      if (arrayForSumByIncome[0]._id.income === false) {
        let expense = arrayForSumByIncome[0].budgetTotal;
        let income = arrayForSumByIncome[1].budgetTotal;
        let budgetTotal = income - expense;
        this.setState({ budgetTotal: budgetTotal });
      }
    } else {
      this.setState({ budgetTotal: 0 });
    }
  };

  getCategorySum = () => {
    API.getSumByCategory().then(res => {
      let categorySumList = [];

      let cat1 = res.data.filter(function(item) {
        if (item._id.category === "Health") {
          console.log(item._id.category);
          return true;
        }
      });
      cat1 = cat1.map(function(item) {
        return item.categoryTotal;
      });
      console.log(cat1);
      let cat2 = res.data.filter(function(item) {
        if (item._id.category === "Home") {
          return true;
        }
      });
      cat2 = cat2.map(function(item) {
        return item.categoryTotal;
      });

      let cat3 = res.data.filter(function(item) {
        if (item._id.category === "Other") {
          return true;
        }
      });
      cat3 = cat3.map(function(item) {
        return item.categoryTotal;
      });

      let cat4 = res.data.filter(function(item) {
        if (item._id.category === "Savings") {
          return true;
        }
      });
      cat4 = cat4.map(function(item) {
        return item.categoryTotal;
      });

      let cat5 = res.data.filter(function(item) {
        if (item._id.category === "Shopping") {
          return true;
        }
      });
      cat5 = cat5.map(function(item) {
        return item.categoryTotal;
      });

      let cat6 = res.data.filter(function(item) {
        if (item._id.category === "Travel") {
          return true;
        }
      });
      cat6 = cat6.map(function(item) {
        return item.categoryTotal;
      });

      let cat7 = res.data.filter(function(item) {
        if (item._id.category === "Utilities") {
          return true;
        }
      });
      cat7 = cat7.map(function(item) {
        return item.categoryTotal;
      });

      categorySumList = [cat1, cat2, cat3, cat4, cat5, cat6, cat7];

      for (let i = 0; i < categorySumList.length; i++) {
        if (categorySumList[i].length > 1) {
          categorySumList[i] = [categorySumList[i].reduce((a, b) => a + b)];
        }
      }
      console.log(
        "CATEGORY SUM LIST ARRAY: " + JSON.stringify(categorySumList)
      );

      this.setState({ arrayForPieChart: categorySumList });
    });
  };

  getSumByMonthTrue = () => {
    API.getSumByMonthTrue().then(res => {
      let month1 = 0;
      let month2 = 0;
      let month3 = 0;
      let month4 = 0;
      let month5 = 0;
      let month6 = 0;

      let monthArray = [];

      const monthCompare = moment()
        .subtract(2, "M")
        .format("MM");
      month1 = res.data.filter(function(item) {
        if (item._id.month === monthCompare) {
          return true;
        }
      });
      month1 = month1.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH ONE: " + JSON.stringify(month1));

      const monthCompare2 = moment()
        .subtract(1, "M")
        .format("MM");
      console.log("COMPARE MONTH 2: " + monthCompare2);
      month2 = res.data.filter(function(item) {
        if (item._id.month === monthCompare2) {
          return true;
        }
      });
      month2 = month2.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH TWO: " + JSON.stringify(month2));

      const monthCompare3 = moment().format("MM");
      console.log("MONTH COMPARISON THREE: " + monthCompare3);
      month3 = res.data.filter(function(item) {
        if (item._id.month === monthCompare3) {
          return true;
        }
        console.log("ITEM.ID.MONTH THREE: " + item._id.month);
      });
      month3 = month3.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH THREE: " + JSON.stringify(month3));

      const monthCompare4 = moment()
        .add(1, "M")
        .format("MM");
      month4 = res.data.filter(function(item) {
        if (item._id.month === monthCompare4) {
          return true;
        }
      });
      month4 = month4.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH FOUR: " + JSON.stringify(month4));

      const monthCompare5 = moment()
        .add(2, "M")
        .format("MM");
      month5 = res.data.filter(function(item) {
        if (item._id.month === monthCompare5) {
          return true;
        }
      });
      month5 = month5.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH FIVE: " + JSON.stringify(month5));

      const monthCompare6 = moment()
        .add(3, "M")
        .format("MM");
      month6 = res.data.filter(function(item) {
        if (item._id.month === monthCompare6) {
          return true;
        }
      });
      month6 = month6.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH SIX: " + JSON.stringify(month6));

      monthArray = [month1, month2, month3, month4, month5, month6];
      console.log("FULL SIX MONTH ARRAY: " + monthArray);

      this.setState({ arrayForTrueIncome: monthArray });
    });
  };

  getSumByMonthFalse = () => {
    API.getSumByMonthFalse().then(res => {
      let month1 = 0;
      let month2 = 0;
      let month3 = 0;
      let month4 = 0;
      let month5 = 0;
      let month6 = 0;

      let monthArray = [];

      const monthCompare = moment()
        .subtract(2, "M")
        .format("MM");
      month1 = res.data.filter(function(item) {
        if (item._id.month === monthCompare) {
          return true;
        }
      });
      month1 = month1.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH ONE: " + JSON.stringify(month1));

      const monthCompare2 = moment()
        .subtract(1, "M")
        .format("MM");
      month2 = res.data.filter(function(item) {
        if (item._id.month === monthCompare2) {
          return true;
        }
      });
      month2 = month2.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH TWO: " + JSON.stringify(month2));

      const monthCompare3 = moment().format("MM");
      month3 = res.data.filter(function(item) {
        if (item._id.month === monthCompare3) {
          return true;
        }
      });
      month3 = month3.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH THREE: " + JSON.stringify(month3));

      const monthCompare4 = moment()
        .add(1, "M")
        .format("MM");
      month4 = res.data.filter(function(item) {
        if (item._id.month === monthCompare4) {
          return true;
        }
      });
      month4 = month4.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH FOUR: " + JSON.stringify(month4));

      const monthCompare5 = moment()
        .add(2, "M")
        .format("MM");
      month5 = res.data.filter(function(item) {
        if (item._id.month === monthCompare5) {
          return true;
        }
      });
      month5 = month5.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH FIVE: " + JSON.stringify(month5));

      const monthCompare6 = moment()
        .add(3, "M")
        .format("MM");
      month6 = res.data.filter(function(item) {
        if (item._id.month === monthCompare6) {
          return true;
        }
      });
      month6 = month6.map(function(item) {
        return item.budgetTotal;
      });
      console.log("MONTH SIX: " + JSON.stringify(month6));

      monthArray = [month1, month2, month3, month4, month5, month6];
      console.log("FULL SIX MONTH ARRAY: " + monthArray);

      this.setState({ arrayForFalseIncome: monthArray });
    });
  };

  handleItemDelete = event => {
    API.getDelete(event.data._id)
      .then(res => {
        console.log(res.data);
        this.getCategorySum();
        this.getBudgetTable();
        this.getBudgetSum();
        this.getSumByMonthFalse();
        this.getSumByMonthTrue();
        this.createMonthLabels();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.toggle();
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

  notifySubmit = () => {
    toast.success("Walmart item successfully added to budget.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  handleWalmartSubmit = event => {
    event.preventDefault();
    const { value, name } = event.target;

    let walmartObject = {
      description: name,
      amount: value,
      date: moment().format("L"),
      income: false,
      category: "Shopping"
    };

    this.setState({ walmart: walmartObject });

    API.budgetPost(walmartObject)
      .then(res => {
        console.log(res);
        console.warn("WALMART STATE OBJECT: " + this.state.walmart);
        this.getCategorySum();
        this.getBudgetTable();
        this.getBudgetSum();
        this.getSumByMonthFalse();
        this.getSumByMonthTrue();
        this.createMonthLabels();
        this.setState({ itemToSearch: "", itemImages: [] });
      })
      .catch(err => console.log(err));
    this.setState({ itemToSearch: "", itemImages: [] });
    this.toggle();
    this.notifySubmit();
  };

  rowClassName = rowData => {
    let incomeRow = rowData.income;

    return { highlightRed: incomeRow === "false" };
  };

  amountTemplate(rowData, column) {
    let amount = rowData.amount;
    let fontWeight = amount >= 500 ? "bold" : "normal";

    return <span style={{ fontWeight: fontWeight }}>{rowData.amount}</span>;
  }

  createMonthLabels = () => {
    const barChartLabels = [];

    const firstMonth = moment()
      .subtract(2, "M")
      .format("MMMM");
    barChartLabels.push(firstMonth);

    const secondMonth = moment()
      .subtract(1, "M")
      .format("MMMM");
    barChartLabels.push(secondMonth);

    const thirdMonth = moment().format("MMMM");
    barChartLabels.push(thirdMonth);

    for (let i = 1; i < 4; i++) {
      let newMonth = moment()
        .add(i, "M")
        .format("MMMM");
      barChartLabels.push(newMonth);
    }
    console.log("MONTH LABELS: " + barChartLabels);
    this.setState({ monthLabels: barChartLabels });
  };

  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    });
  };

  render() {
    console.log(this.state);
    const pieData = {
      labels: [
        "Health & Fitness",
        "Home",
        "Other",
        "Savings",
        "Shopping",
        "Travel",
        "Utilities"
      ],
      datasets: [
        {
          data: this.state.arrayForPieChart,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#003366",
            "#F0F8FF",
            "#7FFFD4",
            "#3399FF",
            "#8A2BE2"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#003366",
            "#F0F8FF",
            "#7FFFD4",
            "#8A2BE2"
          ]
        }
      ]
    };

    const barData = {
      labels: this.state.monthLabels,
      datasets: [
        {
          label: "Income",
          backgroundColor: "rgb(4, 244, 12, 0.8)",
          data: this.state.arrayForTrueIncome
        },
        {
          label: "Expense",
          backgroundColor: "rgb(255, 0, 0, 0.8)",
          data: this.state.arrayForFalseIncome
        }
      ]
    };

    const lineData = {
      labels: this.state.monthLabels,
      datasets: [
        {
          label: "Income",
          data: this.state.arrayForTrueIncome,
          fill: false,
          borderColor: "#42A5F5"
        },
        {
          label: "Expenses",
          data: this.state.arrayForFalseIncome,
          fill: true,
          borderColor: "#ff3059"
        }
      ]
    };

    const radarData = {
      labels: [
        "Health & Fitness",
        "Home",
        "Other",
        "Savings",
        "Shopping",
        "Travel",
        "Utilities"
      ],
      datasets: [
        {
          label: "Amount in $",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.arrayForPieChart
        }
      ]
    };

    // If user isn't logged in, don't let them see this page
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
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
        <CssBaseline />
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="p" className="dashtext" color="inherit" noWrap>
              {this.state.activePageHeader}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              <SideNav
                activePage={this.state.activePage}
                getCategorySum={this.getCategorySum}
                getBudgetSum={this.getBudgetSum}
                getBudgetTable={this.getBudgetTable}
                getSumByMonthFalse={this.getSumByMonthFalse}
                getSumByMonthTrue={this.getSumByMonthTrue}
              />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <SideNav
                activePage={this.state.activePage}
                getCategorySum={this.getCategorySum}
                getBudgetSum={this.getBudgetSum}
                getBudgetTable={this.getBudgetTable}
                getSumByMonthFalse={this.getSumByMonthFalse}
                getSumByMonthTrue={this.getSumByMonthTrue}
              />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="row">
            <div className="col">
              <Grid container justify="center">
                <Card className="total-sum">
                  <CardContent style={{ marginBottom: -10 }}>
                    <h3>
                      DISPOSABLE INCOME: ${this.state.budgetTotal.toFixed(2)}
                    </h3>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </div>
          {/* BUDGET TABLE */}
          <Card style={{ marginBottom: 20 }} className={classes.card}>
            <CardContent>
              <Typography
                className="dashtext"
                variant="p"
                color="textPrimary"
                gutterBottom
              >
                Budget Table
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Click on headers to sort
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Double click on corresponding table row to delete a budget item
              </Typography>
              <DataTable
                className="budget-table"
                tableStyle={{ width: "100%" }}
                value={this.state.arrayForBudgetTable}
                rowClassName={this.rowClassName}
                selectionMode="single"
                selection={this.state.selectedBudgetItem}
                onSelectionChange={e =>
                  this.setState({ selectedBudgetItem: e.value })
                }
                onRowDoubleClick={this.handleItemDelete}
              >
                <Column
                  className="table-data"
                  field="date"
                  sortable="true"
                  header="Date"
                />
                <Column
                  className="table-data"
                  field="description"
                  header="Description"
                  sortable="true"
                />
                <Column
                  className="table-data"
                  field="amount"
                  sortable="true"
                  header="Amount"
                  body={this.amountTemplate}
                />
                <Column
                  className="table-data"
                  field="category"
                  header="Category"
                  sortable="true"
                />
                <Column
                  className="table-data"
                  field="income"
                  header="Income"
                  sortable="true"
                />
              </DataTable>
            </CardContent>
          </Card>
          <div className="row">
            <div className="col-12">
              <Grid container justify="center">
                <Card
                  style={{
                    width: "80%",
                    marginBottom: 20,
                    justifyContent: "center"
                  }}
                >
                  <CardContent>
                    <div className="content-section implementation">
                      <h3 className="text-center">
                        Total Spending by Category
                      </h3>
                      <Chart type="pie" data={pieData} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div className="col-12">
              <Grid container justify="center">
                <Card style={{ width: "80%", marginBottom: 20 }}>
                  <CardContent>
                    <div className="content-section implementation">
                      <h3 className="text-center">
                        Income vs Expense By Month
                      </h3>
                      <Chart type="bar" data={barData} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div className="col-12">
              <Grid container justify="center">
                <Card style={{ width: "80%", marginBottom: 20 }}>
                  <CardContent>
                    <div className="content-section implementation">
                      <h3 className="text-center">
                        Income vs Expense By Month
                      </h3>
                      <Chart type="line" data={lineData} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div className="col-12">
              <Grid container justify="center">
                <Card style={{ width: "80%", marginBottom: -20 }}>
                  <CardContent>
                    <div className="content-section implementation">
                      <h3 className="text-center">
                        Radar (Spending By Category)
                      </h3>
                      <Chart type="radar" data={radarData} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </div>
            <div className="col">
              <Grid container justify="center">
                <Card style={{ marginTop: 50 }} className="total-sum">
                  <CardContent>
                    <h5>Search on Walmart.com (experimental)</h5>
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
                  </CardContent>
                </Card>
              </Grid>
            </div>
          </div>
          <div>
            <Modal
              style={{ marginTop: 100 }}
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Walmart Results</ModalHeader>
              <ModalBody>
                <div className="row align-items-center">
                  {this.state.itemImages.length === 0 ? (
                    <h3 className="ml-2 text-center">Product Results</h3>
                  ) : (
                    this.state.itemImages.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="col-12 col-md-12 text-center"
                        >
                          <img
                            src={item.largeImage}
                            alt={item}
                            className="img-fluid rounded border border-dark my-2"
                          />
                          <p className="itemName font-weight-bold">
                            {item.name}
                          </p>
                          <p className="itemPrice font-weight-bold">
                            ${item.salePrice}
                          </p>
                          <a
                            target="_blank"
                            href={item.productUrl}
                            rel="noopener noreferrer"
                            className="btn btn-outline-primary m-2 text-center"
                          >
                            View on Walmart.com
                          </a>
                          <button
                            className="btn btn-primary m-2 text-center"
                            name={item.name}
                            value={item.salePrice}
                            onClick={this.handleWalmartSubmit}
                          >
                            Add to Budget
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" onClick={this.toggle}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <br />
          <br />
          <div className="row justify-content-center">
            <div className="col-12" />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
