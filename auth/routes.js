var express = require("express");
var views = require("./views");
var router = express.Router();

router.get("/", views.index);
router.post("/authenticate", views.authenticate);

module.exports = router;