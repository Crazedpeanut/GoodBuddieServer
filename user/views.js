var express = require("express");
var userModels = require("./models");
var router = express.Router();

var User = userModels.User;

function index(req, res){
	User.find({}, function(err, users){
		if(err)
		{
			console.log("Error getting list of users" + users);
			res.send({"error":"Error getting list of users" + users});
		}
		else
		{
			console.log(users);
			res.send({"error": "", "users":users});
		}
	});
}

function updateUser(req, res){
	var userId = req.params.userId;
	var updatedUser = new User(req.body);
	
	User.findOne({_id:userId}, function(err, user){
		if(err)
		{
			console.log("Error getting list of users" + user);
			res.send({"error":"Error getting list of users" + user});
		}
		else
		{
			
			user.username = updatedUser.username;
			user.fcmId = updatedUser.fcmId;
			user.password = updatedUser.fcmId;
			user.email = updatedUser.email;
			user.firstname = updatedUser.firstname;
			user.lastname = updatedUser.lastname;
			
			user.save();
			
			console.log("Updated user! " + user);
			res.send(user);
		}
	});
}

function registerUser(req, res)
{
	var user = new User(req.body);
	user.save(function(err, user){
		if(err)
		{
			console.log("Error creating user!" + err);
			res.send({"error":"Error creating user!" + err});
		}
		else
		{
			console.log("Create new user: " + user);
			res.send({"error":"","user":user});
		}
	});
}

module.exports.index = index;
module.exports.registerUser = registerUser;
module.exports.updateUser = updateUser;