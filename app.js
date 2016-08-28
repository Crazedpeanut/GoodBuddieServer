
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require("./routes/routes")
  , http = require('http')
  , path = require('path');

var bodyParser = require('body-parser')

var swig = require("swig");
swig = new swig.Swig();

var firebaseCloudMessagingServer = require("./fcm");

var app = express();

// all environments
app.set('port', process.env.HTTP_PORT || 8080);
app.set('views', __dirname + '/views');
app.engine("html", swig.renderFile);
app.set('view engine', 'html');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// development only
if ('development' === app.get('env')) {
 // app.use(express.errorHandler());
}

app.use('/', routes);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
