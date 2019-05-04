import React, { useState } from "react";
import moment from "moment";
import { Chart } from "primereact/chart";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import "../containers/Main.css";
import "./Charts.css";

const Charts = ({
  monthLabels,
  trueIncome,
  falseIncome,
  pieChart,
  arrayForCatByCurrentMonth,
  arrayForBudgetTable
}) => {
  const [chartChoice, setChart] = useState("pie");

  const handleChartChoice = event => {
    const { name, value } = event.target;
    setChart(value);
  };

  console.log(chartChoice);
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

  return (
    <div>
      <div />
      <div className="row justify-content-center">
        <div className="col-12">
          <Grid container justify="center">
            <Card className="chartCard">
              <div className="row justify-content-start">
                <div className="col-md-4 col-sm-8 col-8">
                  {/* <Card className="pickerCard"> */}
                  <div className="dropWrapper">
                    <FormControl color="secondary" className="chartDrop">
                      <InputLabel htmlFor="chart-helper">
                        Choose Chart Type
                      </InputLabel>
                      <Select
                        value={chartChoice}
                        onChange={handleChartChoice}
                        input={<Input name="chartChoice" id="chart-helper" />}
                      >
                        <MenuItem value={"pie"}>Pie Chart</MenuItem>
                        <MenuItem value={"radar"}>Radar Chart</MenuItem>
                        <MenuItem value={"polar"}>Polar Chart</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {/* </Card> */}
                </div>
                <div className="col-md-4 col-sm-12 col-12">
                  <h3 className="text-center catChartHeader chartHeading">
                    Total Spending by Category
                  </h3>
                </div>
              </div>

              <CardContent className="chartCardContent">
                <div className="content-section implementation">
                  {chartChoice === "pie" ? (
                    <Chart className="chart" type="pie" data={pieData} />
                  ) : chartChoice === "radar" ? (
                    <Chart className="chart" type="radar" data={radarData} />
                  ) : chartChoice === "polar" ? (
                    <Chart className="chart" type="polarArea" data={pieData} />
                  ) : null}
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
      </div>
    </div>
  );
};

export default Charts;
