//TODO just for testing - to be removed in 'production'
var globalSocket; 
$(document).ready(function(){

	fillFormfromCookies()

	//connec to correct socket
	var socket = io.connect(window.location.protocol + "//" + window.location.host);
	var clientSocket;
	globalSocket = socket
	bindEvent(socket);

});

function bindEvent(socket){

	socket.on('connected', function(){
		console.log('\n\n**connected');
	});


	$("#sendUserJoinEvent").click(function(){
		console.log("clicked");
		var eventObj = {
			meetingID: $("#inputMeetingID").val(),
			sessionID: $("#inputSessionID").val()
		}
		socket.emit("sendUserJoinEvent",eventObj);
	});

	$("#createMeeting").click(function(){
		console.log("clicked");
		var eventObj = {
			meetingID: $("#inputMeetingID").val(),
			sessionID: $("#inputSessionID").val()
		}
		socket.emit("createMeeting",eventObj);
	});

	$("#connectUser").click(function(){
		var clientSocket = io.connect('http://' + $("#inputUrl").val())
		console.log("clicked");
		/*var eventObj = {
			meetingID: $("#inputMeetingID").val(),
			sessionID: $("#inputSessionID").val()
		}*/

		//socket.emit("connectUser",eventObj);
	});

	$(".event-button").click(function(){
		console.log("button clicked");
		if($("#rememberBox")[0].checked){
			console.log("box checked");
			createCookie("meetingID", $("#inputMeetingID").val());
			createCookie("meetingSessionID", $("#inputSessionID").val());
			createCookie("url", $("#inputClientUrl").val());
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
	erases cookies
	@param {String} name -  of coookie
	*/
function eraseCookie(name) {
	createCookie(name,"",-1);
}

	/*
	Fills the form with data stored in the cookies from the last submission
	*/
function fillFormfromCookies(){
	$("#inputMeetingID").val( readCookie("meetingID") );
	$("#inputSessionID").val( readCookie("meetingSessionID") );
	$("#inputClientUrl").val( readCookie("url") );
}