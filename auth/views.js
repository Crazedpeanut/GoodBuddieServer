var express = require("express");
var router = express.Router();
var authModels = require("./models");
var userModels = require("../user/models");

var User = userModels.User;
var AuthRequestDto = authModels.AuthRequestDto;

function index(req, res){
	res.send("Hello!");
}

function authenticate(req, res)
{
	var authRequestDto = new AuthRequestDto(req.body);
	
	User.findOne({
		"username": authRequestDto.username,
		"password": authRequestDto.password },
		
		function(err, user){
			if(err)
			{
				console.log("Error authenticating user");
				res.send({"error":err});
			}
			else
			{
				if(user === null)
				{
					console.log("Authencation failed");
					res.send({"error":"Incorrect username or password"});
				}
				else
				{
					console.log("Authentication success!");
					res.send({"error":"", "user":user});
				}
			}
		});
}

module.exports.index = index;
module.exports.authenticate = authenticate;