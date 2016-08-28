var db = require("../database");

var userSchema = db.Schema({
	username: String,
	password: String,
	email: String,
	firstname: String,
	lastname: String,
	fcmId: String
});

var User = db.model("User", userSchema);

module.exports.User = User;