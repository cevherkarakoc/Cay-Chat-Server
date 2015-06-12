var net = require('net');

var HOST = '46.101.159.34';
var PORT = 4444;

var clients = [];

net.createServer(function (sock) {
	
	clients.push(sock);
	console.log('Baglandi : '+sock.remoteAddress +':'+sock.remotePort);

	sock.on('data',function(data){
		if(data[0]===109)	
			broadcast(data,sock);
	});

	function broadcast(message, sender){
		clients.forEach(function (client){
			if(client === sender) return;
			client.write(message);
		});
		process.stdout.write(message);
	}

}).listen(PORT,HOST);

console.log('Dinleme basladi\n');
