const db = require("../models");
const Budget = require("../models/budget");

module.exports = {
  findAll: function(req, res) {
    db.Budget.find({ userID: req.user._id })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },

  monthField: function(req, res) {
    db.Budget.aggregate([
      { $match: { userID: req.user._id } },
      {
        $project: {
          amount: 1,
          description: 1,
          income: 1,
          category: 1,
          date: 1,
          userID: 1,
          month: { $substrBytes: ["$date", 0, 2] },
          //convertedIncome: { $toString: "$income" }
        }
      }
    ])
      .then(dbModel => {
        dbModel.map(element => {
          element.income = JSON.stringify(element.income);
          console.log(element);
          return element;
        })
        res.json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },

  findAllByCategory: function(req, res) {
    db.Budget.find({ userID: req.user._id, category: req.params.category })
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  findById: function(req, res) {
    db.Budget.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  create: function(req, res) {
    console.log(req.user);
    req.body.userID = req.user._id;
    db.Budget.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  update: function(req, res) {
    req.body.userID = req.user._id;
    db.Budget.findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  remove: function(req, res) {
    db.Budget.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  sumByIncome: function(req, res) {
    db.Budget.aggregate([
      { $match: { userID: req.user._id } },
      {
        $group: {
          _id: { income: "$income" },
          budgetTotal: { $sum: "$amount" }
        }
      }
    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  sumByMonthTrue: function(req, res) {
    db.Budget.aggregate([
      { $match: { userID: req.user._id, income: { $eq: true } } },
      {
        $group: {
          _id: { income: "$income", month: { $substrBytes: ["$date", 0, 2] } },
          budgetTotal: { $sum: "$amount" }
        }
      }
    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  sumByMonthFalse: function(req, res) {
    db.Budget.aggregate([
      { $match: { userID: req.user._id, income: { $eq: false } } },
      {
        $group: {
          _id: { income: "$income", month: { $substrBytes: ["$date", 0, 2] } },
          budgetTotal: { $sum: "$amount" }
        }
      }
    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  sumByMonth: function(req, res) {
    db.Budget.aggregate([
      { $match: { userID: req.user._id } },
      {
        $group: {
          _id: { income: "$income", month: { $substrBytes: ["$date", 0, 2] } },
          budgetTotal: { $sum: "$amount" }
        }
      }
    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  sumByCategory: function(req, res) {
    db.Budget.aggregate([
      { $match: { userID: req.user._id, income: { $eq: false } } },
      {
        $group: {
          _id: {
            income: "$income",
            category: "$category",
            month: { $substrBytes: ["$date", 0, 2] }
          },
          categoryTotal: { $sum: "$amount" }
        }
      },
      {
        $sort: {
          "_id.category": 1
        }
      }
    ])
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  }
};
