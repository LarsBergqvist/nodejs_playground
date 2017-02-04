const net = require('net');

server = net.createServer(function(socket) {
    console.log("Client connected");
    socket.write("Now connected");
    socket.on('close',function() {
        console.log("Client disconnected")
    });
    socket.on('data', function(data) {
	    console.log('Received: ' + data);
    });
})

server.listen(5400, function() {
    console.log('Listening to subscribers');
})
