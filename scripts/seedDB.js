const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/currensee-demo"
);

const budgetSeed = [
  {
    description: "Rent",
    amount: 1000,
    date: new Date(Date.now()),
    income: false,
    category: "Home",
  },
  {
    description: "Paycheck",
    amount: 1500,
    date: new Date(Date.now()),
    income: true,
    category: "Income",
  },
  {
    description: "Car Payment",
    amount: 300,
    date: new Date(Date.now()),
    income: false,
    category: "Travel",
  },
  {
    description: "Bonus",
    amount: 500,
    date: new Date(Date.now()),
    income: true,
    category: "Income",
  }
];

db.Budget
  .remove({})
  .then(() => db.Budget.collection.insertMany(budgetSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
