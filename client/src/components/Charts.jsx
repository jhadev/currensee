import React, { useState } from 'react';
import moment from 'moment';
import { Chart } from 'primereact/chart';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Wrapper from '../components/common/Wrapper';
import '../containers/Main.css';
import './Charts.css';

const Wrap = ({ children }) => (
  <Wrapper row="row justify-content-center" columns="col-12">
    <Grid container justify="center">
      <Card className="chartCard">
        <CardContent className="chartCardContent">
          <div className="content-section implementation">{children}</div>
        </CardContent>
      </Card>
    </Grid>
  </Wrapper>
);

const Charts = ({
  monthLabels,
  trueIncome,
  falseIncome,
  pieChart,
  arrayForCatByCurrentMonth,
  arrayForBudgetTable,
  topCategory,
  topCatChart,
  mostActiveCategory,
  mostActiveChart
}) => {
  const [chartChoice, setChart] = useState('pie');
  const [timeChartChoice, setTimeChart] = useState('bar');
  const [activeOrTop, setActiveOrTop] = useState('top');

  const month = moment().format('MMMM');
  const year = moment().format('YYYY');
  const categories = [
    'Health & Fitness',
    'Home',
    'Other',
    'Savings',
    'Shopping',
    'Travel',
    'Utilities'
  ];

  const bgColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#003366',
    '#336D2B',
    '#7FFFD4',
    '#f48642'
  ];

  const hoverColors = [
    '#ff3a64',
    '#0291f2',
    '#ffb80c',
    '#001123',
    '#38772F',
    '#38ffbc',
    '#fc7019'
  ];

  const pickColors = choice => {
    let color = '';
    switch (choice) {
      case 'Health':
        color = '#F26419';
        break;
      case 'Home':
        color = '#33658A';
        break;
      case 'Other':
        color = '#F6AE2D';
        break;
      case 'Savings':
        color = '#295723';
        break;
      case 'Shopping':
        color = '#FF6384';
        break;
      case 'Travel':
        color = '#86BBD8';
        break;
      case 'Utilities':
        color = '#454E9E';
        break;
      default:
        color = '#003366';
    }
    return color;
  };

  const pieData = {
    responsive: true,
    maintainAspectRatio: false,
    labels: categories,
    datasets: [
      {
        data: pieChart,
        backgroundColor: bgColors,
        hoverBackgroundColor: hoverColors
      }
    ]
  };

  const doughnutForCurrentMonth = {
    responsive: true,
    maintainAspectRatio: false,
    labels: categories,
    datasets: [
      {
        data: arrayForCatByCurrentMonth,
        backgroundColor: bgColors,
        hoverBackgroundColor: hoverColors
      }
    ]
  };

  const barData = {
    responsive: true,
    labels: monthLabels,
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgb(4, 244, 12, 0.8)',
        data: trueIncome
      },
      {
        label: 'Expense',
        backgroundColor: 'rgb(255, 0, 0, 0.8)',
        data: falseIncome
      }
    ]
  };

  const topCatData = {
    responsive: true,
    labels: monthLabels,
    datasets: [
      {
        label: 'Total Spending',
        backgroundColor: pickColors(topCategory),
        data: topCatChart
      }
    ]
  };

  const activeCatData = {
    responsive: true,
    labels: monthLabels,
    datasets: [
      {
        label: 'Total Spending',
        backgroundColor: pickColors(mostActiveCategory),
        data: mostActiveChart
      }
    ]
  };

  const lineData = {
    responsive: true,
    labels: monthLabels,
    datasets: [
      {
        label: 'Income',
        data: trueIncome,
        fill: false,
        borderColor: '#42A5F5',
        borderWidth: 3
      },
      {
        label: 'Expenses',
        data: falseIncome,
        fill: true,
        borderColor: '#ff3059',
        borderWidth: 3
      }
    ]
  };

  const comboData = {
    labels: monthLabels,
    datasets: [
      {
        type: 'line',
        label: 'Income',
        borderColor: '#2EC4B6',
        borderWidth: 3,
        fill: false,
        data: trueIncome
      },
      {
        type: 'line',
        label: 'Expenses',
        borderColor: '#E71D36',
        borderWidth: 3,
        fill: true,
        data: falseIncome
      },
      {
        type: 'bar',
        label: 'Income',
        backgroundColor: '#011627',
        data: trueIncome,
        borderColor: 'white'
      },
      {
        type: 'bar',
        label: 'Expenses',
        backgroundColor: '#FF9F1C',
        data: falseIncome
      }
    ]
  };

  const comboDataTopCat = {
    labels: monthLabels,
    datasets: [
      {
        type: 'line',
        label: `Spending for ${topCategory}`,
        borderWidth: 3,
        borderColor: pickColors(topCategory),
        fill: false,
        data: topCatChart
      },
      {
        type: 'line',
        label: `Spending for ${mostActiveCategory}`,
        borderWidth: 3,
        borderColor: pickColors(mostActiveCategory),
        fill: false,
        data: mostActiveChart
      },
      {
        type: 'bar',
        label: 'Income',
        backgroundColor: '#018E42',
        data: trueIncome
      },
      {
        type: 'bar',
        label: 'Expenses',
        backgroundColor: '#BF1A2F',
        data: falseIncome
      }
    ]
  };

  const options = {
    responsive: true,
    title: {
      display: false,
      text: 'Combo Bar Line Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: true
    }
  };

  const radarData = {
    responsive: true,
    labels: categories,
    datasets: [
      {
        label: 'Amount in $',
        backgroundColor: 'rgba(7,16,19, 0.4)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(7,16,19, 0.4)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: pieChart
      }
    ]
  };

  return (
    <>
      <Wrapper row="row justify-content-center" columns="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <div className="row justify-content-start">
              <div className="col-md-4 col-sm-8 col-8">
                {/* <Card className="pickerCard"> */}
                <div className="dropWrapper">
                  <FormControl
                    color="secondary"
                    className="chartDrop p-3 border border-pink"
                  >
                    <InputLabel className="m-2" htmlFor="time-chart-helper">
                      Choose Chart Type
                    </InputLabel>
                    <Select
                      value={timeChartChoice}
                      onChange={e => setTimeChart(e.target.value)}
                      input={
                        <Input name="timeChartChoice" id="time-chart-helper" />
                      }
                    >
                      <MenuItem value={'bar'}>Bar Chart</MenuItem>
                      <MenuItem value={'line'}>Line Chart</MenuItem>
                      <MenuItem value={'combo'}>Combo Chart</MenuItem>
                      <MenuItem value={'comboTopCat'}>
                        Combo With Top Categories
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                {/* </Card> */}
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <h3 className="text-center catChartHeader chartHeading">
                  {timeChartChoice === 'comboTopCat'
                    ? `Income vs Expense vs Spending for ${topCategory} & ${mostActiveCategory}`
                    : `Income vs Expense By Month (${year})`}
                </h3>
              </div>
            </div>
            <Wrapper row="row justify-content-center" columns="col-md-8 col-12">
              <div className="explainer px-5">
                <h6 className="text-center">
                  This chart tracks your income and expenses for 2 months
                  trailing and 3 months forward. You can switch to a line, bar
                  or combo chart or view your income and expenses vs the
                  category with the highest total spending and category with the
                  most activity in the dropdown menu.
                </h6>
              </div>
            </Wrapper>
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                {timeChartChoice === 'bar' ? (
                  <Chart className="chart" type="bar" data={barData} />
                ) : timeChartChoice === 'line' ? (
                  <Chart className="chart" type="line" data={lineData} />
                ) : timeChartChoice === 'combo' ? (
                  <Chart
                    className="chart"
                    type="bar"
                    data={comboData}
                    options={options}
                  />
                ) : timeChartChoice === 'comboTopCat' ? (
                  <Chart
                    className="chart"
                    type="bar"
                    options={options}
                    data={comboDataTopCat}
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Wrapper>
      {/* START TOTAL CAT CHART */}
      <Wrapper row="row justify-content-center" columns="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <div className="row justify-content-start">
              <div className="col-md-4 col-sm-8 col-8">
                <div className="dropWrapper">
                  <FormControl
                    color="secondary"
                    className="chartDrop p-3 border border-pink"
                  >
                    <InputLabel className="m-2" htmlFor="chart-helper">
                      Choose Chart Type
                    </InputLabel>
                    <Select
                      value={chartChoice}
                      onChange={e => setChart(e.target.value)}
                      input={<Input name="chartChoice" id="chart-helper" />}
                    >
                      <MenuItem value={'pie'}>Pie Chart</MenuItem>
                      <MenuItem value={'radar'}>Radar Chart</MenuItem>
                      <MenuItem value={'polar'}>Polar Chart</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <h3 className="text-center catChartHeader chartHeading">
                  Total Spending by Category
                </h3>
                <h6 className="text-center">
                  This chart is a breakdown of your total spending for each
                  category. You can switch chart types with the dropdown menu.
                </h6>
              </div>
            </div>
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                {chartChoice === 'pie' ? (
                  <Chart className="chart" type="pie" data={pieData} />
                ) : chartChoice === 'radar' ? (
                  <Chart className="chart" type="radar" data={radarData} />
                ) : chartChoice === 'polar' ? (
                  <Chart className="chart" type="polarArea" data={pieData} />
                ) : null}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Wrapper>
      {/* START CATEGORIES FOR CURRENT MONTH */}
      <Wrap>
        <h3 className="text-center chartHeading">
          Spending by Category for {month}, {year}
        </h3>
        <h6 className="text-center">
          This chart is a breakdown of your total spending for each category for
          the current month and year.
        </h6>
        <Chart
          className="chart"
          type="doughnut"
          data={doughnutForCurrentMonth}
        />
      </Wrap>
      <Wrapper row="row justify-content-center" columns="col-12">
        <Grid container justify="center">
          <Card className="chartCard">
            <div className="row justify-content-start">
              <div className="col-md-4 col-sm-8 col-8">
                <div className="dropWrapper">
                  <FormControl
                    color="secondary"
                    className="chartDrop p-3 border border-pink"
                  >
                    <InputLabel className="m-2" htmlFor="chart-helper">
                      Choose Chart Type
                    </InputLabel>
                    <Select
                      value={activeOrTop}
                      onChange={e => setActiveOrTop(e.target.value)}
                      input={<Input name="chartChoice" id="chart-helper" />}
                    >
                      <MenuItem value={'top'}>Top Spending Category</MenuItem>
                      <MenuItem value={'active'}>Most Active Category</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <h3 className="text-center catChartHeader chartHeading">
                  {activeOrTop === 'top'
                    ? `Spending for ${topCategory}`
                    : `Spending for ${mostActiveCategory}`}
                </h3>
                <h6 className="text-center">
                  This chart tracks your category with the highest total
                  spending or your most active category and gives you a
                  breakdown of your spending for 2 months trailing and 3 months
                  forward.
                </h6>
              </div>
            </div>
            <CardContent className="chartCardContent">
              <div className="content-section implementation">
                {activeOrTop === 'top' ? (
                  <Chart className="chart" type="bar" data={topCatData} />
                ) : activeOrTop === 'active' ? (
                  <Chart className="chart" type="bar" data={activeCatData} />
                ) : null}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Charts;
