var net = require('net');

var HOST = '46.101.159.34';
var PORT = 4444;

var clients = [];

net.createServer(function (sock) {
	

	sock.on('data',function(data){
		if(data[0]===106) join(data,sock);
		else if(data[0]===109) broadcast(data,sock);
	});

	sock.on('end'), function () {
		clients.splice(clients.indexOf(sock),1);
	});

	function broadcast(message, sender){
		clients.forEach(function (client){
			if(client === sender) return;
			client.write(message);
		});
		process.stdout.write(message);
	}

	function join(username,sender){
		var u = username.toString('utf-8');
		sender.name= u.substring(1,u.length);
		clients.push(sender);
		console.log('Baglandi : '+sock.remoteAddress +':'+sock.remotePort);
		process.stdout.write(username);

	}

}).listen(PORT,HOST);

console.log('Dinleme basladi\n');
