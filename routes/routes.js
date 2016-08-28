var express = require("express");
var authRoutes = require("../auth/routes");
var userRoutes = require("../user/routes");
var buddyRoutes = require("../buddy/routes");
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', new Date());
  next();
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/buddy", buddyRoutes);

module.exports = router;