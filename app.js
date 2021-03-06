
/**
 * Module dependencies.
 */

 var express = require('express');
 var routes = require('./routes');
 var http = require('http');
 var path = require('path');
 var redis = require("redis");
 var redisClient;

//port on which the node server listens
 var PORT = 4000;


//setting up server to run
 var app = express()
 , http = require('http')
 , server = http.createServer(app)

 //setting up socket.io to listen for requests
 , io = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


server.listen(PORT);

//process socket events
io.sockets.on('connection', function (socket) { // the actual socket callback
	bindEvents(socket);
	socket.emit('connected');
	console.log("socket connected");
	
	//once the socket is connected, connect to the redis client
	redisClient = redis.createClient();

	redisClient.on('connect', function(){
		console.log("redis client connected");
	});

	
		

});


	/*
	*	binds socket events for which it will listen on
	*	@param socket - the socket to transfer the events across 
	*/
function bindEvents(socket){
	socket.on("sendUserJoinEvent", function (formInfoObj){
		sendUserJoinEvent(formInfoObj);		
	});

	socket.on("sendWhiteboardDrawEvent", function (formInfoObj){
		sendWhiteboardDrawEvent(formInfoObj);		
	});

	socket.on("sendWhiteboardUpdShapeEvent", function (formInfoObj){
		sendWhiteboardUpdShapeEvent(formInfoObj);		
	});

	socket.on("createMeeting", function (formInfoObj){
		createMeeting(formInfoObj);		
	});

	socket.on("sendJSON", function (formInfoObj){
		sendJSON(formInfoObj);		
	});


};

/*
	@param formInfoObj - the event object that contains the information
	entered in the form 
*/
function sendUserJoinEvent(formInfoObj){
	//define the correct object
	var eventObj = {
		name: "UserJoined",
		meeting: {
			id: formInfoObj.meetingID,
			sessionID: formInfoObj.sessionID
		},
		user: {
			name: "html5-api-user",
			role: "VIEWER"
		}
	};

	//send it to redis
	redisClient.publish("bigbluebutton:bridge", JSON.stringify(eventObj));
};

function sendWhiteboardDrawEvent(formInfoObj){
	//define the correct object
	var eventObj = {
		"name": "whiteboardMakeShape",
		"meeting": {
			"id": formInfoObj.meetingID,
			"sessionID": formInfoObj.sessionID
		},
		"shape": {
			"type": "rect",
			"coordinate": {
				"firstX": 0.1,
				"firstY": 0.1
			},
			"color": 0,
			"thickness": 10,
			"by": {
				"id": "user1",
				"name": "Mohamed"
			}
		}
	};

	//send it to redis
	redisClient.publish("bigbluebutton:bridge", JSON.stringify(eventObj));
};

function sendWhiteboardUpdShapeEvent(formInfoObj){
	//define the correct object
	var eventObj = {
		"name": "whiteboardUpdShape",
		"timestamp": 123456,
		"meeting": {
			"id": formInfoObj.meetingID,
			"sessionID": formInfoObj.sessionID
		},
		"shape": {
			"type": "rect",
			"coordinate": {
				"firstX": 0.1,
	            "firstY": 0.1,
	            "lastX": 0.5,
	            "lastY": 0.6
			},
			"square": true,
			"by": {
				"id": "user1",
				"name": "Mohamed"
			}
		}
	};

	//send it to redis
	redisClient.publish("bigbluebutton:bridge", JSON.stringify(eventObj));
};

	/*
	* TODO : maybe be able to create meetings from here
	* or send a create meeting event and let the client
	* create the meeting
	*/
function createMeeting(formInfoObj){

	
};

	/*
	* sendJSON - sends whatever JSON the client input across redis into the html5 client node server
	* @param formInfoObj - object the event object that contains the information entered in the form 
	*/
function sendJSON(formInfoObj){
	//send it to redis
	redisClient.publish("bigbluebutton:bridge", JSON.stringify(formInfoObj));
};