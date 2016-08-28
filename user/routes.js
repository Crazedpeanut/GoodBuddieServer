var express = require("express");
var views = require("./views");
var router = express.Router();

router.get("/", views.index);
router.post("/", views.registerUser);
router.put("/:userId", views.updateUser);

module.exports = router;