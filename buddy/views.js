var express = require("express");
var router = express.Router();
var userModels = require("../user/models");
var buddyModels = require("./models");

var xcs = require("../fcm");
var Result = require('node-xcs').Result;
var Message = require('node-xcs').Message;
var Notification = require('node-xcs').Notification;

var User = userModels.User;
var Comment = buddyModels.Comment;
var Question = buddyModels.Question;

var KEY_CATEGORY = "CATEGORY";
var KEY_BUDDY_MESSAGE_TYPE = "MESSAGE_TYPE";
var KEY_COMMENT = "COMMENT";
var KEY_QUESTION ="QUESTION";

var VALUE_BUDDY_MESSAGE_TYPE_QUESTION = "QUESTION";
var VALUE_BUDDY_MESSAGE_TYPE_COMMENT = "COMMENT";
var VALUE_BUDDY_MESSAGE = "BUDDY_MESSAGE";

function index(req, res){
	res.send("Hello!");
}

function sendCommentToUser(req, res)
{
	var comment = new Comment(req.body);
	
	var notification = new Notification("ic_good_buddy_icon")
	    .title("A new message from Good Buddy!")
	    .body(comment.comment)
	    .build();
	
	var message = new Message("messageId_1046")
	    .priority("high")
	    .dryRun(false)
	    .addData(KEY_CATEGORY, VALUE_BUDDY_MESSAGE)
	    .addData(KEY_BUDDY_MESSAGE_TYPE, VALUE_BUDDY_MESSAGE_TYPE_COMMENT)
	    .addData(KEY_COMMENT, comment.comment)
	    .deliveryReceiptRequested(true)
	    .notification(notification)
	    .build();
	
	xcs.sendNoRetry(message, comment.fcmId, function (result) {
	    if (result.getError()) {
	        console.error(result.getErrorDescription());
	    } else {
	        console.log("message sent: #" + result.getMessageId());
	    	console.log("Comment!" + comment);
	    	res.send("Comment!" + comment);
	    }
	});
}

function sendQuestionToUser(req, res)
{
	var question = new Question(req.body);
	
	var notification = new Notification("ic_good_buddy_icon")
	    .title("A new message from Good Buddy!")
	    .body(question.comment)
	    .build();
	
	var message = new Message("messageId_1046")
	    .priority("high")
	    .dryRun(false)
	    .addData(KEY_CATEGORY, VALUE_BUDDY_MESSAGE)
	    .addData(KEY_BUDDY_MESSAGE_TYPE, VALUE_BUDDY_MESSAGE_TYPE_QUESTION)
	    .addData(KEY_COMMENT, question.comment)
	    .deliveryReceiptRequested(true)
	    .notification(notification);
	
	question.answers.forEach(function(item,index,arr){
		message.addData(KEY_QUESTION+index, item);
	});
	
	message = message.build();
	
	xcs.sendNoRetry(message, question.fcmId, function (result) {
	    if (result.getError()) {
	        console.error(result.getErrorDescription());
	    } else {
	        console.log("message sent: #" + result.getMessageId());
	    	console.log("Comment!" + question);
	    	res.send("Comment!" + question);
	    }
	});
}


module.exports.index = index;
module.exports.sendCommentToUser = sendCommentToUser;
module.exports.sendQuestionToUser = sendQuestionToUser;