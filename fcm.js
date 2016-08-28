var Sender = require('node-xcs').Sender;
var Result = require('node-xcs').Result;
var Message = require('node-xcs').Message;
var Notification = require('node-xcs').Notification;

var SenderID = "653267248231";
var ServerKey = "AIzaSyA5lH8nz42fMlSnoNT0MXDtRG71Jd8KCHQ";

var xcs = new Sender(SenderID, ServerKey);

module.exports = xcs;
