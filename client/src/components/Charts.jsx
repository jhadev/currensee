import React from "react";
import { Chart } from "primereact/chart";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import "../containers/Main.css";

const Charts = props => {
  const pieData = {
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
        data: props.pieChart,
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
    labels: props.monthLabels,
    datasets: [
      {
        label: "Income",
        backgroundColor: "rgb(4, 244, 12, 0.8)",
        data: props.trueIncome
      },
      {
        label: "Expense",
        backgroundColor: "rgb(255, 0, 0, 0.8)",
        data: props.falseIncome
      }
    ]
  };

  const lineData = {
    responsive: true,
    labels: props.monthLabels,
    datasets: [
      {
        label: "Income",
        data: props.trueIncome,
        fill: false,
        borderColor: "#42A5F5"
      },
      {
        label: "Expenses",
        data: props.falseIncome,
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
        data: props.pieChart
      }
    ]
  };
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent>
              <div className="content-section implementation">
                <h3 className="text-center">Total Spending by Category</h3>
                <Chart className="chart" type="pie" data={pieData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent>
              <div className="content-section implementation">
                <h3 className="text-center">Income vs Expense By Month</h3>
                <Chart className="chart" type="bar" data={barData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent>
              <div className="content-section implementation">
                <h3 className="text-center">Income vs Expense By Month</h3>
                <Chart className="chart" type="line" data={lineData} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <div className="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <CardContent>
              <div className="content-section implementation">
                <h3 className="text-center">Radar (Spending By Category)</h3>
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
