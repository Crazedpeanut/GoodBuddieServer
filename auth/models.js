var db = require("../database");

var authRequestDtoSchema = db.Schema({
	username: String,
	password: String,
});

var AuthRequestDto = db.model("AuthRequestDto", authRequestDtoSchema);

module.exports.AuthRequestDto = AuthRequestDto;