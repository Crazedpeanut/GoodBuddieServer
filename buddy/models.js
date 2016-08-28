var db = require("../database");

var commentSchema = db.Schema({
	comment: String,
	fcmId: String
});

var questionSchema = db.Schema({
	comment: String,
	answers: [String],
	fcmId: String
});

var Comment = db.model("Comment", commentSchema);
var Question = db.model("Question", questionSchema);

module.exports.Comment = Comment;
module.exports.Question = Question;