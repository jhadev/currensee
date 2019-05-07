# curren\$ee budgeting app made with the MERN stack

_This app is designed to help the end-user monitor and manage all of his expenses and investments through a secure browser application._

### Link to deployed project:

[View on Heroku](https://pacific-ridge-46060.herokuapp.com/)

### NEW FEATURES

- **Table Pagination**
- **Table Filtering**
- **New Data Visualizations**
- **Export Budget as CSV**
- **Date Picker (no more typing dates!)**
- **Recurring Transactions (up to 6 months forward from starting date)**
- **Toast Notifications**
- **Error Handling**
- **Walmart searches can be added to budget, default date is now, default category is shopping.**
- **Added stock search with TradingView charts**
- **Added ability to choose chart types for Total Spending By Category (Pie, Radar, Polar Area) and Income vs Expenses By Month (Bar, Line, and Combo)**
- **Added bar charts to track the user's most active category and the category with the highest total spending and display their spending for those categories over time.**

### TODO

- [x] Data visualization for budget total breakdown by category for a singular month. ADDED 4/18/2019 **Doughnut chart for spending by category for current month.**
- [x] Global table filtering. ADDED 5/7/2019
- [x] Data visualization by single category over time. ADDED 5/5/2019 **Category with highest activity and category with highest total spending can now be visualized**
- [ ] Sum totals with custom filters.
- [ ] Edit table cells.
- [ ] Google OAuth.

## Overview

The overall project was developed with the highest industry standards in mind, in terms of widely accepted notions in the developer world. We made sure to organize ourselves with a the MVC model (Models Views Controllers) in order to ensure the skillset we gained would be applicable to the real world. In addition, we chose to create a true single page application with the use of react-router-dom and express. With these goals in mind, we felt we met our personal goals to foster a product that utilizes the latest technologies with the added benefit of scalability.

## Front-End

A users' experience can only be as good as the technology in the User Interface. For this reason we used a commbination of Reactstrap and Material UI. Both being the most popular and relevant libararies in the current tech environment. Especially because of the rise in popularity of React and their component based coding model which emphasizes modularity; for a better user and developer experience.

![currensee-table](https://user-images.githubusercontent.com/42519030/57336511-2c5af380-70f4-11e9-8aff-66b13a1a219b.jpg)

![currensee](https://user-images.githubusercontent.com/42519030/57336512-2cf38a00-70f4-11e9-9e00-909f9d0670fe.gif)

## Back-End

The goal of our backend was optimization in order to lighten the load for our front-end. We used MongoDB to it's full potential to sort, group, and aggregate our data. In doing so, we were able to create API routes that are seemingly complex, without the sacrifice of front-end efficiency.

![image](https://user-images.githubusercontent.com/11838797/49107896-da649680-f254-11e8-936d-b10adc2ce442.png)

### Technologies Used:

- **React**
- **React-Router**
- **Node.js**
- **Material UI**
- **Prime-React**
- **Chart.JS**
- **MongoDB**
- **Express**
- **Axios**
- **React-Moment**
- **Passport**
- **Mongoose**
- **reactstrap**
- **Concurrently**
