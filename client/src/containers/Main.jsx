import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import API from '../utils/API';
import SideNav from '../components/SideNav';
import Welcome from '../components/Welcome';
import Charts from '../components/Charts';
import BudgetTable from '../components/BudgetTable';
import WalmartSearch from '../components/WalmartSearch';
import StockSearch from '../components/StockSearch';
import WalmartModal from '../components/WalmartModal';
import { Modal } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Main.css';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
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
      'url(https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)'
  }
});

class Main extends Component {
  _isMounted = false;

  state = {
    isLoggedIn: true,
    username: '',
    itemToSearch: '',
    itemImages: [],
    mobileOpen: false,
    walmart: {},
    categoryRange: '',
    activePageHeader: 'Dashboard',
    activePage: 'Search',
    arrayForPieChart: [],
    arrayForBudgetTable: [],
    arrayForSumByIncome: [],
    budgetTotal: 0,
    totalIncome: 0,
    totalExpense: 0,
    arrayForTrueIncome: [],
    arrayForFalseIncome: [],
    monthLabels: [],
    modal: false,
    search: '',
    value: '',
    selectedBudgetItem: {},
    globalFilter: null,
    categoryPick: null,
    arrayForCatByCurrentMonth: [],
    stockToSearch: '',
    stockToSend: '',
    itemToDelete: '',
    arrayForCatSumList: [],
    topCategory: '',
    topCatChart: [],
    mostActiveCategory: '',
    mostActiveChart: []
  };

  // Check login status on load
  componentDidMount() {
    this._isMounted = true;
    this.loginCheck();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  // Check login status
  loginCheck = () => {
    API.loginCheck()
      .then(res => {
        if (this._isMounted) {
          this.setState({
            isLoggedIn: res.data.isLoggedIn,
            username: res.data.username
          });
        }
      })
      .then(res => {
        if (this._isMounted) {
          this.getCategorySum();
          this.getBudgetTable();
          this.getBudgetSum();
          this.getSumByMonthFalse();
          this.getSumByMonthTrue();
          this.createMonthLabels();
          this.getCategorySumForCurrentMonth();
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  };

  //START API CALLS
  getBudgetTable = () => {
    API.getMonth().then(res => {
      this.setState(
        { arrayForBudgetTable: res.data },
        this.getMostActiveCategory
      );
    });
  };

  handleClickDelete = event => {
    API.getDelete(this.state.itemToDelete)
      .then(res => {
        //console.log(res.data);
        this.getCategorySum();
        this.getBudgetTable();
        this.getBudgetSum();
        this.getSumByMonthFalse();
        this.getSumByMonthTrue();
        this.getCategorySumForCurrentMonth();
        this.notify(
          'error',
          'Item successfully removed from budget',
          'top-right'
        );
        this.setState({ itemToDelete: '' });
      })
      .catch(err => {
        console.log(err);
        this.notify('error', 'Error. Please try again', 'top-left');
      });
  };

  handleItemDelete = event => {
    API.getDelete(event.data._id)
      .then(res => {
        //console.log(res.data);
        this.getCategorySum();
        this.getBudgetTable();
        this.getBudgetSum();
        this.getSumByMonthFalse();
        this.getSumByMonthTrue();
        this.getCategorySumForCurrentMonth();
        this.notify(
          'error',
          'Item successfully removed from budget',
          'top-right'
        );
      })
      .catch(err => {
        console.log(err);
        this.notify('error', 'Error. Please try again', 'top-left');
      });
  };

  handleSearch = event => {
    event.preventDefault();
    this.toggle();
    API.searchWalmart(this.state.itemToSearch)
      .then(res => {
        API.getWalmart()
          .then(res => {
            this.setState({
              itemImages: res.data,
              itemToSearch: ''
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        this.notify('error', 'Error. Please try again', 'top-left');
        console.log(err);
      });
  };

  handleWalmartSubmit = event => {
    event.preventDefault();
    const { value, name } = event.target;

    let walmartObject = {
      description: name,
      amount: value,
      date: moment().format('L'),
      income: false,
      category: 'Shopping'
    };

    this.setState({ walmart: walmartObject });

    API.budgetPost(walmartObject)
      .then(res => {
        //console.log(res);
        //console.warn("WALMART STATE OBJECT: " + this.state.walmart);
        this.getCategorySum();
        this.getBudgetTable();
        this.getBudgetSum();
        this.getSumByMonthFalse();
        this.getSumByMonthTrue();
        this.getCategorySumForCurrentMonth();
        this.notify(
          'success',
          'Item successfully added to budget.',
          'top-left'
        );
        this.toggle();
      })
      .catch(err => {
        console.log(err);
        this.toggle();
        this.notify('error', 'Error. Please try again', 'top-left');
      });

    this.setState({ itemImages: [] });
  };

  getCategorySumForCurrentMonth = () => {
    const thisMonth = moment().format('MM/YYYY');

    API.getSumByCategory().then(res => {
      let categorySumList = [];

      const cat1 = res.data
        .filter(
          item =>
            item._id.category === 'Health' && item._id.fullDate === thisMonth
        )
        .map(item => item.categoryTotal);

      const cat2 = res.data
        .filter(
          item =>
            item._id.category === 'Home' && item._id.fullDate === thisMonth
        )
        .map(item => item.categoryTotal);

      const cat3 = res.data
        .filter(
          item =>
            item._id.category === 'Other' && item._id.fullDate === thisMonth
        )
        .map(item => item.categoryTotal);

      const cat4 = res.data
        .filter(
          item =>
            item._id.category === 'Savings' && item._id.fullDate === thisMonth
        )
        .map(item => item.categoryTotal);

      const cat5 = res.data
        .filter(
          item =>
            item._id.category === 'Shopping' && item._id.fullDate === thisMonth
        )
        .map(item => item.categoryTotal);

      const cat6 = res.data
        .filter(
          item =>
            item._id.category === 'Travel' && item._id.fullDate === thisMonth
        )
        .map(item => item.categoryTotal);

      const cat7 = res.data
        .filter(
          item =>
            item._id.category === 'Utilities' && item._id.fullDate === thisMonth
        )
        .map(item => item.categoryTotal);

      categorySumList = [cat1, cat2, cat3, cat4, cat5, cat6, cat7];

      for (let i = 0; i < categorySumList.length; i++) {
        if (categorySumList[i].length > 1) {
          categorySumList[i] = [categorySumList[i].reduce((a, b) => a + b)];
        }
      }

      this.setState({ arrayForCatByCurrentMonth: categorySumList });
    });
  };

  getCategorySum = () => {
    API.getSumByCategory().then(res => {
      this.setState({ arrayForCatSumList: res.data });
      let categorySumList = [];
      const cat1 = res.data
        .filter(item => item._id.category === 'Health')
        .map(item => item.categoryTotal);

      const cat2 = res.data
        .filter(item => item._id.category === 'Home')
        .map(item => item.categoryTotal);

      const cat3 = res.data
        .filter(item => item._id.category === 'Other')
        .map(item => item.categoryTotal);

      const cat4 = res.data
        .filter(item => item._id.category === 'Savings')
        .map(item => item.categoryTotal);

      const cat5 = res.data
        .filter(item => item._id.category === 'Shopping')
        .map(item => item.categoryTotal);

      const cat6 = res.data
        .filter(item => item._id.category === 'Travel')
        .map(item => item.categoryTotal);

      const cat7 = res.data
        .filter(item => item._id.category === 'Utilities')
        .map(item => item.categoryTotal);

      categorySumList = [cat1, cat2, cat3, cat4, cat5, cat6, cat7];

      for (let i = 0; i < categorySumList.length; i++) {
        if (categorySumList[i].length > 1) {
          categorySumList[i] = [categorySumList[i].reduce((a, b) => a + b)];
        }
      }
      this.setState(
        { arrayForPieChart: categorySumList },
        this.getTopCategoryOverTime
      );
    });
  };

  getSumByMonthTrue = () => {
    API.getSumByMonthTrue().then(res => {
      let monthArray = [];
      monthArray = this.timeChartCompare(res.data, 'budgetTotal');
      this.setState({ arrayForTrueIncome: monthArray });
    });
  };

  getSumByMonthFalse = () => {
    API.getSumByMonthFalse().then(res => {
      let monthArray = [];
      monthArray = this.timeChartCompare(res.data, 'budgetTotal');
      this.setState({ arrayForFalseIncome: monthArray });
    });
  };

  getBudgetSum = () => {
    API.getSumByIncome().then(res => {
      this.setState({ arrayForSumByIncome: res.data }, this.setBudgetSum);
    });
  };
  //END API CALLS

  //START DATA AND LOGIC HANDLING
  setBudgetSum = () => {
    const { arrayForSumByIncome } = this.state;
    if (
      arrayForSumByIncome.length === 1 &&
      arrayForSumByIncome[0]._id.income === false
    ) {
      this.setState({
        budgetTotal: arrayForSumByIncome[0].budgetTotal * -1,
        totalExpense: arrayForSumByIncome[0].budgetTotal,
        totalIncome: 0
      });
    } else if (
      arrayForSumByIncome.length === 1 &&
      arrayForSumByIncome[0]._id.income === true
    ) {
      this.setState({
        budgetTotal: arrayForSumByIncome[0].budgetTotal,
        totalIncome: arrayForSumByIncome[0].budgetTotal,
        totalExpense: 0
      });
    } else if (arrayForSumByIncome.length === 2) {
      if (arrayForSumByIncome[0]._id.income === true) {
        const income = arrayForSumByIncome[0].budgetTotal;
        const expense = arrayForSumByIncome[1].budgetTotal;
        const budgetTotal = income - expense;
        this.setState({
          budgetTotal: budgetTotal,
          totalIncome: income,
          totalExpense: expense
        });
      }
      if (arrayForSumByIncome[0]._id.income === false) {
        const expense = arrayForSumByIncome[0].budgetTotal;
        const income = arrayForSumByIncome[1].budgetTotal;
        const budgetTotal = income - expense;
        this.setState({
          budgetTotal: budgetTotal,
          totalIncome: income,
          totalExpense: expense
        });
      }
    } else {
      this.setState({ budgetTotal: 0 });
    }
  };

  getMostActiveCategory = () => {
    let counts = {};
    let compare = 0;
    let mostActiveCategory;

    const { arrayForBudgetTable, arrayForCatSumList } = this.state;

    for (let i = 0; i < arrayForBudgetTable.length; i++) {
      let category = arrayForBudgetTable[i].category;

      if (counts[category] === undefined) {
        counts[category] = 1;
      } else {
        counts[category] = counts[category] + 1;
      }
      if (counts[category] > compare) {
        compare = counts[category];
        mostActiveCategory = arrayForBudgetTable[i].category;
      }
    }

    //filter budget table by most active category
    const filterByMostActive = arrayForCatSumList.filter(
      category => category._id.category === mostActiveCategory
    );

    let monthArray = [];
    monthArray = this.timeChartCompare(filterByMostActive, 'categoryTotal');

    this.setState({
      mostActiveChart: monthArray,
      mostActiveCategory: mostActiveCategory
    });
  };

  getTopCategoryOverTime = () => {
    //destructure array of arrays in state
    let [
      health,
      home,
      other,
      savings,
      shopping,
      travel,
      utilities
    ] = this.state.arrayForPieChart;

    //destructure arrays to get only sums
    const [healthSum] = health;
    const [homeSum] = home;
    const [otherSum] = other;
    const [savingsSum] = savings;
    const [shoppingSum] = shopping;
    const [travelSum] = travel;
    const [utilitiesSum] = utilities;
    //put them back in an array
    const sumArr = [
      healthSum,
      homeSum,
      otherSum,
      savingsSum,
      shoppingSum,
      travelSum,
      utilitiesSum
    ];

    //if there is no value set to 0
    for (let i = 0; i < sumArr.length; i++) {
      if (sumArr[i] === undefined) {
        sumArr[i] = 0;
      }
    }
    //find index for the max value
    const topCatIndex = sumArr.indexOf(Math.max(...sumArr));
    //declare top category
    let topCategory = '';
    //turn index into category name
    switch (topCatIndex) {
      case 0:
        topCategory = 'Health';
        break;
      case 1:
        topCategory = 'Home';
        break;
      case 2:
        topCategory = 'Other';
        break;
      case 3:
        topCategory = 'Savings';
        break;
      case 4:
        topCategory = 'Shopping';
        break;
      case 5:
        topCategory = 'Travel';
        break;
      case 6:
        topCategory = 'Utilities';
        break;
      default:
        console.log('stop yelling at me');
    }

    const filterByTopCategory = this.state.arrayForCatSumList.filter(
      category => category._id.category === topCategory
    );

    let monthArray = [];
    monthArray = this.timeChartCompare(filterByTopCategory, 'categoryTotal');
    this.setState({ topCatChart: monthArray, topCategory: topCategory });
  };

  timeChartCompare = (arr, total) => {
    let monthArray = [];

    for (let i = -2; i < 4; i++) {
      const month = moment()
        .add(i, 'M')
        .format('MM/YYYY');

      const data = arr
        .filter(item => item._id.fullDate === month)
        .map(item => item[total]);

      monthArray.push(data);
    }
    return monthArray;
  };

  createMonthLabels = () => {
    const barChartLabels = [];
    for (let i = -2; i < 4; i++) {
      let newMonth = moment()
        .add(i, 'M')
        .format('MMMM');
      barChartLabels.push(newMonth);
    }
    this.setState({ monthLabels: barChartLabels });
  };
  //END DATA AND LOGIC HANDLING

  //START VARIOUS STATE CHANGES
  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    });
  };
  deleteItem = event => {
    const { value } = event.target;
    this.setState({ itemToDelete: value }, this.handleClickDelete);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleStockSearch = () => {
    this.setState({ stockToSend: this.state.stockToSearch });
    this.setState({ stockToSearch: '' });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    if (!this.state.modal) {
      this.setState({ itemImages: [] });
    }
  };
  //END VARIOUS STATE CHANGES

  //START NOTIFICATIONS
  notify = (type, message, position) => {
    toast[type](message, {
      position: position,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  };
  //END NOTIFICATIONS

  // START TABLE METHODS
  exportBudget = () => {
    this.dt.exportCSV();
  };

  tableSelectedChange = event => {
    this.setState({ selectedBudgetItem: event.value });
    console.log(this.state.selectedBudgetItem);
  };

  createRef = el => {
    this.dt = el;
  };

  onPickedCategoryChange = event => {
    this.dt.filter(event.value, 'category', 'equals');
    this.setState({ categoryPick: event.value });
  };

  globalFilterChange = event => {
    const { value } = event.target;
    this.setState({ globalFilter: value });
  };
  //END TABLE METHODS

  render() {
    // If user isn't logged in, don't let them see this page
    if (!this.state.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <ToastContainer
          position="top-right"
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
            <div className="d-flex">
              <div className="dashtext">{this.state.activePageHeader}</div>
              <div className="dashtext">
                {'\u00A0'}
                {`- ${this.state.username}`}
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
                getCategorySumForCurrentMonth={
                  this.getCategorySumForCurrentMonth
                }
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
                getCategorySumForCurrentMonth={
                  this.getCategorySumForCurrentMonth
                }
              />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.arrayForBudgetTable.length === 0 ? (
            <Welcome />
          ) : (
            <div>
              <BudgetTable
                arrayForBudgetTable={this.state.arrayForBudgetTable}
                selectedBudgetItem={this.state.selectedBudgetItem}
                tableSelectedChange={this.tableSelectedChange}
                handleItemDelete={this.handleItemDelete}
                exportBudget={this.exportBudget}
                createRef={this.createRef}
                expenses={this.state.totalExpense}
                income={this.state.totalIncome}
                budgetTotal={this.state.budgetTotal}
                deleteItem={this.deleteItem}
                onPickedCategoryChange={this.onPickedCategoryChange}
                categoryPick={this.state.categoryPick}
                globalFilter={this.state.globalFilter}
                globalFilterChange={this.globalFilterChange}
              />
              <Charts
                trueIncome={this.state.arrayForTrueIncome}
                falseIncome={this.state.arrayForFalseIncome}
                pieChart={this.state.arrayForPieChart}
                monthLabels={this.state.monthLabels}
                arrayForCatByCurrentMonth={this.state.arrayForCatByCurrentMonth}
                budgetTotal={this.state.budgetTotal}
                arrayForBudgetTable={this.state.arrayForBudgetTable}
                topCategory={this.state.topCategory}
                topCatChart={this.state.topCatChart}
                mostActiveCategory={this.state.mostActiveCategory}
                mostActiveChart={this.state.mostActiveChart}
              />
            </div>
          )}
          <WalmartSearch
            itemToSearch={this.state.itemToSearch}
            handleInputChange={this.handleInputChange}
            handleSearch={this.handleSearch}
          />
          <StockSearch
            stockToSearch={this.state.stockToSearch}
            handleInputChange={this.handleInputChange}
            handleStockSearch={this.handleStockSearch}
            stockToSend={this.state.stockToSend}
          />
          <div>
            <Grid container justify="center">
              <Modal
                style={{ marginTop: 80 }}
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
                id="modalContainer"
              >
                <WalmartModal
                  toggle={this.toggle}
                  className="walmartModal"
                  itemImages={this.state.itemImages}
                  walmartSubmit={this.handleWalmartSubmit}
                />
              </Modal>
            </Grid>
          </div>
          <br />
          <br />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
