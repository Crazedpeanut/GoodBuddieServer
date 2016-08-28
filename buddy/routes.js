var express = require("express");
var views = require("./views");
var router = express.Router();

router.get("/", views.index);
router.post("/comment", views.sendCommentToUser);
router.post("/question", views.sendQuestionToUser);

module.exports = router;