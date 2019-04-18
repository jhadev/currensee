import React from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import "../containers/Main.css";
import "./Charts.css";

const Charts = ({
  monthLabels,
  trueIncome,
  falseIncome,
  pieChart,
  arrayForCatByCurrentMonth,
  budgetTotal,
  arrayForBudgetTable
}) => {
  const month = moment().format("MMMM");
  const year = moment().format("YYYY");
  const pieData = {
    responsive: true,
    maintainAspectRatio: false,
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
        data: pieChart,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#003366",
          "#F0F8FF",
          "#7FFFD4",
          "#f48642"
        ],
        hoverBackgroundColor: [
          "#ff3a64",
          "#0291f2",
          "#ffb80c",
          "#001123",
          "#d8edff",
          "#38ffbc",
          "#fc7019"
        ]
      }
    ]
  };

  const doughnutForCurrentMonth = {
    responsive: true,
    maintainAspectRatio: false,
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
        data: arrayForCatByCurrentMonth,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#003366",
          "#F0F8FF",
          "#7FFFD4",
          "#f48642"
        ],
        hoverBackgroundColor: [
          "#ff3a64",
          "#0291f2",
          "#ffb80c",
          "#001123",
          "#d8edff",
          "#38ffbc",
          "#fc7019"
        ]
      }
    ]
  };

  const barData = {
    responsive: true,
    labels: monthLabels,
    datasets: [
      {
        label: "Income",
        backgroundColor: "rgb(4, 244, 12, 0.8)",
        data: trueIncome
      },
      {
        label: "Expense",
        backgroundColor: "rgb(255, 0, 0, 0.8)",
        data: falseIncome
      }
    ]
  };

  const lineData = {
    responsive: true,
    labels: monthLabels,
    datasets: [
      {
        label: "Income",
        data: trueIncome,
        fill: false,
        borderColor: "#42A5F5"
      },
      {
        label: "Expenses",
        data: falseIncome,
        fill: true,
        borderColor: "#ff3059"
      }
    ]
  };

  const radarData = {
    responsive: true,
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
        data: pieChart
      }
    ]
  };

  return arrayForBudgetTable.length === 0 ? (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8">
        <Grid container justify="center">
          <Card className="welcomeCard">
            <CardContent>
              <div className="welcomeWrapper">
                <h2 className="text-center welcomeTitle">WELCOME!</h2>
                <hr />
                <div className="welcomeMsgWrapper">
                  <p className="welcomeMsg">
                    Add some items to your budget to get started. You can add
                    budget income or expenses as individual transactions or
                    recurring transactions up to 6 months forward. You can also
                    search Walmart.com to find products and add them to your
                    budget or view them on Walmart.com.
                    <hr />
                    After you add a transaction this message will disappear and
                    charts will replace it like magic! Once you add income, your
                    time based charts will populate. Once you add an expense
                    your spending based charts will populate.
                    <hr />
                    The table above can be used to delete budget items
                    individually or to sort by relevant the column headers. The
                    budget total at the top will represent your disposable
                    income after you add both income and expenses to your
                    budget. If you only track income or only track expenses it
                    will represent the sums of your total budget items.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  ) : (
    <div className="row justify-content-center">
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                <h3 className="text-center chartHeading">
                  Total Spending by Category
                </h3>
                <Chart className="chart" type="pie" data={pieData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                <h3 className="text-center chartHeading">
                  Spending by Category for {month}, {year}
                </h3>
                <Chart
                  className="chart"
                  type="doughnut"
                  data={doughnutForCurrentMonth}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                <h3 className="text-center chartHeading">
                  Income vs Expense By Month ({year})
                </h3>
                <Chart className="chart" type="bar" data={barData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                <h3 className="text-center chartHeading">
                  Income vs Expense By Month ({year})
                </h3>
                <Chart className="chart" type="line" data={lineData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                <h3 className="text-center chartHeading">
                  Radar (Spending By Category)
                </h3>
                <Chart className="chart" type="radar" data={radarData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    </div>
  );
};

export default Charts;
