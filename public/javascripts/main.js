//TODO just for testing - to be removed in 'production'
var globalSocket;
var globalClientSocket;
$(document).ready(function(){

	fillFormfromCookies();

	//connec to correct socket
	var socket = io.connect(window.location.protocol + "//" + window.location.host);
	var clientSocket;
	globalSocket = socket
	bindEvent(socket);

});


	/*
	*	binds socket events to button clicks
	*	@param socket - socket object which connects to the server
	*/
function bindEvent(socket){

	socket.on('connected', function(){
		console.log('\n\n**connected');
	});


	$("#sendUserJoinEvent").click(function(){
		console.log("clicked");
		var formInfoObj = {
			meetingID: $("#inputMeetingID").val(),
			sessionID: $("#inputSessionID").val()
		}
		socket.emit("sendUserJoinEvent",formInfoObj);
	});

	$("#sendWhiteboardDrawEvent").click(function(){
		console.log("clicked");
		var formInfoObj = {
			meetingID: $("#inputMeetingID").val(),
			sessionID: $("#inputSessionID").val()
		}
		socket.emit("sendWhiteboardDrawEvent",formInfoObj);
	});

	$("#sendWhiteboardUpdShapeEvent").click(function(){
		console.log("clicked");
		var formInfoObj = {
			meetingID: $("#inputMeetingID").val(),
			sessionID: $("#inputSessionID").val()
		}
		socket.emit("sendWhiteboardUpdShapeEvent",formInfoObj);
	});

	$("#createMeeting").click(function(){
		console.log("clicked");
		var formInfoObj = {
			meetingID: $("#inputMeetingID").val(),
			sessionID: $("#inputSessionID").val()
		}
		socket.emit("createMeeting",formInfoObj);
	});

	$("#connectUser").click(function(){
		console.log("clicked");
		var host = 'http://' + $("#inputClientUrl").val();
		console.log(host);
		var clientSocket = io.connect(host);
		globalClientSocket = clientSocket;
		if(clientSocket){
			console.log("connected to html5-client");
			console.log(clientSocket)
			clientSocket.emit("user connect")
		}
		else{
			console.log("failed to connect");
		}

	});

	$(".event-button").click(function(){
		if($("#rememberBox")[0].checked){
			setCookiesFromForm();
		}
	});

	$("#sendJSON").click(function(){
		console.log("clicked");
		var formInfoObj;
		try{
			formInfoObj = JSON.parse( $("#inputJSON").val() );
			socket.emit("sendJSON",formInfoObj);
		}
		catch(err)
		{
			alert("Invalid JSON");
		}

	});

};

	/*
	creates cookies
	@param {String} name -  of coookie
	@param {String} valie - value of coookie
	@param {number} days -  number of days for coookie to stay active
	*/
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

	/*
	creates cookies
	@param {String} name -  of coookie
	@return {String} valie - value of coookie
	*/

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

	/*
	*	erases cookies
	*	@param {String} name -  of coookie
	*/
function eraseCookie(name) {
	createCookie(name,"",-1);
}

	/*
	*	Fills the form with data stored in the cookies from the last submission
	*/
function fillFormfromCookies(){
	$("#rememberBox")[0].checked = JSON.parse( readCookie("remember") );
	$("#inputMeetingID").val( readCookie("meetingID") );
	$("#inputSessionID").val( readCookie("meetingSessionID") );
	$("#inputClientUrl").val( readCookie("url") );
	var JSONstring = readCookie("JSON");

	$("#inputJSON").val( JSON.stringify( JSON.parse(JSONstring), null, 2 )  );
}

	/*
	*	Sets the cookies to data last enterted in the form 
	*/
function setCookiesFromForm(){
	createCookie("remember", $("#rememberBox")[0].checked );
	createCookie("meetingID", $("#inputMeetingID").val());
	createCookie("meetingSessionID", $("#inputSessionID").val());
	createCookie("url", $("#inputClientUrl").val());
	createCookie("JSON", $("#inputJSON").val().toString().replace(/(\r\n|\n|\r)/gm,'') );
}

