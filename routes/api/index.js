const router = require("express").Router();
const userRoutes = require("./users");
const budgetRoutes = require("./budget");
// const externalRoutes = require("./external");

// API routes
router.use("/users", userRoutes);
router.use("/budget", budgetRoutes);
// router.use("/external", externalRoutes);

module.exports = router;
