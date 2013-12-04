
$(document).ready(function(){

	var socket = io.connect('http' + document.location.origin.split(':')[1]);

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

});