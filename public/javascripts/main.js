var socket = io.connect('http://localhost');

socket.on('connected', function(){
	console.log('\n\n**connected');
});