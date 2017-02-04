var net = require('net');

var client = new net.Socket();
client.connect(5400, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello from client!');
});

client.on('close', function() {
	console.log('Connection closed');
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
    client.write(text)
    if (text === 'quit\n') {
        done();
    }
});

function done() {
    process.exit();
}
